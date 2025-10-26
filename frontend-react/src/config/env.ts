// Environment variable validation and configuration
interface EnvConfig {
  VITE_API_BASE_URL: string;
  VITE_GEMINI_API_KEY?: string;
  VITE_DATABASE_URL?: string;
}

const validateEnv = (): EnvConfig => {
  const config: Partial<EnvConfig> = {
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    VITE_GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
    VITE_DATABASE_URL: import.meta.env.VITE_DATABASE_URL,
  };

  // Validate required environment variables
  if (!config.VITE_API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL is required but not defined in environment variables');
  }

  // Warn about optional but important variables
  if (!config.VITE_GEMINI_API_KEY) {
    console.warn('VITE_GEMINI_API_KEY is not defined. ChatBot functionality will be limited.');
  }

  if (!config.VITE_DATABASE_URL) {
    console.warn('VITE_DATABASE_URL is not defined. Some search features may not work.');
  }

  return config as EnvConfig;
};

export const env = validateEnv();

// Export individual values with fallbacks
export const API_BASE_URL = env.VITE_API_BASE_URL;
export const GEMINI_API_KEY = env.VITE_GEMINI_API_KEY || '';
export const DATABASE_URL = env.VITE_DATABASE_URL || '';

// Helper functions
export const isGeminiEnabled = (): boolean => !!GEMINI_API_KEY;
export const isDatabaseEnabled = (): boolean => !!DATABASE_URL;