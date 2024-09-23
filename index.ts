import { Telegraf } from 'telegraf'
import { z } from 'zod'

const Env = z.object({
  BOT_TOKEN: z.string().optional(),
  IP: z.string().ip(),
})

const env = Env.parse(process.env)

const INTERVAL = 5_000 // Polling interval (in seconds)

let bot: Telegraf | null
if (env.BOT_TOKEN) { bot = new Telegraf(env.BOT_TOKEN) }

const infiniteLoop = async () => {
  const currentIP = await fetch('https://checkip.amazonaws.com/').then(res => res.text()).then(s => s.trim())
  if (currentIP === env.IP) {
    process.stdout.write('✅ ')
  } else {
    if (bot) {
      bot.telegram.sendMessage('452184420', `🚨\n\nXKeen IP check failure.\nExpected IP: '${env.IP}'.\nReal IP: '${currentIP}'`)

      // Temporary shit
      await new Promise(resolve => setTimeout(resolve, 10 * 60 * 1_000));
    }
  }

  await new Promise(resolve => setTimeout(resolve, INTERVAL));

  infiniteLoop()
}

infiniteLoop()
