import type { Person } from "./person.ts";
import { load } from "jsr:@std/dotenv@0.225.3";

export interface AIGenerationOptions {
  width?: number;
  height?: number;
  steps?: number;
  guidanceScale?: number;
  model?: string;
}

export class PortraitGenerator {
  private apiToken: string;
  private defaultModel: string;
  private defaultOptions: Required<AIGenerationOptions>;

  constructor(apiToken: string, options?: Partial<AIGenerationOptions>) {
    this.apiToken = apiToken;
    this.defaultModel = "2c8e954decbf70b7607a4414e5785ef9e4de4b8c51d50fb8b8b349160e0ef6bb";
    this.defaultOptions = {
      width: options?.width ?? 512,
      height: options?.height ?? 512,
      steps: options?.steps ?? 20,
      guidanceScale: options?.guidanceScale ?? 7.5,
      model: options?.model ?? this.defaultModel,
    };
  }

  async generatePortrait(
    person: Person,
    options?: AIGenerationOptions
  ): Promise<string> {
    const config = { ...this.defaultOptions, ...options };
    const prompt = this.buildPrompt(person);

    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${this.apiToken}`,
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
    const imageUrl = await this.pollForResult(prediction);

    person.setPortraitUrl(imageUrl);
    return imageUrl;
  }

  private async pollForResult(prediction: { status: string; urls: { get: string }; output?: string | string[]; error?: string }): Promise<string> {
    let result = prediction;

    while (result.status === "starting" || result.status === "processing") {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const pollResponse = await fetch(result.urls.get, {
        headers: {
          Authorization: `Token ${this.apiToken}`,
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
      return Array.isArray(result.output) ? result.output[0] : result.output;
    }

    throw new Error(
      `Portrait generation failed: ${result.error || "Unknown error"}`
    );
  }

  private buildPrompt(person: Person): string {
    return `Professional portrait of a ${person.getAge()}-year-old ${person
      .getGender()
      .toLowerCase()} ${person
      .getProfession()
      .toLowerCase()} from ${person.getCountry()}, high quality photography, professional headshot, clean background, photorealistic`;
  }
}

export class PortraitGeneratorFactory {
  async createFromEnv(options?: Partial<AIGenerationOptions>): Promise<PortraitGenerator> {
    const env = await load();
    const token = env["REPLICATE_API_TOKEN"];
    if (!token) {
      throw new Error("REPLICATE_API_TOKEN not found in .env file");
    }
    return new PortraitGenerator(token, options);
  }
}
