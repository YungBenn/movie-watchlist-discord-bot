import { SlashCommandBuilder, type ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { IMovie } from "@src/types/movie";
import { env } from "@src/utils/env";

export default {
  data: new SlashCommandBuilder()
    .setName('search movie')
    .setDescription('Get movie detail')
    .addStringOption(option => option
      .setName('title')
      .setDescription('Get movie detail')
      .setRequired(true)),

  async execute(interaction: ChatInputCommandInteraction) {
    const title = interaction.options.getString('title', true)
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${env.apiAccessToken}` },
    })
    const data = await res.json() as { results: IMovie[] };

    if (data.results[0] == null) {
      await interaction.reply('Movie not found');
    }

    const movie = data.results[0];
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(movie.title ?? 'Title not found')
      .setURL(`https://www.themoviedb.org/movie/${movie.id}`)
      .setDescription(movie?.overview ?? 'Overview not found')
      .setThumbnail(`https://image.tmdb.org/t/p/w500${movie?.poster_path}`)
      .addFields(
        { name: 'Release Date', value: movie.release_date ?? 'Release date not found', inline: true },
        { name: 'Rating', value: movie.vote_average.toString() ?? 'Rating not found', inline: true },
      )
      .setTimestamp()
      .setFooter({ text: 'Movie Bot', iconURL: 'https://i.imgur.com/wSTFkRM.png' });
      
    await interaction.reply({ embeds: [embed] });
  }
}
