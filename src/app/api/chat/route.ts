import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { getContext } from '@/lib/context';
import { siteConfig } from '@/config/site';
import { constructSystemPrompt } from '@/lib/ai-prompt';
import { ChatRequestSchema } from '@/lib/validations';

// Allow streaming responses up to the configured duration
export const maxDuration = siteConfig.ai.maxDuration;

export async function POST(req: Request) {
  try {
    console.log('API: Received request');
    const body = await req.json();
    
    // Validate input using Zod
    const validation = ChatRequestSchema.safeParse(body);
    
    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid request data', details: validation.error.format() }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { messages, selectedFiles, customInstructions } = validation.data;
    console.log('API: Messages received:', messages.length);
    console.log('API: Selected files:', selectedFiles || 'All');

    const context = await getContext(selectedFiles);
    const systemPrompt = constructSystemPrompt(context, customInstructions);

    console.log(`API: Calling streamText with model ${siteConfig.ai.defaultModel}...`);

    const result = streamText({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      model: anthropic(siteConfig.ai.defaultModel) as any,
      messages,
      system: systemPrompt,
    });

    console.log('API: streamText complete, returning stream...');
    return result.toDataStreamResponse();
  } catch (error: unknown) {
    console.error('API ERROR:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return new Response(
      JSON.stringify({
        error: errorMessage,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
