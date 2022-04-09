const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require("./settings.json");
const fs = require("fs");
const moment = require("moment");

client.log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.kretacommands = new Discord.Collection();

client.json = require('./loginDatas.json');

fs.readdir("./commands/", (err, files) => {
  client.log(`Összesen ${files.length} kréta-parancs betöltése.`);

  files.forEach(f => {
	  client.log(`Betöltve! ${f}`);
    let props = require(`./commands/${f}`);
    let commandName = f.split(".")[0];
    
    client.kretacommands.set(commandName, props);
  });
});

fs.readdir("./notkretaCommands/", (err, files) => {
  client.log(`Összesen ${files.length} nem kréta-parancs betöltése.`);

  files.forEach(f => {
	  client.log(`Betöltve! ${f}`);
    let props = require(`./notkretaCommands/${f}`);
    let commandName = f.split(".")[0];
    
    client.commands.set(commandName, props);
  });
});

fs.readdir("./events/", (err, files) => {
  client.log(`${files.length} esemény betöltése.`);

  files.forEach(f => {
    client.log(`Betöltve! ${f}`);
    let eventFunction = require(`./events/${f}`);
    let eventName = f.split(".")[0];
    client.on(eventName, (...arg) => eventFunction.run(client, ...arg));
  });
});



client.login(settings.token);