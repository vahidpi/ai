import 'dotenv/config';
import { runAgent } from './agent';
import { z } from 'zod';

const userMessage = process.argv[2];

if (!userMessage) {
    console.error('Please provide a message');
    process.exit(1);
}

async function main() {
    runAgent({
        userMessage,
        tools: [{ name: 'weather', parameters: z.object({}).describe('get the weather') }],
    });
}

main()