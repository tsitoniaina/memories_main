import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from './common-rules';

export const personalInfoFormSchema = z.object({
  name: z.string().min(1, { message: messages.firstNameRequired }),
  firstname: z.string().optional(),
  email: validateEmail,
  // password: z.string().min(6, { message: messages.passwordMinLength }), // Adjust length as necessary
});

export type PersonalInfoFormTypes = z.infer<typeof personalInfoFormSchema>;

export const defaultValues: PersonalInfoFormTypes = {
  name: '',
  email: '',
  firstname: '',
  // password: '',
};
