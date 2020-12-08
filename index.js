// -- Discord bot made by omniboyOK
// -- Invitation link https://discord.com/api/oauth2/authorize?client_id=785680864704200714&permissions=8&scope=bot
const fs = require("fs");
const prefix = "!";
const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const mongodb = require('./driver/mongo');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on("message", function (message) {
  // si el autor del mensae es un bot, terminar
  if (message.author.bot) return;
  // si el mensaje no tiene prefijo configurado, terminar
  if (!message.content.startsWith(prefix)) return;

  // el comando que viene luego del prefijo
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("No pude entender tu pedido!");
  }
});

try {
  client.login(process.env.TOKEN);
} catch (e) {
  console.warn(e);
}

console.log(
  "%c Bot conectado correctamente",
  "background: #61b15a; color: #f2efea"
);
