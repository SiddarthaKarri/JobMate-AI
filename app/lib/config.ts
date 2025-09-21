// Configuration for AI services
export const AI_CONFIG = {
    // OpenRouter configuration
    OPENROUTER_API_KEY: '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',
    OPENROUTER_MODEL: 'x-ai/grok-4-fast:free',
    
    // Rate limiting and retries
    MAX_RETRIES: 2,
    RETRY_DELAY: 1000,
};

// You can move the API key to .env file in production:
// VITE_OPENROUTER_API_KEY=your_api_key_here
// Then use: import.meta.env.VITE_OPENROUTER_API_KEY