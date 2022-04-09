const Discord = require('discord.js')
const {prefix} = require('../settings.json')
exports.run = (client, message, args) => {
    const helpembed = new Discord.MessageEmbed()
        .setTitle("ℹ️ Segítség ℹ️")
        .addField(`**${prefix}kreta register**`, "📝 Beregisztrál a botba 📝")
        .addField(`**${prefix}kreta unregister**`, "🗝️ Törli az adataid 🗝️")
        .addField(`**${prefix}kreta jegyek**`, "🧪 Kiírja a legutóbbi héten kapott jegyed 🧪")
        .addField(`**${prefix}kreta atlag**`, "✏️ Kiírja a tantárgyi átlagaid ✏️")
        .addField(`**${prefix}kreta orarend**`, "Kiírja az órarended (Telón ajánlott fektetett módban)")
        .addField(`**${prefix}kreta hianyzasok**`, "Kiírja az mulasztásaid")
        .addField(`**${prefix}kreta feljegyzesek**`, "✏️ Kiírja a legutóbbi héten kapott feljegyzéseid (Max 10) ✏️")
        .addField(`**${prefix}kreta hazifeladat**`, "📚 A házi feladataid a hétre 📚")
        .addField(`**${prefix}kreta keres**`, "📚 Megkeresi az iskoládat 📚")
        .addField(`**${prefix}kreta szamonkeresek**`, "📚 A bejelentett számonkéréseid 📚")
        .addField(`**${prefix}kreta whoami**`, "❓ Kiírja az adataid amit a kréta tud rólad ❓")
        .addField(`**${prefix}kreta notify**`, "Kréta értesítő rendszer");

    message.channel.send(helpembed)

}