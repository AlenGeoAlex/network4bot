const discord = require('discord.js')
const Data = require('../Data/stickydata.json')
const editJsonFile = require("edit-json-file");
var MsgId;
//-----------------------------------------------------
module.exports = async(client, message) => {
    let file = editJsonFile(`${Data}`, {
        autosave: true
    }); 
    
    var needChkFlag = (Object.keys(file.get()).length)
    if(needChkFlag <= 0) return;
        checkchm(message.channel.id, async function(cb){
            if(!cb) return
            const stickyEmbed = new discord.MessageEmbed()
            .setTitle(`**__Sticky Note__**`)
            .setColor('RANDOM')
            .setFooter('Read This Note Before Asking A Question Related To It')
            .setDescription(`**${file.get(message.channel.id)}**`)
            .setTimestamp()
            if(cb){
                if(!MsgId){
                    message.channel.send(stickyEmbed).then(sent =>{
                        MsgId = sent.id
                    })
                    return;
                }else{
                    message.channel.messages.fetch(MsgId).then(async msg => {
                        msg.delete()
                        await message.channel.send(stickyEmbed).then(sent1 =>{
                            MsgId = sent1.id
                        });
                    });
                    return;
                }
            }
        })

    async function checkchm(chnid, callback) {
        var chkflg = file.get(chnid);
        if (!chkflg){
            callback(false);
        }
        else{
            callback(true);
        }
    }



}