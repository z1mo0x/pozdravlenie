import { startScene } from './startScene';
import { introScene } from "@/components/scenes/IntroScene";
import type { SceneDefinition } from "@/components/scenes/types";

export const scenes: SceneDefinition[] = [
  startScene,
  introScene
];
