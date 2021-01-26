const discord = require('discord.js')
const Data = require('../Data/stickydata.json')
const editJsonFile = require("edit-json-file");
var now = require("performance-now")
//-------------------------------------------------------------------------
module.exports = async(client, message) => {

    let file = editJsonFile(`${Data}`, {
        autosave: true
    }); 
    var start = now()
    var needChkFlag = (Object.keys(file.get()).length)
    var end = now()
    if(needChkFlag <= 0){
        const emptyListEmbed = new discord.MessageEmbed()
        .setTitle('**Sticky List**')
        .setColor('RANDOM')
        .setDescription('The List Is Empty')
        .setTimestamp()
        message.channel.send(emptyListEmbed).then(msg => {
            msg.delete({ timeout:10000 })
          }).catch(console.error);
    }else{
        const ListEmbed = new discord.MessageEmbed()
        .setTitle('**Sticky List**')
        .setColor('RANDOM')
        .setDescription(`There Are ${needChkFlag} Notes Linked To DB`)
        .setFooter(`The DB Took ${(end-start).toFixed(3)} ms To Respond`)
        message.channel.send(ListEmbed).then(msg => {
            msg.delete({ timeout:10000 })
          }).catch(console.error);
    }


}