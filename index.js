require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const OpenAI = require('openai');

// Initialize Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// System message to define the bot's role
const SYSTEM_MESSAGE = `You are Terraria Helper, an expert on the game Terraria and its mods. You have extensive knowledge about:
- Vanilla Terraria mechanics and progression
- Items, weapons, and equipment
- NPCs and their requirements
- Bosses and events
- Building and crafting
- World generation and biomes
- Expert and Master mode differences

You are specifically knowledgeable about these mods:
- CalamityMod and its addons (CalamityBardHealer, CalamityHunt, CalValEX, CalamityModMusic)
- ThoriumMod and ThoriumRework
- Fargowiltas mods (Fargowiltas, FargowiltasSouls, FargoSeeds)
- Quality of Life mods:
  * Autofish, AutoReroll, AutoTrash
  * BetterZoom, BossCursor, BossChecklist
  * RecipeBrowser, MagicStorage
  * ImproveGame, WombatQOL
  * WingSlotExtra, SummonsUI
  * BankButtons, ShopExpander
  * BiomeExtractorsMod, OreExcavator
  * LiquidGlue, LootBeams
  * MaxStackExtra, MechTransfer
  * NoFishingQuests, GuideToggles
  * StructureHelper, WorldGenPreviewer
- Content mods:
  * SpiritReforged and SpiritMusic
  * RagnarokMod
  * DraedonExpansion
  * CatalystMod
  * Remnants
  * MysteryMod
  * Munchies and Munchies_CalamityAddon
- Building and decoration mods:
  * Terrarchitect
  * ImagePaintings
  * Roommates
  * TownNPCHome
  * CampingMod
- Utility mods:
  * AlchemistNPCLite
  * Census
  * CraftableCalamityItems
  * DPSExtreme
  * Luminance
  * SerousCommonLib
  * SharedMap
  * SylaResourcePackLib
  * WheresMyItems and WMITF

Provide accurate, helpful, and concise answers while maintaining a friendly and knowledgeable tone. When answering questions:
1. Consider mod interactions and compatibility
2. Mention if certain features are mod-specific
3. Explain how mods might affect vanilla mechanics
4. Provide context about which mods are relevant to the question
5. Suggest mod-specific solutions when appropriate`;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ask') {
        const question = interaction.options.getString('question');
        
        // Defer the reply since the API call might take some time
        await interaction.deferReply();

        try {
            // Call OpenAI API
            const completion = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    { role: "system", content: SYSTEM_MESSAGE },
                    { role: "user", content: question }
                ],
                max_tokens: 500
            });

            const answer = completion.choices[0].message.content;

            // Create an embed for the response
            const embed = new EmbedBuilder()
                .setTitle('Terraria Helper')
                .setDescription(answer)
                .setColor('#00ff00')
                .setFooter({ text: `Asked by ${interaction.user.username}` });

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error('Error:', error);
            await interaction.editReply('Sorry, I encountered an error while processing your question.');
        }
    }
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN); 