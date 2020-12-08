const Discord = require("discord.js");
module.exports = {
  name: "badge",
  description: "Perfil de tu personaje",
  extended: "Muestra el perfil con todas las estadisticas de tu personaje",
  async execute(message, args) {
    let user;
    try {
      user = await global.db
        .collection("users")
        .findOne({ id: message.author.id });
      console.log(user);
    } catch (e) {
      console.log(e);
    }

    if (!user) {
      message.reply(
        "Primero debes crear un personaje, usando el comando !create"
      );
      return;
    }

    const exampleEmbed = new Discord.MessageEmbed()
      .setColor(user.color || '#6e61bb')
      .setTitle(user.title || 'El intitulado')
      .setDescription("Perfil de " + message.author.username)
      .setImage(message.author.avatarURL());

    message.channel.send(exampleEmbed);
  },
};
