# SHIRON — Brand Asset Pack

Полный пак промптов для генерации фирменных ассетов SHIRON — премиального автосервиса полного цикла.
Не сайт, а всё, что сайт на себе носит: логотип, фотография, движение, текстуры.

## Модели
- **gpt_image_2** — логотип, знаки, иконки (векторная точность, чистые формы)
- **nano_banana_pro** — фотография, текстуры, паттерны, макро-детали
- **seedance_2_0** — motion-фрагменты, кинематографичные лупы

## Общие правила для ВСЕХ промптов
Добавляй в каждый запрос (сокращённо приведено в каждом файле):
- Палитра строго: Void Black `#0A0A0B`, Graphite `#1C1D20`, Matte Steel `#4B4E54`, Warm Fog `#C9C7C1`, Porcelain `#F4F2ED`, Muted Gold `#9C8352` (акцент ≤5%, точечно)
- Вайб: сдержанный, технологичный, премиальный. Ночной шоурум / архитектурный павильон / съёмка для дорогого автожурнала.
- Свет: холодный, направленный, драматичные тени, отражения на металле/стекле.
- Композиция: точная геометрия, асимметрия, много воздуха (negative space).

**Negative prompt (всегда):** red-black racing aesthetic, neon lights, fire, flames, racing stripes, carbon fiber pattern overload, aggressive tribal fonts, bright gold, cheap luxury gloss, heavy glassmorphism, visual clutter, generic mechanic garage, car wash, stock-photo auto repair shop, tuning-instagram style, watermark text, "BEST SERVICE"/"№1"/"PREMIUM QUALITY" text overlays.

## Структура
```
brand-pack/
├── brand/         — логотип, монограмма, знак, иконки сервисов
├── hero/          — главные полноэкранные кадры + motion-луп
├── cars/          — референс-модели как объекты дизайна
├── services/       — 6 направлений сервиса (иконки + фото-пары)
├── equipment/     — оборудование, инструменты, студия
├── detailing/     — детейлинг крупным планом
├── before-after/  — шаблон сравнения
├── location/      — экстерьер студии
├── textures/      — металл/бетон/стекло фоны + паттерны + атмосферные накладки
└── palette.md     — цветовая система (уже готова)
```

Каждая папка содержит `prompts.md` с готовыми промптами: модель, соотношение сторон, промпт, что избегать сверх общего списка.
