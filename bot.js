require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const app = express();

const users = {};

bot.start(ctx => {
  const userId = ctx.from.id;
  if (!users[userId]) {
    users[userId] = { name: ctx.from.first_name, coins: 100, wins: 0 };
  }
  ctx.reply(`سلام ${ctx.from.first_name}! 👋\n\n🎮 Call of Duty Bot\n\n/help - راهنما\n/profile - پروفایل\n/rooms - اتاق‌ها`);
});

bot.command('help', ctx => {
  ctx.reply(`📋 دستورات:\n\n/start - شروع\n/profile - پروفایل\n/rooms - اتاق‌ها\n/coins - کوین‌ها`);
});

bot.command('profile', ctx => {
  const user = users[ctx.from.id];
  ctx.reply(`👤 ${user.name}\n💰 کوین: ${user.coins}\n🏆 برنده: ${user.wins}`);
});

bot.command('coins', ctx => {
  const user = users[ctx.from.id];
  ctx.reply(`💰 شما ${user.coins} کوین دارید!`);
});

bot.command('rooms', ctx => {
  ctx.reply(`🏟️ اتاق‌ها:\n\n1️⃣ رایگان\n2️⃣ پولی\n3️⃣ VIP`);
});

bot.on('text', ctx => {
  ctx.reply('متوجه نشدم. /help برای راهنما');
});

app.get('/', (req, res) => {
  res.send('🤖 Call of Duty Bot is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));

bot.launch();
console.log('🤖 Bot running...');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
