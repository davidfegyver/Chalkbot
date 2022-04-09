const { helpEmbed } = require("../utils/embeds");

exports.run = (client, message) => {
  message.channel.send(helpEmbed);
};
