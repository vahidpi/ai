import OpenAI from 'openai'

// export interface ToolFn<A = any, T = any> {
//     (input: { userMessage: string; toolArgs: A }): Promise<T>
// }

export type AIMessage =
    | OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam
    | { role: 'user'; content: string }
    | { role: 'system'; content: string }
    | { role: 'tool'; content: string; tool_call_id: string };