import { z } from 'zod';

const password = z.string().min(6);

const registerUserSchema = z.object({
  email: z.string().email(),
  password: password,
  firstName: z.string(),
  lastName: z.string(),
});

export { registerUserSchema };
