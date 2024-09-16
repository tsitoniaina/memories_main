import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from './common-rules';

// form zod validation schema
export const queryResetPasswordSchema = z
  .object({
    email: validateEmail
  });

// generate form types from zod validation schema
export type QueryResetPasswordSchema = z.infer<typeof queryResetPasswordSchema>;
