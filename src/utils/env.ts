interface ITypedEnv {
  discordToken: string | undefined
  clientID: string | undefined
  guildID: string
  apiAccessToken: string | undefined
  mongoUri: string
}

const env: ITypedEnv = {
  discordToken: Bun.env.discordToken,
  clientID: Bun.env.CLIENT_ID,
  guildID: <string>Bun.env.GUILD_ID,
  apiAccessToken: Bun.env.API_ACCESS_TOKEN,
  mongoUri: <string>Bun.env.MONGO_URI,
}

export { ITypedEnv, env }
