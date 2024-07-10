import {
  GenerateContentResult,
  VertexAI,
  VertexInit,
} from "@google-cloud/vertexai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const vertexConfig: VertexInit = {
  project: process.env.PROJECT_ID!,
  location: "asia-northeast3",
};
const vertexModelOption = "gemini-1.5-flash-001";

const vertexAi = new VertexAI(vertexConfig);

export const vertexModel = vertexAi.preview.getGenerativeModel({
  model: vertexModelOption,
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 1,
    topP: 0.95,
  },
});

export const vertexResponseToText = ({ response }: GenerateContentResult) =>
  response.candidates?.[0].content.parts.map((part) => part.text).join() || "";
