import { NextResponse } from "next/server";
import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function GET() {
  const models = await openai.listModels().then((res) => res.data.data);

  return NextResponse.json({models}, {status: 200});
}
