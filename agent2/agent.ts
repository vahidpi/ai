import type { AIMessage } from './types'
import { runLLM } from './llm'
import { z } from 'zod'
import { addMessages, getMessages, saveToolResponse } from './memory'
import { logMessage, showLoader } from './ui'
import { runTool } from './toolRunner'


export const runAgent = async ({
    userMessage,
    tools
}: {
    userMessage: string
    tools
}) => {
    await addMessages([
        {
            role: 'user',
            content: userMessage,
        },
    ])

    const loader = showLoader('Thinking...')

    const history = await getMessages()
    const response = await runLLM({
        messages: history,
        tools,
    })

    await addMessages([response])

    logMessage(response)

    if (response.tool_calls) {
        const toolCall = response.tool_calls[0]
        loader.update(`Executing ${toolCall.function.name}`)

        const toolResponse = await runTool(toolCall, userMessage)
        await saveToolResponse(toolCall.id, toolResponse)

        loader.update(`executed: ${toolCall.function.name}`);

        console.log("tool response", toolResponse);
    }


    loader.stop()
    return getMessages()
}