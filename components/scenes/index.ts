import { dateScene } from "@/components/scenes/DateScene";
import { finalScene } from "@/components/scenes/FinalScene";
import { introScene } from "@/components/scenes/IntroScene";
import { photoScene } from "@/components/scenes/PhotoScene";
import { statsScene } from "@/components/scenes/StatsScene";
import type { SceneDefinition } from "@/components/scenes/types";

export const scenes: SceneDefinition[] = [
  introScene,
  dateScene,
  statsScene,
  photoScene,
  finalScene,
];
