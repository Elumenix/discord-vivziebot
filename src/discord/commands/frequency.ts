import {
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    SlashCommandBuilder
} from "discord.js";
import config from "../../config.js";
import { getGuild, updateGuild } from "../guild.js";

export const data = new SlashCommandBuilder()
    .setName("frequency")
    .setDescription("Use this command to show or change how often I fuckify messages!")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addIntegerOption(option => {
        if (config.limit.frequency > 0) {
            option.setMaxValue(config.limit.frequency);
        }
        return option
            .setName("value")
            .setDescription(`A new frequency to fuckify messages! The lower this is, the more I'll fuckify! The default is ${config.default.frequency}.`)
            .setMinValue(1);
    });

export async function callback(interaction: ChatInputCommandInteraction<"cached">): Promise<void> {
    await interaction.deferReply();
    const newValue = interaction.options.getInteger("value");
    if (newValue) {
        await updateGuild(interaction.guildId, { frequency: newValue });
        await interaction.editReply(`Fuckify frequency changed to one in every \`${newValue}\` messages!`);
    }
    else {
        const guildModel = await getGuild(interaction.guildId);
        await interaction.editReply(`I fuckify roughly one in every \`${guildModel?.frequency ?? config.default.frequency}\` messages!`);
    }
}
