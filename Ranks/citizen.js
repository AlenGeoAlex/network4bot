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
    .setTitle('Ranks - Citizen')
    .setDescription('**__Requirements__**\n\n• **$20,000 Ingame Money**\n• **18 Votes**\n• **5 Hours Of Total Playtime On The Server**\n\n**__Rewards__**\n• **All Commands And Permissions Outcast Have**')
    .addField('**Commands**','• **/balancetop**')
    .addField('**Clan**','• **Will Have The Permission To Join A Clan**\n**__NOTE:This Does Not Allow One To Create A New Clan__**')
    .addField('**Shop**',"**Gets Access To Shop Of Enchantment**")
    .addField('**Economy**','• **Rewards You With $5000 Ingame Money**')
    .addField('**Tag**','• **A Simple Citizen Tag On The Tablist**\n• **A Simple Citizen Tag On The Chatbar**')
    message.channel.send(outcastEmbed)
}