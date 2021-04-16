const Discord = require('discord.js');
const channel = require('../Config/channel.json')
const role = require('../Config/roles.json');
const options = require('../Config/data.json');
const db = require('../Server/mysql');
//-----------------------------------------------------
module.exports = async(client, message) => {
    message.delete();
    const faq4Embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription("**Currently PExPC Cross Platform Is Not Supported Due To Some Bugs In The Software..Soon A Dedicated PE Server Will Be Launch Under KGO Network.Until Then You Can't Connect To kgo.world**")
    message.channel.send(faq1Embed);
}