import { REST, Routes } from "discord.js";
import dotenv from "../dotenv.js";
import commands from "./commands/index.js";
const server = require('http');

await dotenv();

const commandData = commands.map(command => command.data.toJSON());
const rest = new REST({ version: "10" })
    .setToken(process.env.DISCORD_TOKEN!);

await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!), { body: commandData });
console.log("Successfully deployed commands");

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

