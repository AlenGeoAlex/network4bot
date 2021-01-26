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
    name: "poll",
    usage:"!poll",
    description: "Enable Disable Sticky Notes",
    async execute (client, message, args) {
        if(message.member.roles.cache.find(r => r.id === roles.admin) || message.member.roles.cache.find(r => r.id === roles.superadmin) || message.member.roles.cache.find(r => r.id === roles.official)){
        if(args[0] == '-s'){
            require('../Poll/suggestPoll')(client, message, args)          
        }else{
            require('../Poll/normalPoll')(client, message, args)
        }
    }

    }
}