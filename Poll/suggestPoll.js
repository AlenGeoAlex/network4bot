const Discord = require('discord.js');
const channel = require('../Config/channel.json')
const role = require('../Config/roles.json');
const options = require('../Config/data.json');
const db = require('../Server/mysql');
var now = require("performance-now")
//-----------------------------------------------------
module.exports = async(client, message, args) => {
    message.delete();
    var chn = client.channels.cache.get(channel.txtpoll);
    chkforid(args, async function(ms, sugst, username){
        if(!sugst || !username){
            const iderror = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Error In Id")
            .setDescription(`The ID Provided \`${args[1]}\` Is Invalid. \nYou Can Find The ID Of A Suggestion At The Footer Of The Suggestion Embed`)
            .setTimestamp()
            message.channel.send(iderror).then(msg => {
                msg.delete({ timeout:6000 })
              }).catch(console.error);
            return;
        }else{
            CreatePoll(client, sugst, username, chn, ms, message)
        }
    })
}

async function chkforid(args, callback){
    var start = now()
    db(`SELECT * FROM suggestion WHERE dbid = ${args[1]}`, function (err, result) {
        if (err) throw err;
    var end = now()
        if(result.length <=0){
            callback((end-start).toFixed(3), null, null)
        }else{
            callback((end-start).toFixed(3), result[0].sgst, result[0].name)
        }
    })
}

async function CreatePoll(client, suggest, name, channel, ms, message){
    channel.send(`<@&${role.miner}>`).then(msg => {
        msg.delete({ timeout:2500 })
      }).catch(console.error);
    const sugstPollEmbed = new Discord.MessageEmbed()
    .setTitle('**POLL**')
    .setColor('RANDOM')
    .setDescription(`The Suggestion Was To:\n\n ➣ **__${suggest}__**\n\nNOTE: *You Can Either Agree Or To Disagree By Reacting To The Emoji Below*`)
    .setFooter(`This Poll Was Called On For A Suggestion Suggested By ${name}`)
    channel.send(sugstPollEmbed).then(tMessage =>{
        tMessage.react('✔️')
        tMessage.react('❌')
        tMessage.react('⭕')
    })
    const DBTime = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`**DB Fetch Sucessfull In ${ms}ms**`)
    .setTimestamp()
    message.channel.send(DBTime).then(msg => {
        msg.delete({ timeout:5000 })
      }).catch(console.error);
}