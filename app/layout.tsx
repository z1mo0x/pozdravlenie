import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from 'next/font/local';
import "./globals.css";
import { Toaster } from "sonner";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });


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
    <html lang="ru" className={cn(disruptorFont.variable, musinkaFont.variable, glinaFont.variable, laborUnionFont.variable, "font-sans", geist.variable)}>
      <body>
        {children}

        <Toaster richColors position="bottom-center" />
      </body>
    </html>
  );
}
