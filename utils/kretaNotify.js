const commonEndpoints = require("./commonEndpoints")
const getApiData = require("./getApiData")
const Discord = require("discord.js")

const TurndownService = require('turndown')
const turndownService = new TurndownService()
const perc = 30
module.exports = (client) => {
    client.logger.info("KrétaNotify futtatása...")
    const dbdata = client.json
    const date = new Date(Date.now() - (24 * 60 * 60 * 1000)).toISOString().split("T")[0];

    Object.keys(dbdata).forEach(async userID => {
        if (!dbdata[userID].kretaNotify) return
        let jegyek = await getApiData(`${commonEndpoints.evaluations}?datumTol=${date}`, dbdata[userID].auth)
        jegyek = jegyek.filter(item => Date.now() - Date.parse(item.KeszitesDatuma) < perc * 60 * 1000)

        let feljegyzesek = await getApiData(`${commonEndpoints.notes}?datumTol=${date}`, dbdata[userID].auth)
        feljegyzesek = feljegyzesek.filter(item => Date.now() - Date.parse(item.KeszitesDatuma) < perc * 60 * 1000)

        let hazifeladatok = await getApiData(`${commonEndpoints.homeworks}?datumTol=${date}`, dbdata[userID].auth)
        hazifeladatok = hazifeladatok.filter(item => Date.now() - Date.parse(item.KeszitesDatuma) < perc * 60 * 1000)

        let hianyzasok = await getApiData(`${commonEndpoints.absences}?datumTol=${date}`, dbdata[userID].auth)
        hianyzasok = hianyzasok.filter(item => Date.now() - Date.parse(item.KeszitesDatuma) < perc * 60 * 1000)

        let szamonkeresek = await getApiData(`${commonEndpoints.exams}?datumTol=${date}`, dbdata[userID].auth)
        szamonkeresek = szamonkeresek.filter(item => Date.now() - Date.parse(item.KeszitesDatuma) < perc * 60 * 1000)
        const user = await client.users.fetch(userID)

        for (const jegy of jegyek) user.send(jegyEmbed(jegy))
        for (const feljegyzes of feljegyzesek) user.send(feljegyzesEmbed(feljegyzes))
        for (const hazi of hazifeladatok) user.send(hazifeladatEmbed(hazi))
        for (const hianyzas of hianyzasok) user.send(hianyzasEmbed(hianyzas))
        for (const szamonkeres of szamonkeresek) user.send(szamonkeresEmbed(szamonkeres))
        
        client.logger.info(`Összesen ${jegyek.length+feljegyzesek.length+hazifeladatok.length+hianyzasok.length+szamonkeresek.length} értesítő kiküldve ${userID}-nek. `)
    })
    client.logger.info("KrétaNotify befejezve.")
}


function getcolor(jegy) {
    if (jegy == 5) return "#008E44"
    if (jegy == 4) return "#00D166"
    if (jegy == 3) return "#F8C300"
    if (jegy == 2) return "#F93A2F"
    if (jegy == 1) return "#A62019"
}

function jegyEmbed(jegy) {
    const embed = new Discord.MessageEmbed()
        .setTitle(jegy.Tantargy.Nev)
        .addField("Értékelés", jegy.SzovegesErtek)
        .addField('Súly', `${jegy.SulySzazalekErteke}%`);
    if (jegy.Tema) embed.addField('Téma', jegy.Tema);

    embed
        .addField("Értékelő tanár neve", jegy.ErtekeloTanarNeve)
        .addField("Dátum", jegy.KeszitesDatuma.split('T')[0]);

    if (jegy.SzamErtek) embed.setColor(getcolor(jegy.SzamErtek))
    return embed
}
function feljegyzesEmbed(feljegyzes) {
    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(feljegyzes.Cim)
        .addField("Tanár", feljegyzes.KeszitoTanarNeve)
        .addField("Dátum", feljegyzes.KeszitesDatuma.split('T')[0])
        .setDescription(feljegyzes.Tartalom)
    return embed
}
function hazifeladatEmbed(hazi) {
    let szoveg = hazi.Szoveg;
    szoveg = turndownService.turndown(szoveg)
    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(hazi.TantargyNeve)
        .addField("Határidő:", hazi.HataridoDatuma.split("T")[0])
        .addField("Tanár neve:", hazi.RogzitoTanarNeve)
        .addField("Tartalom:", szoveg);
    return embed
}
function hianyzasEmbed(hianyzas) {
    const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(hianyzas.Tipus.Leiras)
        .addField("Dátum:", hianyzas.KeszitesDatuma.split("T")[0])
        .addField("Tanár neve:", hianyzas.RogzitoTanarNeve)
        .addField("Tantárgy:", hianyzas.Tantargy.Nev);
    return embed
}
function szamonkeresEmbed(szamonkeres){
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(szamonkeres.TantargyNeve)
    .addField("Mód:", szamonkeres.Modja.Leiras)
    .addField("Téma:", szamonkeres.Temaja)
    .addField("Dátum:", szamonkeres.Datum.split("T")[0])
    .addField("Tanár neve:", szamonkeres.RogzitoTanarNeve)
    return embed
}