import { startScene } from "./startScene";
import { introScene } from "@/components/scenes/IntroScene";
import type { SceneDefinition } from "@/components/scenes/types";
import { certificateScene } from "./SertificateScene";
import { wishesScene } from "./WishesScene";

export const scenes: SceneDefinition[] = [
  startScene,
  introScene,
  certificateScene,
  wishesScene,
];
