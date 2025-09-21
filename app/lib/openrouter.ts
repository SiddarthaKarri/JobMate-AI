interface OpenRouterResponse {
    id: string;
    model: string;
    choices: {
        message: {
            content: string;
            role: string;
        };
        finish_reason: string;
    }[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

class OpenRouterService {
    private apiKey: string;
    private baseURL: string = "https://openrouter.ai/api/v1";
    private model: string = "x-ai/grok-4-fast:free";

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async analyzeResume(pdfText: string, jobTitle: string, jobDescription: string): Promise<Feedback | null> {
        try {
            const prompt = this.buildPrompt(pdfText, jobTitle, jobDescription);
            
            const response = await fetch(`${this.baseURL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'AI Job Analyzer'
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 4000
                })
            });

            if (!response.ok) {
                console.error('OpenRouter API error:', response.status, response.statusText);
                return null;
            }

            const data: OpenRouterResponse = await response.json();
            const content = data.choices[0]?.message?.content;

            if (!content) {
                console.error('No content in OpenRouter response');
                return null;
            }

            // Extract JSON from markdown if present
            const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
            const cleanJson = jsonMatch ? jsonMatch[1] : content;

            try {
                return JSON.parse(cleanJson) as Feedback;
            } catch (parseError) {
                console.error('Failed to parse OpenRouter response:', content);
                return null;
            }
        } catch (error) {
            console.error('OpenRouter service error:', error);
            return null;
        }
    }

    private buildPrompt(pdfText: string, jobTitle: string, jobDescription: string): string {
        return `You are an expert resume reviewer and career advisor. Analyze the following resume for the job position and provide detailed feedback.

**Job Title:** ${jobTitle}
**Job Description:** ${jobDescription}

**Resume Content:**
${pdfText}

Please analyze this resume and provide feedback in the following JSON format. Be realistic and strict in your scoring - most resumes should score between 40-70 unless they are exceptional. Only give scores above 80 for truly outstanding resumes.

{
  "overallScore": <number between 0-100>,
  "strengths": ["strength1", "strength2", "strength3"],
  "improvements": ["improvement1", "improvement2", "improvement3"],
  "compatibility": "Brief assessment of how well this resume matches the job requirements",
  "ATS": {
    "score": <number between 0-100>,
    "tips": [
      {
        "type": "good" | "improve",
        "tip": "Specific ATS tip"
      }
    ]
  },
  "toneAndStyle": {
    "score": <number between 0-100>,
    "tips": [
      {
        "type": "good" | "improve",
        "tip": "Brief tip",
        "explanation": "Detailed explanation"
      }
    ]
  },
  "content": {
    "score": <number between 0-100>,
    "tips": [
      {
        "type": "good" | "improve",
        "tip": "Brief tip",
        "explanation": "Detailed explanation"
      }
    ]
  },
  "structure": {
    "score": <number between 0-100>,
    "tips": [
      {
        "type": "good" | "improve",
        "tip": "Brief tip",
        "explanation": "Detailed explanation"
      }
    ]
  },
  "skills": {
    "score": <number between 0-100>,
    "tips": [
      {
        "type": "good" | "improve",
        "tip": "Brief tip",
        "explanation": "Detailed explanation"
      }
    ]
  }
}

IMPORTANT SCORING GUIDELINES:
- Be realistic and strict with scoring
- Most resumes should score 40-70 overall
- Only exceptional resumes deserve 80+ scores
- Consider the specific job requirements when scoring
- Ensure all component scores align with the overall score (no single component should be dramatically higher/lower than overall)
- Focus on job relevance, not just general resume quality`;
    }
}

export { OpenRouterService };