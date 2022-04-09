const getApiData = require("../utils/getApiData")
const Discord = require("discord.js")
const commonEndpoints = require("../utils/commonEndpoints")

const TurndownService = require('turndown')

const turndownService = new TurndownService()
exports.run = async (client, message, args) => {
    const datas = client.json[message.author.id] ? client.json[message.author.id].auth : undefined;

    
    const days = 7;
    const date = new Date(Date.now() - (days * 24 * 60 * 60 * 1000)).toISOString().split("T")[0];

    const notRegisteredEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Hiba! ❌")
        .setDescription("Még nem regisztráltál. Használd a **/kreta register** parancsot!");

    if (!datas) return message.channel.send(notRegisteredEmbed)

    const data = await getApiData(`${commonEndpoints.homeworks}?datumTol=${date}`,datas);
    let data2 = [];
    for (let i = 0; i < data.length; i++)
        if (new Date().getTime() < new Date(data[i].HataridoDatuma).getTime()) data2.push(data[i]);

    const nohfs = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("🎉 Házi feladat - Ezaz! 🎉")
        .setDescription("Nem kaptál házi feladatot az elmúlt egy héten 🎉");

    if (!data2.length) return message.channel.send(nohfs)

    for (let i = 0; i < data2.length; i++) {




        let szoveg = data2[i].Szoveg;
        szoveg = turndownService.turndown(szoveg)
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(data2[i].TantargyNeve)
            .addField("Határidő:", data2[i].HataridoDatuma.split("T")[0])
            .addField("Tanár neve:", data2[i].RogzitoTanarNeve)
            .addField("Tartalom:", szoveg);
        message.channel.send(embed)
    }
}