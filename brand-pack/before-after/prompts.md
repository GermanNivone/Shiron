# Before / After — единый шаблон сравнения

Модель: **nano_banana_pro**. Соотношение: 1:1 или 4:5, одинаковый ракурс и свет в паре.
Цель — единый "документ", а не разрозненные фото: одна и та же камера, угол, дистанция, освещение для "до" и "после".

## Промпт "До" (шаблон)
```
Photograph of a [CAR PART, e.g. front bumper] showing visible wear/scratches/
dullness, neutral cold studio light from the left at 45 degrees, dark graphite
seamless background, camera at eye level, medium distance, void black ambient,
documentary precision, no dramatic shadows, flat even lighting for comparison
accuracy.
```

## Промпт "После" (тот же кадр, идентичные параметры камеры/света)
```
Photograph of the same [CAR PART] now restored/polished/protected to a flawless
finish, identical camera angle, identical neutral cold studio light from the
left at 45 degrees, identical dark graphite seamless background, identical
distance, void black ambient, documentary precision, flat even lighting for
comparison accuracy, only the surface condition has changed.
```

Пары для генерации: бампер (сколы → покраска), фара (окисление → полировка), диск (царапины → восстановление), капот (матовость → керамика), салон-кожа (потёртости → восстановление).

Важно: генерировать пару за один проход/сессию с фиксацией seed/угла, если модель это поддерживает — иначе результат не будет сопоставим.

Избегать: разный свет/ракурс между "до" и "после", драматизация "до" (специально уродливое повреждение), надписи "BEFORE/AFTER" в самом изображении — это добавляется вёрсткой сайта.
