import { Client, Events, GatewayIntentBits } from 'discord.js';

const token = process.env.DISCORD_TOKEN;

if (!token) {
    throw new Error('Set the DISCORD_TOKEN environment variable before starting the bot.');
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, (message) => {
    if (message.author.bot) return;

    console.log(`[${message.guild?.name ?? 'DM'}] ${message.author.tag}: ${message.content}`);
});

client.on(Events.GuildMemberAdd, (member) => {
    console.log(`${member.user.tag} joined ${member.guild.name}`);
});

client.login(token).catch((error) => {
    console.error('Failed to log in to Discord:', error);
    process.exitCode = 1;
});