const Discord = require("discord.js");
const table = require("table");

const schoolJson = require("../school-list.json");
exports.run = (client, message, args) => {
    const errorEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Keresés - Hiba! ❌")
        .setDescription("Add meg az iskolád nevét");
    if (!args) return message.channel.send(errorEmbed)

    const school = args.join(" ").toLowerCase()
    results = [];
    for (let i = 0; i < schoolJson.length; i++) {
        if (schoolJson[i].name.toLowerCase().includes(school) || schoolJson[i].instituteCode.toLowerCase().includes(school)) {
            results.push(schoolJson[i]);
        }
    }
    const noSchoolEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Keresés - Hiba! ❌")
        .setDescription("Nem találtunk ilyen iskolát");
    if (!results.length) return message.channel.send(noSchoolEmbed)

    let idk = []
    for (let x = 0; x < results.length; x++) idk[x] = [results[x].name, results[x].instituteCode]
    message.channel.send('```' + table.table(idk) + '```')


}