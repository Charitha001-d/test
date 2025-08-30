import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface DiseaseDetectionResult {
  disease: string;
  confidence: number;
  severity: 'low' | 'moderate' | 'high' | null;
  isHealthy: boolean;
  description: string;
  treatment: string;
}

export async function analyzePlantImage(base64Image: string): Promise<DiseaseDetectionResult> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `You are an expert plant pathologist specializing in aloe plant diseases. Analyze the uploaded image and detect if the plant has any of these specific diseases:
          
          1. Leaf Spot - Dark spots on leaves
          2. Aloe Rust - Orange/brown rusty patches
          3. Anthracnose - Dark sunken lesions
          4. Sunburn - White/yellow burned areas
          5. Healthy - No visible diseases
          
          Respond with JSON in this exact format:
          {
            "disease": "exact disease name from the list above",
            "confidence": "number between 0 and 1",
            "severity": "low, moderate, high, or null if healthy",
            "isHealthy": "true or false",
            "description": "detailed description of what you see",
            "treatment": "specific treatment recommendations"
          }`
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this aloe plant image for diseases. Focus specifically on detecting Leaf Spot, Aloe Rust, Anthracnose, Sunburn, or if it's Healthy."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 500,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      disease: result.disease || "Unknown",
      confidence: Math.max(0, Math.min(1, result.confidence || 0)),
      severity: result.severity === 'null' ? null : result.severity,
      isHealthy: result.isHealthy === true,
      description: result.description || "No description available",
      treatment: result.treatment || "No treatment recommendations available",
    };
  } catch (error) {
    console.error("OpenAI analysis failed:", error);
    throw new Error("Failed to analyze plant image: " + (error instanceof Error ? error.message : "Unknown error"));
  }
}