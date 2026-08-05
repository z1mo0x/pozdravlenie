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
import { jsPDF } from 'jspdf';
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

const fieldsContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 1.6,
            staggerChildren: 0.25,
        },
    },
};

const fieldVariants = {
    hidden: {
        opacity: 0,
        y: 18,
        scale: 0.98,
        filter: 'blur(5px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
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

        greetingBlock.style.minHeight = '260svh';

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
                pixelRatio: 5,
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
        <section className="scene scene--certificate relative ">
            <div className="background">
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
            <div className="scene__content">
                TABS
                <div>
                    <div className={`certificate ${isSaving ? 'certificate-saving' : ''}`} ref={certificateRef}>
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
                        <motion.div
                            className="certificate__fields"
                            variants={fieldsContainerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={fieldVariants}>
                                <CertificateField
                                    id="certificate-name"
                                    label="Имя"
                                    value={certificateData.name}
                                    placeholder="Имя"
                                    onChange={(value) => {
                                        changeCertificateField('name', value);
                                    }}
                                />
                            </motion.div>

                            <motion.div variants={fieldVariants}>
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
                            </motion.div>

                            <motion.div variants={fieldVariants}>
                                <CertificateField
                                    id="certificate-city"
                                    label="Город"
                                    value={certificateData.city}
                                    placeholder="Введите город"
                                    onChange={(value) => {
                                        changeCertificateField('city', value);
                                    }}
                                />
                            </motion.div>

                            <motion.div variants={fieldVariants}>
                                <CertificateField
                                    id="certificate-time"
                                    label="Время рождения"
                                    value={certificateData.time}
                                    type="text"
                                    placeholder="Время"
                                    onChange={(value) => {
                                        changeCertificateField('time', value);
                                    }}
                                />
                            </motion.div>

                            <motion.div variants={fieldVariants}>
                                <CertificateField
                                    id="certificate-weight"
                                    label="Вес"
                                    value={certificateData.weight}
                                    type="text"
                                    placeholder="XXX"
                                    onChange={(value) => {
                                        changeCertificateField('weight', value);
                                    }}
                                />
                            </motion.div>

                            <motion.div variants={fieldVariants}>
                                <CertificateField
                                    id="certificate-height"
                                    label="Рост"
                                    value={certificateData.height}
                                    type="text"
                                    placeholder="XXX"
                                    onChange={(value) => {
                                        changeCertificateField('height', value);
                                    }}
                                />
                            </motion.div>
                        </motion.div>

                        <div className="certificate__bottom">
                            <div className="certificate__autograph">
                                <SignaturePad />
                            </div>

                            <div className="certificate__stamp" />
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 0,
                    }}
                    className="flex mt-10 backdrop-blur-[5px] gap-20 items-center p-5 rounded-2xl bg-[rgba(255,255,255,.2)]"
                >
                    <div className="text text-on-white text-left ">
                        Сохраняя свидетельство Иван Степанович <span>подтверждает</span> что оно будет использоваться исключительно дл<span>я радости и</span> составления натальной карты
                    </div>
                    <button
                        type="button"
                        onClick={saveCertificate}
                        disabled={isSaving}
                        className="button-second shrink-0 w-75 flex justify-center gap-5 "
                    >
                        <Image priority src={"/download.svg"}
                            style={{
                                width: "30px",
                                height: "30px",
                            }}
                            width={30} height={30} alt="Иконка" />
                        {isSaving ? 'Сохраняем...' : 'Скачать'}
                    </button>
                </motion.div>
                <div className="flex justify-between items-center -mt-7.5">
                    <div className="text-block text-block-big mt-15">
                        <Image src={'/big-text-block.png'} width={1065} height={160} alt="Блок текста" />
                        <div className="text">
                            Если натальная карта, то только передача!
                        </div>
                    </div>
                    <div className="relative w-85 h-85 flex justify-center items-center">
                        <Image className="absolute -z-1 left-0 top-0" priority src={"/button-flower-2.png"} width={350} height={350} alt="Иконка" />
                        <button
                            type="button"
                            onClick={onNext}
                            disabled={isSaving}
                            className="button-second button-flower shrink-0 flex justify-center items-center gap-5"
                        >
                            <span>
                                Едем дальше
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}


export const certificateScene: SceneDefinition = {
    id: "certificate",
    title: "Начало",
    exit: 'slide-left',
    background: "#FFE4DF",
    particleColor: '#fff',
    Component: CertificateScene,

    sound: "/audio/scenes/start.mp3",
    soundVolume: 0.5,
};
