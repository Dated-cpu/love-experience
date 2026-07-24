# Digital Love Experience

Премиальный интерактивный веб-сайт-подарок для любимого человека.

## Возможности

- Кинематографичная hero-секция с floating particles и анимированным градиентом
- 3D галерея воспоминаний с tilt-эффектом при наведении
- Таймлайн "Наши моменты" с анимацией появления
- Интерактивные карточки "Почему ты особенная" с раскрытием
- Секретная кнопка с confetti и heart particles
- Финальная сцена с анимированным сердцем
- Кастомный курсор с разными эффектами при наведении
- Плавающие сердца и particle field
- Glassmorphism, градиенты, премиальные анимации
- Полностью responsive
- Поддержка reduced-motion

## Установка

```bash
# Клонировать репозиторий
git clone <repo-url>
cd love-experience

# Установить зависимости
npm install

# Запустить в режиме разработки
npm run dev

# Собрать production версию
npm run build

# Запустить production сервер
npm start
```

## Как изменить текст и контент

Все тексты находятся в `src/data/content.ts`. Откройте файл и измените:

- **hero** — заголовки, приветствие, описание
- **gallery** — карточки воспоминаний (title, description, color, emoji)
- **timeline** — события на таймлайне
- **reasons** — причины "Почему ты особенная"
- **surprise** — текст секретного сообщения
- **final** — финальное сообщение

### Как добавить фотографии

1. Положите изображения в папку `public/`
2. Используйте компонент `Image` из `next/image`:
```tsx
import Image from "next/image";

<Image
  src="/photo.jpg"
  alt="Описание"
  width={400}
  height={300}
  className="rounded-2xl"
/>
```

## Деплой на Vercel

1. Установите [Vercel CLI](https://vercel.com/cli):
```bash
npm i -g vercel
```

2. Задеплойте:
```bash
vercel
```

Или подключите GitHub-репозиторий к [vercel.com](https://vercel.com) — деплой произойдёт автоматически.

## Технологии

- **Next.js 16** — App Router, серверные компоненты
- **React 19** — современные подходы
- **TypeScript** — строгая типизация
- **Tailwind CSS v4** — утилитарные стили
- **Framer Motion** — анимации и переходы
- **Canvas API** — частицы, сердца, confetti

## Структура проекта

```
src/
├── app/
│   ├── layout.tsx          # Root layout, шрифты, metadata
│   ├── page.tsx            # Главная страница
│   └── globals.css         # Глобальные стили, @utility, анимации
├── components/
│   ├── sections/           # Секции страницы
│   │   ├── HeroSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── TimelineSection.tsx
│   │   ├── ReasonsSection.tsx
│   │   ├── SurpriseSection.tsx
│   │   └── FinalScene.tsx
│   ├── ui/                 # Переиспользуемые UI-компоненты
│   │   ├── CustomCursor.tsx
│   │   ├── FloatingHearts.tsx
│   │   ├── GlassCard.tsx
│   │   ├── InteractiveButton.tsx
│   │   ├── ParticleField.tsx
│   │   └── RevealOnScroll.tsx
│   └── effects/            # Визуальные эффекты
│       ├── ConfettiEffect.tsx
│       └── GradientBackground.tsx
├── data/
│   └── content.ts          # Конфигурация контента
├── hooks/
│   ├── useMousePosition.ts
│   └── useReducedMotion.ts
└── lib/
    └── utils.ts            # cn() helper
```

## Кастомизация

### Цвета

Измените тему в `tailwind.config` или CSS-переменные в `globals.css`.

### Шрифты

Замените `Inter` и `Playfair Display` в `src/app/layout.tsx` на другие Google Fonts.

### Анимации

Настройте параметры анимаций в каждом компоненте — длительность, задержки, easing.

## TODO

- [ ] Добавить фотографии в галерею
- [ ] Настроить персонализированный текст в `content.ts`
- [ ] Задеплоить на Vercel
- [ ] Отправить ссылку любимому человеку ❤️