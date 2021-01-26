const discord = require('discord.js');
const options = require('../Config/data.json');
const roles = require('../Config/roles.json')
const channel = require('../Config/channel.json')
const util = require('minecraft-server-util');
const server = require('../Config/server.json');
const db = require('../Server/mysql');
var now = require("performance-now")

//---------------------------------------------------------------------------------------------
module.exports = {
    name: "suggest",
    usage:"!suggest",
    description: "Enable Disable Sticky Notes",
    async execute (client, message, args) {
        const sgchn = client.channels.cache.get(channel.txtsuggestion)
        message.delete();
        const whatsuggestion = new discord.MessageEmbed()
        .setDescription(`**Enter Your Suggestion..!**\n\n**NOTE:** *This suggestion will be posted on* <#${channel.txtsuggestion}>`)
        .setColor('RANDOM')
        .setTimestamp()
        message.channel.send(whatsuggestion)
        message.channel.awaitMessages(m => m.author.id == message.author.id,
            {max: 1, time: 120000}).then(collected => {
          const response = collected.first();
          if(!response) {message.channel.send(`**You Have Failed To Send The Message With In The Given Time..Use \`/suggest\` To Suggest Again**`).then(msg => {
            msg.delete({ timeout:60000 })
          }).catch(console.error);
        return;
        }
          var suggestion = response.content
          message.channel.bulkDelete(2)
          chkidno(async function(cb) {
            let id = cb+1;
            await insertdb(message.author.id, suggestion, id, message.author.username)
          const suggestionEmbed = new discord.MessageEmbed()
          .setTitle('Suggestion')
          .setColor('RANDOM')
          .setDescription(`**A New Suggestion Was Made By: ${message.author.username}**\n\n \`\`\`${suggestion}\`\`\``)
          .setFooter(`Suggestion ID: ${id}`)
          sgchn.send(suggestionEmbed)
        })
    })
    }
}

async function insertdb(userid, suggestion, dbid, username){
    db(`INSERT INTO suggestion (dbid, UserId, sgst, name) VALUES (${dbid}, ${userid},'${suggestion}', '${username}')`, function (err, result, fields) {
        if (err) throw err;
    console.log('\033[33mThe New Suggestion Was Added Into The Database With The Suggestion ID: \033[36m'+dbid+'\033[0m')
      })
}


async function chkidno(callback){
    var lngth;
    db("SELECT * FROM suggestion", function (err, result) {
        if (err) throw err;
        lngth = result.length;
        callback(lngth)
    })

}