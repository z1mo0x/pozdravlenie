import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from 'next/font/local';
import { Neucha } from 'next/font/google';
import "./globals.css";

// Подключаем Disruptor's Script
const disruptorFont = localFont({
  src: '../public/fonts/disruptor.otf',
  variable: '--font-disruptor',
  display: 'swap',
});

// Подключаем LaborUnion
const laborUnionFont = localFont({
  src: '../public/fonts/labor.otf',
  variable: '--font-labor',
  display: 'swap',
});

// Подключаем Musinka
const musinkaFont = localFont({
  src: '../public/fonts/Musinka.ttf',
  variable: '--font-musinka',
  display: 'swap',
});

const glinaFont = localFont({
  src: '../public/fonts/glina-2.otf',
  variable: '--font-glina',
  display: 'swap',
});


export const metadata: Metadata = {
  title: `Добро пожаловать, малыш!`,
  description: "Интерактивное поздравление с рождением ребёнка.",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru" className={`${disruptorFont.variable} ${musinkaFont.variable} ${glinaFont.variable} ${laborUnionFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
