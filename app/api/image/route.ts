import { NextResponse } from "next/server"
import { OpenAIApi, Configuration } from "openai"
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req: Request){
  console.log('in route')
  try{
    const body = await req.json()
    const {prompt} = body

    console.log('prompt ', prompt)
    
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    const image_url = response.data.data[0].url;
    console.log('image url', image_url)
    return NextResponse.json({image_url})

  }catch(error){
    return new NextResponse('Internal server error', {status: 500})
  }

}