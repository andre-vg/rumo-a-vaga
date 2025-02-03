import { Client } from "@gradio/client";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const client = await Client.connect(
    "LLMhacker/Realtime-FLUX-Modified-Flux.Schnell-for-JA.P"
  );
  const result = await client.predict("/generate_image", {
    prompt,
    width: 768,
    height: 432,
  });

  return new Response(JSON.stringify(result.data));
}
