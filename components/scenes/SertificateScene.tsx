"use client";

import { AnimatePresence, motion } from "motion/react";

import SceneButton from "@/components/SceneButton";
import type {
    SceneComponentProps,
    SceneDefinition,
} from "@/components/scenes/types";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import '@tinymomentum/liquid-glass-react/dist/components/LiquidGlassBase.css';
import GlassSurface from '@/components/GlassSurface'
import BlurText from "@/components/BlurText";
import { toast } from "sonner";
import { playOverlaySound } from "@/lib/audioManager";
import { toPng } from "html-to-image";
import CertificateField, { formatDate } from "../ui/certificateField";
import { useGreeting } from "@/contexts/GreetingContext";
import SignaturePad from "../ui/sign";


type CertificateData = {
    name: string;
    birthday: string;
    city: string;
    time: string;
    weight: string;
    height: string;
    autograph: string;
};

function CertificateScene({ isLocked, onNext }: SceneComponentProps) {

    const certificateRef = useRef<HTMLDivElement>(null);
    const [isSaving, setIsSaving] = useState(false);
    const { childName } = useGreeting();
    const [certificateData, setCertificateData] = useState<CertificateData>({
        name: childName,
        birthday: '',
        city: '',
        time: '',
        weight: '',
        height: '',
        autograph: '',
    });


    useEffect(() => {
        const greetingBlock =
            document.querySelector<HTMLElement>('.greeting');

        if (!greetingBlock) return;

        greetingBlock.style.minHeight = '200svh';

        return () => {
            greetingBlock.style.minHeight = '';
        };
    }, []);

    const changeCertificateField = (
        field: keyof CertificateData,
        value: string,
    ) => {
        setCertificateData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const saveCertificate = async () => {
        const certificate = certificateRef.current;

        if (!certificate || isSaving) {
            return;
        }

        try {
            setIsSaving(true);

            // Ждём загрузки шрифтов, чтобы они попали в итоговую картинку
            await document.fonts.ready;

            const image = await toPng(certificate, {
                cacheBust: true,
                pixelRatio: 3,
                backgroundColor: '#ffd2c4',
            });

            const link = document.createElement('a');

            link.download = 'svidetelstvo-bati.png';
            link.href = image;
            link.click();
        } catch (error) {
            console.error('Не удалось сохранить сертификат:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <section className="scene scene--certificate relative">
            <div className="background">
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
            <div className="scene__content">
                TABS
                <div className="certificate" ref={certificateRef}>
                    <motion.h1
                        className="scene__title scene__title--hero"
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 36 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: .5 }}
                        >
                            Свидетельство

                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 36 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: .75 }}
                        >
                            о становлении
                        </motion.p>
                        <motion.span
                            initial={{ opacity: 0, rotate: 0, y: 0, x: 0 }}
                            animate={{ opacity: 1, rotate: -10, y: 10, x: -15 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.25 }}
                        >
                            батьком
                        </motion.span>
                    </motion.h1>
                    <div className="certificate__fields">
                        <CertificateField
                            id="certificate-name"
                            label="Имя"
                            value={certificateData.name}
                            placeholder="Имя"
                            onChange={(value) => {
                                changeCertificateField('name', value);
                            }}
                        />

                        <CertificateField
                            id="certificate-birthday"
                            label="Дата рождения"
                            value={certificateData.birthday}
                            type="text"
                            placeholder="Дата"
                            onChange={(value) => {
                                changeCertificateField('birthday', value);
                            }}
                        />

                        <CertificateField
                            id="certificate-city"
                            label="Город"
                            value={certificateData.city}
                            placeholder="Введите город"
                            onChange={(value) => {
                                changeCertificateField('city', value);
                            }}
                        />

                        <CertificateField
                            id="certificate-time"
                            label="Время рождения"
                            value={certificateData.time}
                            type="text"
                            onChange={(value) => {
                                changeCertificateField('time', value);
                            }}
                        />

                        <CertificateField
                            id="certificate-weight"
                            label="Вес"
                            value={certificateData.weight}
                            type="number"
                            placeholder="3200"
                            onChange={(value) => {
                                changeCertificateField('weight', value);
                            }}
                        />

                        <CertificateField
                            id="certificate-height"
                            label="Рост"
                            value={certificateData.height}
                            type="number"
                            placeholder="57"
                            onChange={(value) => {
                                changeCertificateField('height', value);
                            }}
                        />
                    </div>

                    <div className="certificate__bottom">
                        <div className="certificate__autograph">
                            <SignaturePad />
                        </div>

                        <div className="certificate__stamp" />
                    </div>
                </div>
                {/* Кнопка находится за пределами ref и не попадёт в PNG */}
                <button
                    type="button"
                    onClick={saveCertificate}
                    disabled={isSaving}
                    className="button-second"
                >
                    {isSaving ? 'Сохраняем...' : 'Сохранить сертификат'}
                </button>
            </div>
        </section>
    );
}


export const certificateScene: SceneDefinition = {
    id: "intro",
    title: "Начало",
    exit: 'particles',
    background: "#FFE4DF",
    particleColor: '#fff',
    Component: CertificateScene,

    sound: "/audio/scenes/start.mp3",
    soundVolume: 0.5,
};
