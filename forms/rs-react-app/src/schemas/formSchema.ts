import * as z from 'zod';

export const formSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Invalid email address'),
    gender: z.string().min(1, 'Please select gender'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    passwordConfirm: z.string().min(1, 'Please confirm password'),
    age: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), 'Must be a number')
      .refine((val) => val >= 18, 'Must be 18 or older')
      .refine((val) => val <= 120, 'Invalid age')
      .transform((val) => val.toString()),
    country: z.string().min(1, 'Please select country'),
    imageUpload: z
      .instanceof(FileList)
      .refine((files) => files.length > 0, 'File is required')
      .refine((file) => file[0]?.size <= 5 * 1024 * 1024, 'Max size 5MB')
      .refine(
        (files) => ['image/jpeg', 'image/png'].includes(files[0]?.type),
        'Only JPG or PNG'
      ),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, 'Must accept Terms and Conditions'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

export type EntryFormData = z.infer<typeof formSchema>;
export type EntryFormKeys = keyof EntryFormData;
export type EntryFormErrorFlatten = z.ZodFlattenedError<EntryFormData>;
