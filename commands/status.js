const discord = require('discord.js');
const options = require('../Config/data.json');
const roles = require('../Config/roles.json')
const channel = require('../Config/channel.json')
const util = require('minecraft-server-util');
const server = require('../Config/server.json')
var now = require("performance-now")
var start;
var end;
//---------------------------------------------------------------------------------------------
module.exports = {
    name: "status",
    usage:"!status",
    description: "Enable Disable Sticky Notes",
    async execute (client, message, args) {
        message.delete();
        if(message.channel.id != channel.txtserverstatus) {
            const restrictionEmbed = new discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`**__This Command Is Channel Restricted__**\n\n**You Can Execute This Command Only On** <#${channel.txtserverstatus}>`)
            message.channel.send(restrictionEmbed).then(msg => {
                msg.delete({ timeout:10000 })
              }).catch(console.error);
            return;
        }
        start = now()
        pingPlayer().then(result=>{
            if(!result) return;
            var count=0;
            for(var j=0; j<result.length;j++){
                if(result[j] == 'Online'){
                    count++;
                }
            }
            end = now()
            const statusEmbed = new discord.MessageEmbed()
            .setTitle('**__Network Status__**')
            .setColor('RANDOM')
            .setThumbnail('https://imgur.com/lI8yElX.png')
            .setDescription(`**${count} Of ${result.length} Servers Are Online**`)
            .addFields(
                {name: `${server[0][0].name}`, value: result[0], inline: false},
                {name: `${server[1][0].name}`, value: result[1], inline: false},
                {name: `${server[2][0].name}`, value: result[2], inline: false},
                {name: `${server[3][0].name}`, value: result[3], inline: false},
                {name: `${server[4][0].name}`, value: result[4], inline: false},
                {name: `${server[5][0].name}`, value: result[5], inline: false},
            )
            .setTimestamp()
            .setFooter(`All Servers Suncessfully Pinged In ${(end-start).toFixed(3)} ms`)
            message.channel.send(statusEmbed)          
        })
    }
}
async function pingPlayer(){

    var i;
    var network = new Array();

    for(i=0; i<5; i++){
    data = JSON.parse(JSON.stringify(server[i][0]))
    await util.status(data.ip, { port:parseInt(data.port)}).then((response) => {
        network[i] = 'Online'  
    }).catch((error) => {
        network[i] = 'Offline'
    })
}

    return network;
}