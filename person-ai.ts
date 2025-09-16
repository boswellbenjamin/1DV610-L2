import type { Person } from "./person.ts";
import { load } from "https://deno.land/std@0.208.0/dotenv/mod.ts";

export interface AIGenerationOptions {
  width?: number;
  height?: number;
  steps?: number;
  guidanceScale?: number;
  model?: string;
}

export class PersonAI {
  private static readonly DEFAULT_MODEL =
    "2c8e954decbf70b7607a4414e5785ef9e4de4b8c51d50fb8b8b349160e0ef6bb";
  private static readonly DEFAULT_OPTIONS: Required<AIGenerationOptions> = {
    width: 512,
    height: 512,
    steps: 20,
    guidanceScale: 7.5,
    model: PersonAI.DEFAULT_MODEL,
  };

  private static async loadApiToken(): Promise<string> {
    const env = await load();
    const token = env["REPLICATE_API_TOKEN"];
    if (!token) {
      throw new Error("REPLICATE_API_TOKEN not found in .env file");
    }
    return token;
  }

  static async generatePortrait(
    person: Person,
    apiToken: string,
    options: AIGenerationOptions = {}
  ): Promise<string> {
    const config = { ...PersonAI.DEFAULT_OPTIONS, ...options };

    const prompt = PersonAI.buildPrompt(person);

    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: config.model,
        input: {
          prompt: prompt,
          width: config.width,
          height: config.height,
          num_inference_steps: config.steps,
          guidance_scale: config.guidanceScale,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Replicate API error: ${response.status} ${response.statusText}`
      );
    }

    const prediction = await response.json();

    let result = prediction;
    while (result.status === "starting" || result.status === "processing") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const pollResponse = await fetch(result.urls.get, {
        headers: {
          Authorization: `Token ${apiToken}`,
        },
      });

      if (!pollResponse.ok) {
        throw new Error(
          `Polling failed: ${pollResponse.status} ${pollResponse.statusText}`
        );
      }

      result = await pollResponse.json();
    }

    if (result.status === "succeeded" && result.output) {
      const imageUrl = Array.isArray(result.output)
        ? result.output[0]
        : result.output;
      person.setPortraitUrl(imageUrl);
      return imageUrl;
    }

    throw new Error(
      `Portrait generation failed: ${result.error || "Unknown error"}`
    );
  }

  static async generatePortraitFromEnv(
    person: Person,
    options: AIGenerationOptions = {}
  ): Promise<string> {
    const apiToken = await PersonAI.loadApiToken();
    return PersonAI.generatePortrait(person, apiToken, options);
  }

  private static buildPrompt(person: Person): string {
    return `Professional portrait of a ${person.getAge()}-year-old ${person
      .getGender()
      .toLowerCase()} ${person
      .getProfession()
      .toLowerCase()} from ${person.getCountry()}, high quality photography, professional headshot, clean background, photorealistic`;
  }
}
