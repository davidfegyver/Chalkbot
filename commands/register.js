const { onlyDMEmbed, registerEmbed } = require("../utils/embeds");
exports.run = (client, message) => {
  if (message.channel.type != "dm") return message.channel.send(onlyDMEmbed);

  message.channel.send(registerEmbed);
};
