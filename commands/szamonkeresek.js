const getApiData = require("../utils/getApiData")
const Discord = require("discord.js")
const commonEndpoints = require("../utils/commonEndpoints")
exports.run = async (client, message, args) => {
    const datas = client.json[message.author.id] ? client.json[message.author.id].auth : undefined;

    const days = 7;
    const date = new Date(Date.now() - (days * 24 * 60 * 60 * 1000)).toISOString().split("T")[0];

    const notRegisteredEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Hiba! ❌")
        .setDescription("Még nem regisztráltál. Használd a **/kreta register** parancsot!");

    if (!datas) return message.channel.send(notRegisteredEmbed)

    const data = await getApiData(`${commonEndpoints.exams}`,datas);
        let data2 = [];
        for (let i = 0; i < data.length; i++)
            if (new Date().getTime() < new Date(data[i].Datum).getTime()) data2.push(data[i]);
        const nohfs = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("🎉 Számonkérések - Ezaz! 🎉")
            .setDescription("Nincs bejelentett számonkérésed 🎉");

        if (!data2.length) return message.channel.send(nohfs)

        for (let i = 0; i < data2.length; i++) {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(data2[i].TantargyNeve)
                .addField("Mód:", data2[i].Modja.Leiras)
                .addField("Téma:", data2[i].Temaja)
                .addField("Dátum:", data2[i].Datum.split("T")[0])
                .addField("Tanár neve:", data2[i].RogzitoTanarNeve)
            message.channel.send(embed)
        }
}