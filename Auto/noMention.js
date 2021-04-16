const Discord = require('discord.js');
const channel = require('../Config/channel.json')
const role = require('../Config/roles.json');
const options = require('../Config/data.json');
const db = require('../Server/mysql');
var inArray = require('in-array');
//-----------------------------------------------------
module.exports = async(client,message) => {


    const args = message.content.trim().split(/ +/);
    for(i=0;i<args.length;i++){
        var user = getUserFromMention(args[i])
        chkUser(user)
    }

    function chkUser(user){
        if(!user) return;
        let target = message.guild.members.cache.get(user.id);
        if(!target) return;
        if(inArray(target._roles, role.nomention)){
            //if(!message.member.roles.cache.find(r => r.id === roles.admin) || !message.member.roles.cache.find(r => r.id === roles.superadmin) || !message.member.roles.cache.find(r => r.id === roles.official)|| !message.member.roles.cache.find(r => r.id === roles.mod) || !message.member.roles.cache.find(r => r.id === roles.canMention)){
            
            message.delete();
            require('./warn')(message)
            //}
        }
    }


    function getUserFromMention(mention) {
        if (!mention) return;
    
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
    
            return client.users.cache.get(mention);
        }
    }
}