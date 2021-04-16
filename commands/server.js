const discord = require('discord.js');
const options = require('../Config/data.json');
const server = require('../Config/server.json')
const roles = require('../Config/roles.json')
const channel = require('../Config/channel.json')
const util = require('minecraft-server-util');

//---------------------------------------------------------------------------------------------
module.exports = {
    name: "server",
    usage:"!server",
    description: "Enable Disable Sticky Notes",
    async execute (client, message, args) {
        require('../infoImage/image')(client)
        util.status(server[0][0].ip)
        .then((response) => {

            const serverEmbed = new discord.MessageEmbed()
            .setAuthor("KGO Network")
            .setDescription('   ▂▃▅▇█══.KGO NETWORK.══█▇▅▃▂     \n    ❃      Season 4 - Just Launched     ❃')
            .addField('**Players**', response.onlinePlayers+'/'+response.maxPlayers)
            .addField("**Version", '1.8x-1.16x')
            .setColor('RANDOM')
            .setFooter('Showing Data For KGO Network');
            message.channel.send(serverEmbed);
        })
        .catch((error) => {
            const serverError= new discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription('Error Fetching Server Info/Server Might Be Offline')
            message.channel.send(serverError).then(msg => {
                msg.delete({ timeout:2500 })
              }).catch(console.error);
        });
    }
}