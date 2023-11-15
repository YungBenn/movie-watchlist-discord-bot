import { Events, type Client } from "discord.js";

export default {
  name: Events.ClientReady,
  once: true,

  execute(client: Client) {
    console.log(`Ready! Logged as ${client.user?.tag}`);
  }
}