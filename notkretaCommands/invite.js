const Discord = require("discord.js");
exports.run = (client, message) => {
  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(
      `Szia! Látom meg akarod hívni a botom. Itt teheted meg: \nhttps://discord.com/oauth2/authorize?client_id=764173204322779226&scope=bot&permissions=0 \n Legyél a ${client.guilds.cache.size+1}. Szerver! `
    );
  message.channel.send(embed);
};
