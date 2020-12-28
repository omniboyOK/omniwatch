// -- Discord bot made by omniboyOK
// -- Invitation link https://discord.com/api/oauth2/authorize?client_id=785680864704200714&permissions=8&scope=bot
require("./driver/mongo");
const Omnibot = require("./src/Omnibot");

let config = {
  token: process.env.TOKEN,
};

let bot = new Omnibot(config);

bot.connect();
