import { startScene } from './startScene';
import { introScene } from "@/components/scenes/IntroScene";
import type { SceneDefinition } from "@/components/scenes/types";
import { certificateScene } from './SertificateScene';

export const scenes: SceneDefinition[] = [
  introScene,
  startScene,
  certificateScene,
];
