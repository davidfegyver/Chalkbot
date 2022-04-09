const getApiData = require("../utils/getApiData");
const commonEndpoints = require("../utils/commonEndpoints");
const { notRegisteredEmbed } = require("../utils/embeds");

const table = require("table");
exports.run = async (client, message, args) => {
  const datas = client.json[message.author.id]
    ? client.json[message.author.id].auth
    : undefined;

  if (!datas) return message.channel.send(notRegisteredEmbed);

  const curr = new Date();
  const first = curr.getDate() - curr.getDay();
  const firstday = new Date(curr.setDate(first)).toISOString().split("T")[0];
  const lastday = new Date(curr.setDate(curr.getDate() + 6))
    .toISOString()
    .split("T")[0];

  const data = await getApiData(
    `${commonEndpoints.timetable}?datumTol=${firstday}&datumIg=${lastday}`,
    datas
  );
  let timetable = new Array(10);
  for (let i = 0; i < timetable.length; i++) {
    timetable[i] = new Array(6);
    timetable[i][0] = i;
  }
  timetable[0][1] = "Hétfő";
  timetable[0][2] = "Kedd";
  timetable[0][3] = "Szerda";
  timetable[0][4] = "Csütörtök";
  timetable[0][5] = "Péntek";

  let lastoraszam = 1;
  let napszam = 1;
  console.log(data);
  /*
    for (let i = 0; i < data.length; i++) {
        let oraszam = data[i].Oraszam;
        let nev = data[i].Nev;


        if (data[i].Tipus.Uid.split(',')[0] == '5') {
            napszam += 1;
            timetable[1][napszam] = "Szabadnap";
            lastoraszam = 1;

            continue
        }

        if (!oraszam || oraszam <= 0) continue;

        if (oraszam < lastoraszam) napszam += 1
        lastoraszam = oraszam;
        timetable[oraszam][napszam] = nev
    }


    const szoveg = table.table(timetable);
    message.channel.send("```\n" + szoveg + "\n```").catch(err => {

        message.channel.send("```\n" + szoveg.split('\n').slice(0, 10).join('\n') + "\n```")
        message.channel.send("```\n" + szoveg.split('\n').slice(10, 21).join('\n') + "\n```")
    });*/
};
