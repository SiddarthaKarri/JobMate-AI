// Configuration for AI services
export const AI_CONFIG = {
    // OpenRouter configuration
    OPENROUTER_API_KEY: import.meta.env.VITE_OPENROUTER_API_KEY,
    OPENROUTER_MODEL: 'x-ai/grok-4-fast:free',
    
    // Rate limiting and retries
    MAX_RETRIES: 2,
    RETRY_DELAY: 1000,
};