import { GoogleGenAI, Type } from "@google/genai";
import { OptimizationResult, HookIdea, ResearchResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const FAST_MODEL = 'gemini-3-flash-preview';
const REASONING_MODEL = 'gemini-3-pro-preview';
const IMAGE_MODEL = 'gemini-2.5-flash-image';

export const researchTopic = async (query: string): Promise<ResearchResult | null> => {
  try {
    const response = await ai.models.generateContent({
      model: REASONING_MODEL,
      contents: `Research current trending topics, news, and insights for LinkedIn regarding: "${query}". 
      Focus on what professionals are talking about right now. 
      Provide a summary, 3 distinct content angles for posts, and relevant facts.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || "";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri
      }));

    return {
      topic: query,
      summary: text.split('\n')[0] || "Trending insights for your niche.",
      contentAngles: text.split('\n').filter(l => l.trim().startsWith('- ') || /^\d\./.test(l)).slice(0, 3),
      sources: sources.slice(0, 3)
    };
  } catch (error) {
    console.error("Error researching topic:", error);
    return null;
  }
};

export const generatePostImage = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: {
        parts: [{ text: `A professional, high-quality, modern minimalist LinkedIn post illustration for: ${prompt}. Cinematic lighting, corporate aesthetic, 16:9 aspect ratio.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};

export const generatePostIdeas = async (topic: string, audience: string): Promise<string[]> => {
  try {
    const prompt = `Generate 5 engaging LinkedIn post ideas about "${topic}" for an audience of ${audience}. Return only the list of ideas as strings.`;
    
    const response = await ai.models.generateContent({
      model: FAST_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error generating ideas:", error);
    return ["Error generating ideas. Please try again."];
  }
};

export const optimizeProfileSection = async (section: string, content: string, goal: string): Promise<OptimizationResult> => {
  try {
    const prompt = `
      Act as a top-tier LinkedIn personal branding expert.
      Analyze the following ${section}:
      "${content}"
      
      The user's goal is: ${goal}.
      
      Provide a critique, a score out of 100, 3 specific actionable suggestions, and a rewritten version that is punchy, professional, and optimized for SEO.
    `;

    const response = await ai.models.generateContent({
      model: REASONING_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            critique: { type: Type.STRING },
            suggestions: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            rewrittenVersion: { type: Type.STRING }
          },
          required: ["score", "critique", "suggestions", "rewrittenVersion"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Error optimizing profile:", error);
    return {
      score: 0,
      critique: "Failed to analyze. Ensure API key is valid.",
      suggestions: [],
      rewrittenVersion: ""
    };
  }
};

export const generateViralHooks = async (topic: string): Promise<HookIdea[]> => {
  try {
    const prompt = `Write 5 viral LinkedIn hooks for the topic: "${topic}". 
    Use different styles: "Controversial", "Storytelling", "Statistic-based", "How-to", and "Mistake-avoidance".`;

    const response = await ai.models.generateContent({
      model: FAST_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING },
              content: { type: Type.STRING }
            }
          }
        }
      }
    });
    
    const rawHooks = JSON.parse(response.text || "[]");
    return rawHooks.map((h: any, i: number) => ({
      id: i.toString(),
      type: h.type,
      content: h.content
    }));

  } catch (error) {
    console.error("Error generating hooks:", error);
    return [];
  }
};

export const improvePostContent = async (content: string): Promise<string> => {
  try {
    const prompt = `Improve the following LinkedIn post to maximize engagement. Keep the tone professional but authentic. Use appropriate formatting (line breaks) and 3-5 relevant hashtags at the end.\n\nOriginal Post:\n${content}`;
    
    const response = await ai.models.generateContent({
      model: FAST_MODEL,
      contents: prompt,
    });

    return response.text || content;
  } catch (error) {
    console.error("Error improving post:", error);
    return content;
  }
};