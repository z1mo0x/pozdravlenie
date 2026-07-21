# Baby Congrats

Интерактивное поздравление с рождением ребёнка на Next.js 16 и Motion.

## Запуск

Требуется Node.js 22.

```bash
npm ci
npm run dev
```

Откройте:

```text
http://localhost:3000/?name=Миша
```

Без параметра `name` используется имя `Малыш`.

## Структура сцен

Каждая сцена находится в отдельном файле:

```text
components/scenes/
├── IntroScene.tsx
├── DateScene.tsx
├── StatsScene.tsx
├── PhotoScene.tsx
├── FinalScene.tsx
├── index.ts
└── types.ts
```

`components/BirthGreeting.tsx` только переключает сцены и запускает эффекты.

## Как выбрать эффект

В конце файла конкретной сцены измените `exit`:

```tsx
export const introScene: SceneDefinition = {
  id: "intro",
  title: "Начало",
  exit: "up",
  background: "#fff4ee",
  particleColor: "#d8846d",
  Component: IntroScene,
};
```

Доступные эффекты:

```text
up
particles
fade
zoom
blur
slide-left
rotate
flip
split
```

## Как добавить сцену

1. Скопируйте любой файл из `components/scenes/`.
2. Измените JSX и объект `SceneDefinition`.
3. Импортируйте сцену в `components/scenes/index.ts`.
4. Добавьте её в массив `scenes`.

В массиве хранится только порядок. Вся разметка и содержимое остаются внутри отдельного компонента.

## Как заменить картинку

Замените файл:

```text
public/images/baby-placeholder.svg
```

Или положите фотографию, например:

```text
public/images/baby.jpg
```

После этого в `PhotoScene.tsx` измените:

```tsx
src="/images/baby.jpg"
```

## Проверка перед Vercel

```bash
npm ci
npm run build
```

В проекте используется публичный реестр npm, а версии зависимостей зафиксированы.
