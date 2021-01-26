const Discord = require('discord.js');
const channel = require('../Config/channel.json')
const role = require('../Config/roles.json');
const options = require('../Config/data.json');
const db = require('../Server/mysql');
//-----------------------------------------------------
module.exports = async(client, message, args) => {
    var chn = client.channels.cache.get(channel.txtpoll);
    const createPollEmbed = new Discord.MessageEmbed()
    .setDescription(`Give A Brief Description About Your Poll`)
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter('This Message Will Be Timed-Out In 120 Sec')
    message.channel.send(createPollEmbed)        
    message.channel.awaitMessages(m => m.author.id == message.author.id,
        {max: 1, time: 120000}).then(collected => {
      const response = collected.first();
      if(!response) {message.channel.send(`**You Have Failed To Send The Message With In The Given Time..Use \`/suggest\` To Suggest Again**`).then(msg => {
        msg.delete({ timeout:60000 })
      }).catch(console.error);
    return;
    }
      var Poll = response.content
      message.channel.bulkDelete(2)
      const sugstPollEmbed = new Discord.MessageEmbed()
      .setTitle('**POLL**')
      .setColor('RANDOM')
      .setDescription(`**A New Poll Has Been Made**\n\n ➣ **__${Poll}__**\n\nNOTE: *You Can Either Agree Or To Disagree By Reacting To The Emoji Below*`)
      .setTimestamp()
      chn.send(`<@&${role.miner}>`).then(msg => {
        msg.delete({ timeout:2500 })
      }).catch(console.error);
      chn.send(sugstPollEmbed).then(tMessage =>{
        tMessage.react('✔️')
        tMessage.react('❌')
        tMessage.react('⭕')
    })
    })

}
