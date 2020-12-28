/**
 * @author Pablo Barrea
 * @see https://github.com/OmniboyOK
 * @copyright 2020
 * @license MIT
 */

const fs = require("fs");
const Discord = require("discord.js");
const DiscordClient = require("discord.js").Client;

const prefix = "!!";

class Omnibot {
  constructor(config) {
    const throwErr = (message) => {
      throw new Error(message);
    };
    if (!config) {
      throwErr("No config has been specified!");
    }
    if (config.token === undefined && config.client === undefined) {
      throwErr("You need to specify `token` or `client` for this bot to work!");
    }
    if (config.token !== undefined && config.client !== undefined) {
      throwErr("You can't specify both `token` and `client`! Choose one.");
    }
    if (
      config.client !== undefined &&
      !(
        DiscordClient.objectIsDiscordJS(config.client) ||
        DiscordClient.objectIsDiscordIO(config.client)
      )
    ) {
      throwErr(
        "`client` must be an instance of discord.js or discord.io client!"
      );
    }
    if (
      config.maxLines !== undefined &&
      (typeof config.maxLines !== "number" || config.maxLines < 1)
    ) {
      throwErr("`maxLines` should be an integer greater than zero!");
    }
    if (config.include !== undefined && config.exclude !== undefined) {
      throwErr(
        "You can't specify both included and excluded channels - choose one."
      );
    }
    if (
      config.extractSpoiler !== undefined &&
      typeof config.extractSpoiler !== "function"
    ) {
      throwErr("`extractFunction` must be a function!");
    }
    this.config = config;
  }

  processMessage(message) {
    // if the autor is a bot, no need to respond
    if (message.author.bot) return;

    // if bot is tagged without commands
    if (message.mentions.members.has("785680864704200714")) {
      embedMessage
        .setDescription("Utiliza el prefijo `!!` para usar mis comandos")
        .setAuthor("Omnibot", this.client.user.avatarURL());

      message.channel.send(embedMessage);
      return;
    }

    // if message has no prefix
    if (!message.content.startsWith(prefix)) return;

    // getting the command after prefix
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();

    if (!this.client.commands.has(command)) return;

    try {
      this.client.commands.get(command).execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("No pude entender tu pedido!");
    }
  }

  connect() {
    Promise.resolve()
      .then(() => (this.client = new Discord.Client()))
      .then(() => (this.client.commands = new Discord.Collection()))
      .then(
        () =>
          (this.embedMessage = new Discord.MessageEmbed().setColor("#e35cb8"))
      )
      .then(() => this.client.login(this.config.token))
      .then(() => {
        fs.readdir("./commands", (err, files) => {
          files.filter((item) => item.endsWith(".js"));
          for (const file of files) {
            const command = require(`../commands/${file}`);
            this.client.commands.set(command.name, command);
          }
        });
      })
      .then(() =>
        this.client.on("message", (message) => {
          this.processMessage(message);
        })
      )
      .then(() =>
        console.log(
          "%c Bot conectado correctamente",
          "background: #61b15a; color: #f2efea"
        )
      )
      .catch((error) => console.error(error));
  }
}

module.exports = Omnibot;
