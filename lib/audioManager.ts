let backgroundMusic: HTMLAudioElement | null = null;
let currentEffect: HTMLAudioElement | null = null;

let isAudioEnabled = false;

export async function enableAudio() {
    isAudioEnabled = true;
}

export async function playBackgroundMusic(
    src = "/audio/background.mp3",
) {
    if (typeof window === "undefined") return;

    if (!backgroundMusic) {
        backgroundMusic = new Audio(src);
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.25;
        backgroundMusic.preload = "auto";
    }

    try {
        await backgroundMusic.play();
        isAudioEnabled = true;
    } catch (error) {
        // console.error("Не удалось запустить музыку:", error);
    }
}

export async function playSceneSound(
    src?: string,
    volume = 0.7,
) {
    if (
        typeof window === "undefined" ||
        !isAudioEnabled ||
        !src
    ) {
        return;
    }

    /*
     * Останавливаем предыдущий эффект, чтобы короткие
     * звуки разных сцен не накладывались друг на друга.
     */
    if (currentEffect) {
        currentEffect.pause();
        currentEffect.currentTime = 0;
    }

    currentEffect = new Audio(src);
    currentEffect.volume = volume;
    currentEffect.preload = "auto";

    try {
        await currentEffect.play();
    } catch (error) {
        console.error(`Не удалось проиграть звук ${src}:`, error);
    }
}

export async function playOverlaySound(
    src: string,
    volume = 0.7,
) {
    if (
        typeof window === "undefined" ||
        !isAudioEnabled
    ) {
        return;
    }

    /*
     * Такой звук может накладываться на другие эффекты.
     * Подходит для кликов, искр, коротких сигналов.
     */
    const effect = new Audio(src);

    effect.volume = volume;
    effect.preload = "auto";

    try {
        await effect.play();
    } catch (error) {
        console.error(`Не удалось проиграть звук ${src}:`, error);
    }
}

export function pauseBackgroundMusic() {
    backgroundMusic?.pause();
}

export async function resumeBackgroundMusic() {
    if (!backgroundMusic) return;

    try {
        await backgroundMusic.play();
    } catch (error) {
        console.error("Не удалось продолжить музыку:", error);
    }
}

export function setBackgroundVolume(volume: number) {
    if (!backgroundMusic) return;

    backgroundMusic.volume = Math.min(
        1,
        Math.max(0, volume),
    );
}

export function stopAllAudio() {
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }

    if (currentEffect) {
        currentEffect.pause();
        currentEffect.currentTime = 0;
    }
}