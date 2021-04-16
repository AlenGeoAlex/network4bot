const Discord = require('discord.js');
const channel = require('../Config/channel.json')
const role = require('../Config/roles.json');
const options = require('../Config/data.json');
const db = require('../Server/mysql');
//-----------------------------------------------------
module.exports = async(message) => {
    const Embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username)
    .setTitle('WARNING')
    .setColor('#E74C3C')
    .setDescription('**The User/User\'s You Have Mentioned Has No-Mention Tag Enabled.**\n**Kindly Avoid Mentioning Them.**')
    .setFooter('Auto-Moderation')
    message.channel.send(Embed)
}