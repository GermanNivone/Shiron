// One-time setup and diagnostics. Registers the Telegram webhook against this
// deployment and reports whether the token and target chat actually work.
// Guarded by TELEGRAM_WEBHOOK_SECRET so it cannot be poked by strangers.

const API = (method) =>
  `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/${method}`;

async function call(method, body) {
  const res = await fetch(API(method), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {}),
  });
  return res.json();
}

export default async function handler(req, res) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret || req.query.secret !== secret) {
    return res.status(401).json({ ok: false, error: 'bad or missing secret' });
  }
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    return res.status(500).json({ ok: false, error: 'TELEGRAM_BOT_TOKEN is not set' });
  }
  if (!process.env.TELEGRAM_CHAT_ID) {
    return res.status(500).json({ ok: false, error: 'TELEGRAM_CHAT_ID is not set' });
  }

  const url = `https://${req.headers.host}/api/telegram`;

  const me = await call('getMe');
  const hook = await call('setWebhook', {
    url,
    secret_token: secret,
    allowed_updates: ['message'],
    drop_pending_updates: true,
  });
  const info = await call('getWebhookInfo');
  const chat = await call('getChat', { chat_id: process.env.TELEGRAM_CHAT_ID });

  // Prove the owner chat is actually reachable — a valid id the bot cannot post
  // to is the failure mode that would otherwise only surface on a real lead.
  const probe = await call('sendMessage', {
    chat_id: process.env.TELEGRAM_CHAT_ID,
    text: 'SHIRON: бот подключён. Это проверочное сообщение, заявки будут приходить сюда.',
  });

  return res.status(200).json({
    webhookUrl: url,
    botUsername: me.ok ? me.result.username : null,
    tokenValid: me.ok,
    webhookSet: hook.ok,
    webhookLastError: info.ok ? info.result.last_error_message || null : null,
    chatReachable: chat.ok,
    chatType: chat.ok ? chat.result.type : null,
    chatTitle: chat.ok ? chat.result.title || chat.result.first_name || null : null,
    chatError: chat.ok ? null : chat.description,
    testMessageSent: probe.ok,
    testMessageError: probe.ok ? null : probe.description,
  });
}
