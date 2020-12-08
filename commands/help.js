const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "Guia de comandos",
  extended: "Muestra una lista con todos los comandos disponibles",
  execute(message, args) {
    let commands = [];
    const embedMessage = new Discord.MessageEmbed();

    const commandFiles = fs
      .readdirSync("./commands")
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`./${file}`);
      commands.push(command);
    }

    if (args[0]) {
      let command = commands.find((elem) => (elem.name === args[0]))
      if(command) {
        embedMessage
        .setColor("#e35cb8")
        .setAuthor(command.name, "")
        .setDescription(
          command.extended
        );
      } else {
        embedMessage
        .setColor("#e35cb8")
        .setAuthor("Comando erroneo", "")
        .setDescription(
          "No pude encontrar el comando especificado"
        );
      }
      
      message.channel.send(embedMessage);
      return;
    }

    embedMessage
      .setColor("#e35cb8")
      .setAuthor("Omniwatch Lista de comandos", "")
      .setDescription(
        "Resumen de todos los comandos disponibles, para más ayuda usa !help y el nombre del comando"
      );

    commands.forEach((elem) => {
      embedMessage.addField("`!!" + elem.name + "`", elem.description, false);
    });

    message.channel.send(embedMessage);
  },
};
