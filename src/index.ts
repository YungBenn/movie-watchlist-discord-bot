import { Client, GatewayIntentBits, Partials, Collection, Events } from "discord.js";
import { env } from "./utils/env";
import { loadFolder } from "./utils/helper";
import connectDB from "./db/connect";

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, any>
    // buttons: Collection<string, any>
    // error: typeof import('./handler/error.js').default
    // achievements: typeof import('./handler/achievements.js').default
  }
}

const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Reaction] })

client.commands = new Collection()

const commands = await loadFolder(client, 'commands')
await loadFolder(client, 'events')

client.on(Events.ClientReady, async (c) => {
  await client.guilds.cache.get(env.guildID)?.commands.set(commands)
  await client.application?.commands.set(commands)
})

await connectDB(env)
await client.login(env.discordToken)
