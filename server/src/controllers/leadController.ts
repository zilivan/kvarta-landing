import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { leadSchema } from '../validators/leadValidator';
import { z } from 'zod';

const prisma = new PrismaClient();

export const createLead = async (req: Request, res: Response) => {
  try {
    const validationResult = leadSchema.safeParse(req.body);
    
    if (!validationResult.success) {
     const errorDetails: z.ZodIssue[] = validationResult.error.issues;
     
      return res.status(400).json({ 
        success: false,
        error: 'Неверные данные',
        details: errorDetails
      });
    }

    const data = validationResult.data;

    // Проверка на повторную отправку за последние 10 минут (600 000 мс)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    
    const existingLead = await prisma.lead.findFirst({
      where: {
        phone: data.phone,
        createdAt: { gte: tenMinutesAgo }
      }
    });

    if (existingLead) {
      return res.status(400).json({ 
        success: false,
        error: 'Заявка уже принята, мы скоро перезвоним!',
        duplicate: true 
      });
    }

    // Создание заявки
    await prisma.lead.create({
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

    console.log(`[NEW LEAD] ${new Date().toISOString()} | Phone: ${data.phone} | Interest: ${data.interest}`);

    return res.status(201).json({ 
      success: true, 
      message: 'Заявка принята, мы свяжемся с вами в ближайшее время' 
    });

  } catch (error) {
    console.error('[ERROR] Failed to create lead:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.' 
    });
  }
};