// OpenAI Configuration
// Replace 'your-openai-api-key-here' with your actual OpenAI API key
const OPENAI_API_KEY = 'your-openai-api-key-here';

// OpenAI API Configuration
const OPENAI_CONFIG = {
    apiKey: OPENAI_API_KEY,
    baseURL: 'https://api.openai.com/v1',
    model: 'gpt-3.5-turbo',
    maxTokens: 1000,
    temperature: 0.7
};

// Legal-specific prompt for Nyaya AI
const LEGAL_SYSTEM_PROMPT = `You are Nyaya AI, a specialized legal assistant for Indian law. Your role is to:

1. Provide accurate legal guidance based on Indian laws including:
   - Indian Penal Code (IPC)
   - Code of Criminal Procedure (CrPC)
   - Code of Civil Procedure (CPC)
   - Indian Evidence Act
   - Constitution of India
   - Various other Indian statutes

2. Always include relevant section numbers and act names when applicable

3. Recommend appropriate legal professionals based on case type and location

4. Provide step-by-step guidance for legal procedures

5. Emphasize that your advice is for general understanding and users should consult qualified lawyers for specific cases

6. Be helpful, professional, and empathetic in your responses

7. If asked about non-legal matters, politely redirect to legal topics

Remember: Always include a disclaimer that your advice is for general guidance and not a substitute for professional legal consultation.`;

// Function to call OpenAI API
async function callOpenAI(userMessage) {
    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your-openai-api-key-here') {
        throw new Error('OpenAI API key not configured');
    }

    try {
        const response = await fetch(`${OPENAI_CONFIG.baseURL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_CONFIG.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: OPENAI_CONFIG.model,
                messages: [
                    {
                        role: 'system',
                        content: LEGAL_SYSTEM_PROMPT
                    },
                    {
                        role: 'user',
                        content: userMessage
                    }
                ],
                max_tokens: OPENAI_CONFIG.maxTokens,
                temperature: OPENAI_CONFIG.temperature
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        throw error;
    }
}

// Make functions available globally
window.OPENAI_CONFIG = OPENAI_CONFIG;
window.callOpenAI = callOpenAI;




