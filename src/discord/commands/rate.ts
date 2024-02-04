import {
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    SlashCommandBuilder
} from "discord.js";
import config from "../../config.js";
import { getGuild, updateGuild } from "../guild.js";

export const data = new SlashCommandBuilder()
    .setName("rate")
    .setDescription("Use this command to show or change the amount of syllables fuckified when I fuckify a message!")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addIntegerOption(option => {
        if (config.limit.rate > 0) {
            option.setMaxValue(config.limit.rate);
        }
        return option
            .setName("value")
            .setDescription(`A new rate to fuckify syllables! The lower this is, the more I'll fuckify! The default is ${config.default.rate}.`)
            .setMinValue(1);
    });

export async function callback(interaction: ChatInputCommandInteraction<"cached">): Promise<void> {
    await interaction.deferReply();
    const newValue = interaction.options.getInteger("value");
    if (newValue) {
        await updateGuild(interaction.guildId, { rate: newValue });
        await interaction.editReply(`Fuckify rate changed to one in every \`${newValue}\` syllables per fuckified message!`);
    }
    else {
        const guildModel = await getGuild(interaction.guildId);
        await interaction.editReply(`I fuckify roughly one in every \`${guildModel?.rate ?? config.default.rate}\` syllables per fuckified message!`);
    }
}
