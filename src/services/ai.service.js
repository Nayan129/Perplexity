import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { response } from "express";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

export async function testAi() {
  model.invoke("how do i crack any interview for frontend backend or full stack developer within just 10 days of prepration?").then((response) => {
    console.log(response.text);
  });
}
