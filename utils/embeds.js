const Discord = require("discord.js");
const { prefix } = require("../settings.json");

exports.notRegisteredEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("❌ Hiba! ❌")
  .setDescription(
    `Még nem regisztráltál. Használd a **${prefix}kreta register** parancsot!`
  );

exports.onlyDMEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle(
    "❌ Ezt a parancsot csak privát üzenetben tudom teljesíteni. ❌\n **Adatvédelmi okokból**"
  )
  .setDescription("Próbálj meg rámírni priviben 😘");

exports.dataDeletedEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("📝 Adattörlés - Sikerült! 🎉")
  .setDescription("Sikerült! Ne felejts el újra regisztrálni egyszer :D");
exports.noExamsEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("🎉 Számonkérések - Ezaz! 🎉")
  .setDescription("Nincs bejelentett számonkérésed 🎉");

exports.alreadyRegisteredEmbed = alredyRegisteredEmbed =
  new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("❌ Regisztráció - Hiba! ❌")
    .setDescription(
      "Már regisztráltál! Ha úgy gondolod hogy valami baj van a bottal, akkor próbáld a **kreta unregister** parancsot"
    );

exports.badRegisterUsageEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("❌ Regisztráció - Hibás használat! ❌")
  .setDescription(
    "Elvárt használat: **/kreta regisztralok [Iskola] [TanulóAzonosító] [Jelszó]**"
  );

exports.badDataEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("❌ Regisztráció - Hiba! ❌")
  .setDescription("Hibás adatok! Próbáld újra");
exports.registeredEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("📝 Regisztráció - Sikerült! 🎉")
  .setDescription("Sikerült! Mostmár eléred a bot többi részét");
exports.registerEmbed = registerEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("📝 Regisztráció 📝")
  .setDescription(
    "A regisztrációval elfogadod az Adatvédelmi nyilatkozatot: \n ```\nA Chalkbot egy kliensalkalmazás, segítségével az e-Kréta rendszeréből letöltheted és megjelenítheted az adataidat.\nIlyenkor adattovábbítás csak a Bot, a Discord és a Kréta-szerverek között történik, titkosított kapcsolaton keresztül.\nA Chalkbot fejlesztője és üzemeltetője a személyes adataidat semmilyen célból nem másolja és harmadik félnek nem továbbítja.\nEzeket így az eKRÉTA Informatikai Zrt. kezeli, az ő tájékoztatójukat ITT ->> https://tudasbazis.ekreta.hu/pages/viewpage.action?pageId=4065038 <<- találod:\nEzok törlésével vagy módosítával kapcsolatban keresd az osztályfőnöködet vagy az iskolád rendszergazdáját.\nA Chalkbot a bejelentkezési adatokat a szervergépen titkosítottan tárolja. Ha ezeket törölni szeretnéd, a /kreta unregister parancssal teheted meg.\nAz alkalmazás a szervergépen névtelen, alapszintű használati statisztikákat gyűjt.\nHa az adataiddal kapcsolatban bármilyen kérdésed van (törlés, módosítás, adathordozás), keress fel engem discordon: davidfegyver#8572 ```\n**Az alkalmazás használatával jelzed, hogy ezt a tájékoztatót tudomásul vetted.**\nUtolsó módosítás: 2021. 05. 14. \n Folytatod? Ha igen akkor írd be  **/kreta regisztralok [suli] [felhasznaloiAzonosito] [jelszo]** parancsot.\n Az iskolád azonosítóját a /kreta keres parancssal keresheted meg"
  );
exports.noSchoolEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("❌ Keresés - Hiba! ❌")
  .setDescription("Nem találtunk ilyen iskolát");
exports.badSearchUsageEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("❌ Keresés - Hiba! ❌")
  .setDescription("Add meg az iskolád nevét");

exports.noGradesEmbed = new Discord.MessageEmbed()
  .setColor("RED")
  .setTitle("❌ Jegyek - Hiba! ❌")
  .setDescription("Nem kaptál jegyeket az elmúlt 7 napban");
exports.noAbsencesEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("🎉 Hiányzások - Huh... 🎉")
  .setDescription("Nem hiányoztál egy óráról se az elmúlt egy héten");

exports.helpEmbed = new Discord.MessageEmbed()
  .setTitle("ℹ️ Segítség ℹ️")
  .addField(`**${prefix}kreta register**`, "📝 Beregisztrál a botba 📝")
  .addField(`**${prefix}kreta unregister**`, "🗝️ Törli az adataid 🗝️")
  .addField(
    `**${prefix}kreta jegyek**`,
    "🧪 Kiírja a legutóbbi héten kapott jegyed 🧪"
  )
  .addField(`**${prefix}kreta atlag**`, "✏️ Kiírja a tantárgyi átlagaid ✏️")
  .addField(
    `**${prefix}kreta orarend**`,
    "Kiírja az órarended (Telón ajánlott fektetett módban)"
  )
  .addField(`**${prefix}kreta hianyzasok**`, "Kiírja az mulasztásaid")
  .addField(
    `**${prefix}kreta feljegyzesek**`,
    "✏️ Kiírja a legutóbbi héten kapott feljegyzéseid (Max 10) ✏️"
  )
  .addField(`**${prefix}kreta hazifeladat**`, "📚 A házi feladataid a hétre 📚")
  .addField(`**${prefix}kreta keres**`, "📚 Megkeresi az iskoládat 📚")
  .addField(
    `**${prefix}kreta szamonkeresek**`,
    "📚 A bejelentett számonkéréseid 📚"
  )
  .addField(
    `**${prefix}kreta whoami**`,
    "❓ Kiírja az adataid amit a kréta tud rólad ❓"
  )
  .addField(`**${prefix}kreta notify**`, "Kréta értesítő rendszer");
exports.noHomeworks = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("🎉 Házi feladat - Ezaz! 🎉")
  .setDescription("Nem kaptál házi feladatot az elmúlt egy héten 🎉");

exports.noNotesEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("❌ Feljegyzések - Hiba! ❌")
  .setDescription("Nem kaptál feljegyzést az elmúlt 7 napban");
