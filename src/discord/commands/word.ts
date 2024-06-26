import {
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    SlashCommandBuilder
} from "discord.js";
import config from "../../config.js";
import { getGuild, updateGuild } from "../guild.js";

const WhitespacePattern = /\s/;

export const data = new SlashCommandBuilder()
    .setName("word")
    .setDescription("Use this command to show or change what word I fuckify messages with!")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addStringOption(option => {
        if (config.limit.wordLength > 0) {
            option.setMaxLength(config.limit.wordLength);
        }
        return option
            .setName("value")
            .setDescription(`A new word to fuckify with! No spaces, please! The default is ${config.default.word}!`);
    });

export async function callback(interaction: ChatInputCommandInteraction<"cached">): Promise<void> {
    await interaction.deferReply();
    const newValue = interaction.options
        .getString("value")
        ?.toLowerCase();
    if (newValue) {
        if (WhitespacePattern.test(newValue)) {
            await interaction.editReply("No spaces, please!");
        }
        else {
            await updateGuild(interaction.guildId, { word: newValue });
            await interaction.editReply(`Fuckification word changed to \`${newValue}\`!`);
        }
    }
    else {
        const guildModel = await getGuild(interaction.guildId);
        await interaction.editReply(`I fuckify messages with the word \`${guildModel?.word ?? config.default.word}\`!`);
    }
}
