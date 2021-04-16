const Discord = require('discord.js');
const channel = require('../Config/channel.json')
const role = require('../Config/roles.json');
const options = require('../Config/data.json');
const db = require('../Server/mysql');
//-----------------------------------------------------
module.exports = async(client, message) => {
    const outcastEmbed = new Discord.MessageEmbed()
    .setAuthor('KGO Network',"https://imgur.com/lI8yElX.png")
    .setColor('RANDOM')
    .setTitle('Ranks - Outcast')
    .setDescription('**__Requirements__**\n\n• **$20,000 Ingame Money**\n• **18 Votes**\n• **5 Hours Of Total Playtime On The Server**\n\n**__Rewards__**')
    .addField('**Commands**','• **/afk**\n• **/tpacancel**')
    .addField('**Home**','• **Can Set 2 Homes Using /home Command**')
    .addField('**Economy**','• **Rewards You With $2500 Ingame Money**')
    .addField('**Tag**','• **A Simple Outcast Tag On The Tablist**\n• **A Simple Outcast Tag On The Chatbar**')
    message.channel.send(outcastEmbed)
}