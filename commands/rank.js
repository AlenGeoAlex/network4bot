const discord = require('discord.js');
const options = require('../Config/data.json');
const roles = require('../Config/roles.json')
const channel = require('../Config/channel.json')
//---------------------------------------------------------------------------------------------
module.exports = {
    name: "rank",
    usage:"!rank",
    description: "Enable Disable Sticky Notes",
    async execute (client, message, args) {
        message.delete();
        if(args.length == 0){
            const rankEmbed = new discord.MessageEmbed()
            .setTitle('RANKS')
            .setColor('RANDOM')
            .setThumbnail('https://imgur.com/imyCFoB.png')
            .setDescription('**Ranks Are Important For The Servers Because They Reward People For Investing Time Or Money In Your Server.**\n**We Too Have Multiple Ranks Which Allow Players To Grind Through Each Of It..**')
            .setFooter('Select A Rank From The List And Use !rank <name> To See More Of It')
            .addField('**Outcast**','**__Requirement__**\n\n• **$20,000 Ingame Money**\n• **18 Votes**\n• **5 Hours Of Total Playtime On The Server**')
            .addField('**Citizen**','**__Requirement__**\n\n• **$35,000 Ingame Money**\n• **24 Votes**\n• **15 Hours Of Total Playtime On The Server**')
            message.channel.send(rankEmbed).then(msg => { msg.delete({ timeout:120*1000 })
        }).catch(console.error);
        }
        else if(args.length == 1){
            switch (args[0].toUpperCase()){
                case 'OUTCAST':
                    require("../Ranks/outcast")(client, message)
                break;
                case 'CITIZEN':
                    require("../Ranks/citizen")(client, message)
                break;
                default:
            }
        }
    }
}