import type { ComponentType } from "react";

export type ExitEffect =
  | "up"
  | "particles"
  | "fade"
  | "zoom"
  | "blur"
  | "slide-left"
  | "rotate"
  | "flip"
  | "split";

export type SceneComponentProps = {
  childName: string;
  isLocked: boolean;
  onNext: () => void;
};

export type SceneDefinition = {
  id: string;
  title: string;
  exit: ExitEffect;
  background: string;
  particleColor: string;
  Component: ComponentType<SceneComponentProps>;
};
