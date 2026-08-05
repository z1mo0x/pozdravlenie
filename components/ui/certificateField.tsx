'use client';

import type {
    ChangeEvent,
    HTMLInputTypeAttribute,
} from 'react';
import { useState } from 'react';
import { AnimatedEye } from './animatedEye';
import Image from 'next/image';

type CertificateFieldProps = {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
};

export default function CertificateField({
    id,
    label,
    value,
    onChange,
    type = 'text',
    placeholder = '',
}: CertificateFieldProps) {
    const [isOpened, setIsOpened] = useState(false);

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        onChange(event.target.value);
    };

    const toggleField = () => {
        setIsOpened((prev) => !prev);
    };

    const hiddenValue = '*'.repeat(Math.min(Math.max(value.length, 8), 12));

    return (
        <div className="certificate-field">
            <label
                htmlFor={id}
                className="certificate-field__label text"
            >
                {label}
            </label>

            <div
                className={`certificate-field__control  ${isOpened
                    ? 'certificate-field__control--opened'
                    : 'certificate-field__control--closed'
                    }`}
            >
                <input
                    id={id}
                    name={id}
                    type={type}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="certificate-field__input"
                    autoComplete="off"
                    readOnly={!isOpened}
                    tabIndex={isOpened ? 0 : -1}
                />

                {!isOpened && (
                    <div
                        className="certificate-field__mask"
                        onClick={toggleField}
                        aria-hidden="true"
                    >
                        {hiddenValue}
                    </div>
                )}

                <button
                    type="button"
                    className="certificate-field__action relative"
                    onClick={toggleField}
                    aria-label={
                        isOpened
                            ? `Скрыть поле «${label}»`
                            : `Открыть поле «${label}»`
                    }
                    aria-pressed={isOpened}
                >
                    <div className="text-block text-block-down">
                        <Image src={'/text-block-down.png'} width={323} height={210} alt="Блок текста" />
                        <div className="text">
                            Расскажи секретик!
                        </div>
                    </div>
                    <AnimatedEye isOpen={isOpened} />
                </button>
            </div>
        </div>
    );
}
export function formatDate(date: string) {
    if (!date) {
        return '';
    }

    const [year, month, day] = date.split('-');

    return `${day}/${month}/${year}`;
}