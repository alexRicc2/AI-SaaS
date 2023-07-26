import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { OpenAIStream, OpenAIStreamPayload } from "@/lib/openAIStream";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { newMessages } = body;
    // console.log("body", body);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!newMessages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const payload: OpenAIStreamPayload = {
      model: "gpt-3.5-turbo",
      messages: newMessages,
      temperature: 0.6,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0.2,
      max_tokens: 1000,
      stream: true,
      n: 1,
    };
    const stream = await OpenAIStream(payload);
    return new Response(stream);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
