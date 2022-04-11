const Discord = require("discord.js");
const { StaticPool,isTimeoutError } = require("node-worker-threads-pool");

exports.run = async (client, message, args) => {
  if (!args.length) return message.channel.send("Adj meg egy műveletet!");
  let expression = args.join(" ");

  
  try {
    const result = await calculate(expression);
    const embed = new Discord.MessageEmbed()
      .setTitle("Matek Megoldás")
      .addField(`Feladat:`, expression, true)
      .addField(`Eredmény:`, result, true);
    message.channel.send(embed);
  } catch (e) {
    if(isTimeoutError(e)) return message.channel.send("Your crash attempt has been intercepted by Jinja's AntiSkid-system. Better luck next time!")
    return message.channel.send("Hiba történt a feldolgozás közben");
  }
};

function calculate(expression) {
  const pool = new StaticPool({
    size: 4,
    task: (expression) => {
      function blocked() {
        throw new Error();
      }
      const { create, all } = require("mathjs");
      const math = create(all);
      const limitedEvaluate = math.evaluate;

      math.import(
        {
          import: blocked,
          createUnit: blocked,
          evaluate: blocked,
          parse: blocked,
          simplify: blocked,
          derivative: blocked,
        },
        { override: true }
      );
      return limitedEvaluate(expression)
    },
  });
  return pool
    .createExecutor()
    .setTimeout(1000)
    .exec(expression)
    .then((result) => JSON.stringify(result._data || result));
}
