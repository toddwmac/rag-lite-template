import { z } from 'zod';

export const ChatRequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().max(10000),
  })).max(100),
  selectedFiles: z.array(z.string()).optional(),
  customInstructions: z.string().optional(),
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;
