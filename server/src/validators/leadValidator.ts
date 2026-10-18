import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(2, 'Пожалуйста, укажите ваше имя'),
  
  // 1. Сначала очищаем строку от пробелов, дефисов и скобок
  // 2. Затем проверяем очищенную строку по строгому regex
  phone: z.string()
    .transform((val) => val.replace(/[\s\-\(\)]/g, '')) 
    .refine(
      (val) => /^(\+375|80)(29|33|44|25)\d{7}$/.test(val),
      'Введите номер в формате +375 29 XXX-XX-XX'
    ),
    
  interest: z.string().min(1, 'Выберите тип заявки'),
  comment: z.string().max(500).optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;