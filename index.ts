import { Telegraf } from 'telegraf'

const INTERVAL = (process.env.INTERVAL ? parseInt(process.env.INTERVAL) : 10) * 1000 // Polling interval (in seconds)
const BOT_TOKEN = process.env.BOT_TOKEN

let bot
if (BOT_TOKEN) { bot = new Telegraf(BOT_TOKEN) }

const infiniteLoop = async () => {
  console.log('running a circle')

  await new Promise(resolve => setTimeout(resolve, INTERVAL));

  infiniteLoop()
}

infiniteLoop()
