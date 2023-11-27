import { Client } from "discord.js";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

export async function loadFolder(client: Client, folderName: string) {
  const items: any = []
  const itemFiles = await readdir(join(__dirname, `../${folderName}`))
  for (const folders of itemFiles) {
    const folder = await readdir(join(__dirname, `../${folderName}/${folders}`))
    for (const file of folder) {
      const item = (await import(`../${folderName}/${folders}/${file}`)).default
      if (folderName === 'commands') {
        client.commands.set(item.data.name, item)
        items.push(item.data.toJSON())
      } else if (folderName === 'events') {
        client.on(item.name, (...args) => item.execute(...args))
      }
    }
  }
  return items;
}
