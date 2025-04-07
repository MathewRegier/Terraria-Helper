require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'ask',
        description: 'Ask Terraria Helper any question about Terraria',
        options: [
            {
                name: 'question',
                description: 'Your Terraria-related question',
                type: 3, // STRING type
                required: true
            }
        ]
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})(); 