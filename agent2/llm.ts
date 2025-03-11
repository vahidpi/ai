import { zodFunction } from 'openai/helpers/zod'
import { z } from 'zod'
import type { AIMessage } from './types'
import { openai } from './ai'


export const runLLM = async ({
    model = 'gpt-4o-mini',
    messages,
    temperature,
    tools
}: {
    messages: AIMessage[]
    temperature?: number
    model?: string
    tools: { name: string; parameters: z.AnyZodObject }[]
}) => {
    const formattedTools = tools?.map((tool) => zodFunction(tool))
    const response = await openai.chat.completions.create({
        model,
        messages,
        temperature,
        tools: formattedTools,
        tool_choice: 'auto',
        parallel_tool_calls: false,
    })

    return response.choices[0].message
}
