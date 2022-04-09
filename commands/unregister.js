const Discord = require("discord.js");
const fs = require("fs")
exports.run = (client, message, args) => {
    const datas = client.json[message.author.id] ? client.json[message.author.id].auth : undefined;

    const notRegisteredEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Adattörlés - Hiba! ❌")
        .setDescription("Még nem is regisztráltál 🤣");

    if (!datas) return message.channel.send(notRegisteredEmbed)

    const noerrorEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("📝 Adattörlés - Sikerült! 🎉")
        .setDescription("Sikerült! Ne felejts el újra regisztrálni egyszer :D");

    delete client.json[message.author.id];
    fs.writeFileSync('./loginDatas.json', JSON.stringify(client.json, null, 2));

    message.channel.send(noerrorEmbed)
}