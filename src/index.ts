import { Client, GatewayIntentBits, Partials, Collection, Events } from "discord.js";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { env } from "./utils/env";

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

const commands: any = []
const commandFiles = await readdir(join(__dirname, './commands'))
for (const folders of commandFiles) {
  const folder = await readdir(join(__dirname, `./commands/${folders}`))
  for (const file of folder) {
    const command = (await import(`./commands/${folders}/${file}`)).default
    client.commands.set(command.data.name, command)
    commands.push(command.data.toJSON())
  }
}

const eventFiles = await readdir(join(__dirname, './events'))
for (const file of eventFiles) {
  const event = (await import(`./events/${file}`)).default
  client.on(event.name, (...args) => event.execute(...args))
}

client.on(Events.ClientReady, async (c) => {
  await client.guilds.cache.get(env.guildID)?.commands.set(commands)
  await client.application?.commands.set(commands)
})

await client.login(env.discordToken)
