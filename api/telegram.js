const API = (method) =>
  `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/${method}`;

async function call(method, body) {
  const res = await fetch(API(method), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

const CONTACT_KEYBOARD = {
  keyboard: [[{ text: '📱 Поделиться контактом', request_contact: true }]],
  resize_keyboard: true,
  one_time_keyboard: true,
};

function describe(contact, from) {
  const parts = ['Новая заявка с сайта SHIRON', ''];
  const name = [contact.first_name, contact.last_name].filter(Boolean).join(' ');
  if (name) parts.push(`Имя: ${name}`);
  parts.push(`Телефон: ${contact.phone_number}`);
  if (from?.username) parts.push(`Telegram: @${from.username}`);
  if (contact.user_id) parts.push(`Профиль: tg://user?id=${contact.user_id}`);
  return parts.join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  // Telegram echoes this header back on every delivery; anything else is not Telegram.
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (secret && req.headers['x-telegram-bot-api-secret-token'] !== secret) {
    return res.status(401).json({ ok: false });
  }

  const msg = req.body?.message;
  // Always 200: a non-2xx makes Telegram retry the same update indefinitely.
  if (!msg) return res.status(200).json({ ok: true });

  try {
    if (msg.contact) {
      await call('sendMessage', {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: describe(msg.contact, msg.from),
      });
      await call('sendMessage', {
        chat_id: msg.chat.id,
        text: 'Спасибо! Заявка принята — свяжемся с вами в рабочие часы, 8:00—19:00.',
        reply_markup: { remove_keyboard: true },
      });
    } else {
      await call('sendMessage', {
        chat_id: msg.chat.id,
        text:
          'Здравствуйте! Это студия SHIRON.\n\n' +
          'Чтобы записаться, нажмите кнопку ниже — мы получим ваш контакт и свяжемся с вами. ' +
          'Заполнять ничего не нужно.',
        reply_markup: CONTACT_KEYBOARD,
      });
    }
  } catch (err) {
    console.error('telegram webhook failed', err);
  }

  return res.status(200).json({ ok: true });
}
