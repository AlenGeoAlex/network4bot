const Discord = require('discord.js');
const channel = require('../Config/channel.json')
const role = require('../Config/roles.json');
const options = require('../Config/data.json');
const db = require('../Server/mysql');
//-----------------------------------------------------
module.exports = async(client, message) => {
    message.delete();
    const faq1Embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription("**Can You Specify Your Ingame Name Please**")
    message.channel.send(faq1Embed);
}