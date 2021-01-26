const discord = require('discord.js');
const options = require('../Config/data.json');
const roles = require('../Config/roles.json')
const channel = require('../Config/channel.json')
//---------------------------------------------------------------------------------------------
module.exports = {
    name: "invite",
    usage:"!invite <user>",
    description: "Enable Disable Sticky Notes",
    async execute (client, message, args) {
        message.delete();
        if(!args[0]){
            require('../Invite/invite_One')(client, message)
        }else {
            let friend = message.mentions.members.first();
            if(!friend){
                message.channel.send('**That User Cannot Be Parsed,** **Either Wait For __Some Hour__ To Get The User Cached To The List Or The User Is No Longer Available On The Server**')
            }else{
            require('../Invite/invite_Others')(client, message,friend)
            }
        }
    }
}