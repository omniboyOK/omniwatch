const Discord = require("discord.js");
const messageEmbed = new Discord.MessageEmbed();
module.exports = {
  name: "create",
  description: "Crea un personaje",
  extended: `Crea un personaje para tu usuario, solo puedes tener 1 activo por usuario\n
  clases disponibles: ${'`guerrero`'}`,
  async execute(message, args) {
    let user;
    //-- verificamos los argumentos
    if (!args || args.length < 2) {
      message.reply(
        "Debes darme un nombre y una clase, para saber más usa !!help create"
      );
      return;
    }
    //-- verificamos el nombre
    if (args[0].length > 10) {
      message.reply("El nombre no debe tener más de 10 caracteres");
      return;
    }
    //-- verificamos la clase
    try {
      game_class = await global.db
        .collection("classes")
        .findOne({ class: args[1] });

      if (!game_class) {
        message.reply(
          "La clase indicada no existe, usa !!help create para ver una lista de clases disponible"
        );
        return;
      }
    } catch (e) {
      console.log(e);
    }
    try {
      user = await global.db
        .collection("users")
        .findOne({ id: message.author.id });
    } catch (e) {
      console.log(e);
    }

    if (!user) {
      message.reply(
        "Primero debes crear un personaje, usando el comando !create"
      );
      return;
    }

    messageEmbed
      .setColor(user.color || "#6e61bb")
      .setTitle(user.title || "El intitulado")
      .setDescription("Perfil de " + message.author.username)
      .setImage(message.author.avatarURL());

    message.channel.send(exampleEmbed);
  },
};
