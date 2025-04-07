# Terraria Helper Discord Bot

A Discord bot that uses GPT-4 to answer Terraria-related questions. The bot is designed to be a knowledgeable assistant for all things Terraria, from game mechanics to item information and progression guides.

## Features

- `/ask` command to ask any Terraria-related question
- Powered by GPT-4 for accurate and detailed responses
- Clean and organized responses using Discord embeds
- Expert knowledge about Terraria game mechanics, items, NPCs, and more

## Setup Instructions

1. Clone this repository
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Create a Discord application and bot:
   - Go to the [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a new application
   - Go to the "Bot" section and create a bot
   - Copy the bot token
   - Enable the "Message Content Intent" under Privileged Gateway Intents
   - Copy the Application ID (Client ID) from the "General Information" section

4. Get an OpenAI API key:
   - Go to [OpenAI](https://platform.openai.com/)
   - Create an account and get an API key

5. Configure your `.env` file:
   - Add your Discord bot token as `DISCORD_TOKEN`
   - Add your OpenAI API key as `OPENAI_API_KEY`
   - Add your Discord Application ID as `CLIENT_ID`

6. Register the slash commands:
   ```bash
   node deploy-commands.js
   ```

7. Start the bot:
   ```bash
   npm start
   ```

## Usage

Use the `/ask` command followed by your Terraria-related question. For example:
```
/ask What's the best way to defeat the Moon Lord?
```

The bot will respond with a detailed answer in a nice embed format.

## Note

Make sure to keep your `.env` file secure and never share your API keys or tokens publicly. 