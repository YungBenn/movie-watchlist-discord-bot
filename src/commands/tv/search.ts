import { SlashCommandBuilder, type ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { ITv } from "@src/types/tv";
import { env } from "@src/utils/env";

export default {
  data: new SlashCommandBuilder()
    .setName('search tv series')
    .setDescription('Get tv series detail')
    .addStringOption(option => option
      .setName('title')
      .setDescription('Get tv series detail')
      .setRequired(true)),

  async execute(interaction: ChatInputCommandInteraction) {
    const title = interaction.options.getString('title', true)
    const res = await fetch(`https://api.themoviedb.org/3/search/tv?query=${title}`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${env.apiAccessToken}` },
    })
    const data = await res.json() as { results: ITv[] };

    if (data.results[0] == null) {
      await interaction.reply('TV series not found');
    }

    const tv = data.results[0];
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(tv.title ?? 'Title not found')
      .setURL(`https://www.themoviedb.org/tv/${tv.id}`)
      .setDescription(tv.overview ?? 'Overview not found')
      .setThumbnail(`https://image.tmdb.org/t/p/w500${tv?.poster_path}`)
      .addFields(
        { name: 'Release Date', value: tv.release_date ?? 'Release date not found', inline: true },
        { name: 'Rating', value: tv.vote_average.toString() ?? 'Rating not found', inline: true },
      )
      .setTimestamp()
      .setFooter({ text: 'Movie Bot', iconURL: 'https://i.imgur.com/wSTFkRM.png' });
      
    await interaction.reply({ embeds: [embed] });
  }
}
