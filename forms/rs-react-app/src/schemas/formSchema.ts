import * as z from 'zod';
import countryList from '@/assets/country-list.json';

export const formSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters'),
    email: z.email('Invalid email address'),
    gender: z.string().trim().min(1, 'Please select gender'),
    password: z
      .string()
      .trim()
      .min(6, 'Password must be at least 6 characters'),
    passwordConfirm: z.string().trim().min(1, 'Please confirm password'),
    age: z
      .string()
      .trim()
      .refine((val) => !isNaN(Number(val)), 'Must be a number')
      .refine((val) => Number(val) >= 18, 'Must be 18 or older')
      .refine((val) => Number(val) <= 120, 'Invalid age'),
    country: z
      .string()
      .trim()
      .refine(
        (val) => val && countryList.includes(val),
        'Please select a valid country'
      ),
    imageUpload: z.instanceof(FileList).superRefine((files, ctx) => {
      if (files.length === 0) {
        ctx.addIssue({ code: 'custom', message: 'File is required' });
        return;
      }
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        ctx.addIssue({ code: 'custom', message: 'Max size 5MB' });
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        ctx.addIssue({ code: 'custom', message: 'Only JPG or PNG' });
      }
    }),
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
