'use client';

import {
    PointerEvent,
    useCallback,
    useEffect,
    useRef,
} from 'react';

type SignaturePadProps = {
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    className?: string;
};

type Point = {
    x: number;
    y: number;
};

export default function SignaturePad({
    value = '',
    onChange,
    label = 'Автограф, пожалуйста',
    className = '',
}: SignaturePadProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const isDrawingRef = useRef(false);
    const lastPointRef = useRef<Point | null>(null);
    const valueRef = useRef(value);

    const prepareContext = useCallback(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return null;
        }

        const context = canvas.getContext('2d');

        if (!context) {
            return null;
        }

        context.lineWidth = 3;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = '#cc0050';

        return context;
    }, []);

    const drawSavedSignature = useCallback(
        (dataUrl: string) => {
            const canvas = canvasRef.current;
            const wrapper = wrapperRef.current;

            if (!canvas || !wrapper) {
                return;
            }

            const context = prepareContext();

            if (!context) {
                return;
            }

            const rectangle = wrapper.getBoundingClientRect();

            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.restore();

            if (!dataUrl) {
                return;
            }

            const image = new Image();

            image.onload = () => {
                context.drawImage(
                    image,
                    0,
                    0,
                    rectangle.width,
                    rectangle.height,
                );
            };

            image.src = dataUrl;
        },
        [prepareContext],
    );

    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const wrapper = wrapperRef.current;

        if (!canvas || !wrapper) {
            return;
        }

        const rectangle = wrapper.getBoundingClientRect();

        if (!rectangle.width || !rectangle.height) {
            return;
        }

        /*
         * Сохраняем текущее изображение перед изменением размера canvas.
         * При изменении width/height canvas автоматически очищается.
         */
        const currentSignature = canvas.width
            ? canvas.toDataURL('image/png')
            : valueRef.current;

        const pixelRatio = Math.max(
            window.devicePixelRatio || 1,
            1,
        );

        canvas.width = Math.round(
            rectangle.width * pixelRatio,
        );

        canvas.height = Math.round(
            rectangle.height * pixelRatio,
        );

        canvas.style.width = `${rectangle.width}px`;
        canvas.style.height = `${rectangle.height}px`;

        const context = prepareContext();

        if (!context) {
            return;
        }

        context.setTransform(
            pixelRatio,
            0,
            0,
            pixelRatio,
            0,
            0,
        );

        const signature =
            currentSignature !== 'data:,'
                ? currentSignature
                : valueRef.current;

        if (signature) {
            const image = new Image();

            image.onload = () => {
                context.drawImage(
                    image,
                    0,
                    0,
                    rectangle.width,
                    rectangle.height,
                );
            };

            image.src = signature;
        }
    }, [prepareContext]);

    useEffect(() => {
        resizeCanvas();

        const wrapper = wrapperRef.current;

        if (!wrapper) {
            return;
        }

        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas();
        });

        resizeObserver.observe(wrapper);

        return () => {
            resizeObserver.disconnect();
        };
    }, [resizeCanvas]);

    useEffect(() => {
        /*
         * Если значение изменили снаружи,
         * например очистили certificateData.autograph.
         */
        if (value === valueRef.current) {
            return;
        }

        valueRef.current = value;
        drawSavedSignature(value);
    }, [value, drawSavedSignature]);

    const getPointerPosition = (
        event: PointerEvent<HTMLCanvasElement>,
    ): Point => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return {
                x: 0,
                y: 0,
            };
        }

        const rectangle = canvas.getBoundingClientRect();

        return {
            x: event.clientX - rectangle.left,
            y: event.clientY - rectangle.top,
        };
    };

    const startDrawing = (
        event: PointerEvent<HTMLCanvasElement>,
    ) => {
        event.preventDefault();

        const canvas = canvasRef.current;
        const context = prepareContext();

        if (!canvas || !context) {
            return;
        }

        canvas.setPointerCapture(event.pointerId);

        const point = getPointerPosition(event);

        isDrawingRef.current = true;
        lastPointRef.current = point;

        context.beginPath();
        context.moveTo(point.x, point.y);

        /*
         * Маленькая точка, чтобы обычный клик
         * тоже оставлял след.
         */
        context.lineTo(point.x + 0.01, point.y + 0.01);
        context.stroke();
    };

    const draw = (
        event: PointerEvent<HTMLCanvasElement>,
    ) => {
        if (!isDrawingRef.current) {
            return;
        }

        event.preventDefault();

        const context = prepareContext();

        if (!context) {
            return;
        }

        const point = getPointerPosition(event);
        const lastPoint = lastPointRef.current;

        if (!lastPoint) {
            lastPointRef.current = point;
            return;
        }

        /*
         * Квадратичная кривая делает линию
         * более плавной, чем обычный lineTo.
         */
        const middleX = (lastPoint.x + point.x) / 2;
        const middleY = (lastPoint.y + point.y) / 2;

        context.quadraticCurveTo(
            lastPoint.x,
            lastPoint.y,
            middleX,
            middleY,
        );

        context.stroke();

        lastPointRef.current = point;
    };

    const finishDrawing = (
        event: PointerEvent<HTMLCanvasElement>,
    ) => {
        if (!isDrawingRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const context = prepareContext();

        isDrawingRef.current = false;
        lastPointRef.current = null;

        if (context) {
            context.closePath();
        }

        if (!canvas) {
            return;
        }

        if (canvas.hasPointerCapture(event.pointerId)) {
            canvas.releasePointerCapture(event.pointerId);
        }

        const signature = canvas.toDataURL('image/png');

        valueRef.current = signature;
        onChange?.(signature);
    };

    return (
        <div
            className={`signature-pad ${className}`}
        >
            <div className="certificate-field__label text">
                {label}
            </div>

            <div
                ref={wrapperRef}
                className="signature-pad__window"
            >
                <canvas
                    ref={canvasRef}
                    className="signature-pad__canvas"
                    onPointerDown={startDrawing}
                    onPointerMove={draw}
                    onPointerUp={finishDrawing}
                    onPointerCancel={finishDrawing}
                    onPointerLeave={(event) => {
                        if (
                            isDrawingRef.current &&
                            event.buttons === 0
                        ) {
                            finishDrawing(event);
                        }
                    }}
                    aria-label="Поле для автографа"
                />
            </div>
        </div>
    );
}