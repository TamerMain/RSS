import * as z from 'zod';

export const formSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Invalid email address'),
    age: z
      .number()
      .min(18, 'Must be 18 or older')
      .max(120, 'Invalid age')
      .optional(),
    gender: z.string().min(1, 'Please select gender'),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, 'Must accept Terms and Conditions'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    passwordConfirm: z.string().min(1, 'Please confirm password'),
    country: z.string().min(1, 'Please select country'),
    imageDownload: z
      .instanceof(File)
      .refine((file) => file.size <= 5 * 1024 * 1024, 'Max size 5MB')
      .refine(
        (file) => ['image/jpeg', 'image/png'].includes(file.type),
        'Only JPG or PNG'
      ),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

export type FormData = z.infer<typeof formSchema>;
export type FormErrorFlatten = z.ZodFlattenedError<FormData>;
