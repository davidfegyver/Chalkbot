const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require("./settings.json");
const fs = require("fs");

const { createLogger, format, transports } = require("winston");
const { combine, splat, timestamp, printf } = format;

const logger = createLogger({
  format: combine(
    splat(),
    timestamp(),
    printf(({ level, message, timestamp, ...metadata }) => {
      let msg = `[${timestamp}] [${level}]: ${message} `;
      if (Object.keys(metadata).length) msg += JSON.stringify(metadata);

      return msg;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "error.log",
      level: "error",
    }),
    new transports.File({ filename: "chalkbot.log" }),
  ],
});
client.logger = logger;

client.commands = new Discord.Collection();
client.kretacommands = new Discord.Collection();

client.json = require("./loginDatas.json");

logger.info("Chalkbot indul...");
fs.readdir("./commands/", (err, files) => {
  logger.info(`${files.length} Kréta-parancs betöltése...`);
  files.forEach((f) => {
    let props = require(`./commands/${f}`);
    let commandName = f.split(".")[0];

    client.kretacommands.set(commandName, props);
    logger.info(`${f} betöltve!`);
  });
});

fs.readdir("./notkretaCommands/", (err, files) => {
  logger.info(`${files.length} nem-Kréta parancs betöltése...`);

  files.forEach((f) => {
    let props = require(`./notkretaCommands/${f}`);
    let commandName = f.split(".")[0];

    client.commands.set(commandName, props);
    logger.info(`${f} betöltve!`);
  });
});

fs.readdir("./events/", (err, files) => {
  logger.info(`${files.length} esemény betöltése...`);

  files.forEach((f) => {
    let eventFunction = require(`./events/${f}`);
    let eventName = f.split(".")[0];
    client.on(eventName, (...arg) => eventFunction.run(client, ...arg));
    logger.info(`${f} betöltve!`);
  });
});

client.login(settings.token);
