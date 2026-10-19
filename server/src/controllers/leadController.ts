import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { leadSchema } from '../validators/leadValidator';
import { ZodError } from 'zod';

const prisma = new PrismaClient();

export const createLead = async (req: Request, res: Response) => {
  console.log("\n" + "=".repeat(80));
  console.log(`📩 [NEW REQUEST] ${new Date().toISOString()}`);
  console.log(`🌐 Origin: ${req.headers.origin || 'Unknown'}`);
  console.log(`📍 IP: ${req.ip}`);
  console.log("=".repeat(80));
  
  try {
    console.log("👉 1. Начинаю валидацию Zod...");
    const validationResult = leadSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      console.log("❌ 2. Валидация не прошла:");
      
      // В Zod массив ошибок называется 'issues'
      validationResult.error.issues.forEach((issue) => {
        // issue.path - это массив, соединяем его через точку (например, "phone")
        const fieldName = issue.path.join('.') || 'unknown';
        console.log(`   - Поле "${fieldName}": ${issue.message}`);
      });
      
      return res.status(400).json({    
        success: false,
        error: 'Неверные данные',
        details: validationResult.error.issues 
      });
    }

    const data = validationResult.data;
    console.log("✅ 3. Валидация прошла успешно. Данные:");
    console.log(`   • Имя: ${data.name}`);
    console.log(`   • Телефон: ${data.phone}`);
    console.log(`   • Интерес: ${data.interest}`);
    console.log(`   • Комментарий: ${data.comment || '(пусто)'}`);
    console.log(`   • UTM Source: ${data.utmSource || '(нет)'}`);
    console.log(`   • UTM Medium: ${data.utmMedium || '(нет)'}`);
    console.log(`   • UTM Campaign: ${data.utmCampaign || '(нет)'}`);

    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    
    console.log("👉 4. Проверяю дубли за последние 10 минут...");
    const existingLead = await prisma.lead.findFirst({
      where: {
        phone: data.phone,
        createdAt: { gte: tenMinutesAgo }
      }
    });

    if (existingLead) {
      console.log(`⚠️ 5. Найден дубль! Заявка #${existingLead.id} уже существует.`);
      return res.status(400).json({ 
        success: false,
        error: 'Заявка уже принята, мы скоро перезвоним!',
        duplicate: true 
      });
    }

    console.log("👉 5. Создаю новую запись в базе данных...");
    const newLead = await prisma.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        interest: data.interest,
        comment: data.comment,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
      }
    });

    console.log("\n" + "🎉".repeat(20));
    console.log(`✅ [NEW LEAD CREATED] Заявка #${newLead.id}`);
    console.log(`   📞 Телефон: ${newLead.phone}`);
    console.log(`   👤 Имя: ${newLead.name}`);
    console.log(`   🎯 Интерес: ${newLead.interest}`);
    console.log(`   💬 Комментарий: ${newLead.comment || '(пусто)'}`);
    console.log(`   📊 UTM: ${newLead.utmSource || '-'} / ${newLead.utmMedium || '-'} / ${newLead.utmCampaign || '-'}`);
    console.log(`   🕐 Время: ${newLead.createdAt.toISOString()}`);
    console.log("🎉".repeat(20) + "\n");

    return res.status(201).json({ 
      success: true, 
      message: 'Заявка принята, мы свяжемся с вами в ближайшее время' 
    });

  } catch (error: unknown) {
    console.error("\n💥 [FATAL ERROR] В контроллере произошла ошибка:");
    // Правильная обработка unknown в TypeScript
    if (error instanceof Error) {
      console.error(`   Тип: ${error.name}`);
      console.error(`   Сообщение: ${error.message}`);
      console.error(`   Стек: ${error.stack}`);
    } else {
      console.error('   Неизвестная ошибка:', error);
    }
    return res.status(500).json({ 
      success: false,
      error: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.' 
    });
  }
};