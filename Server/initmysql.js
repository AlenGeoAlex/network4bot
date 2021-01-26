const Discord = require('discord.js');
const db = require('../Server/mysql')
module.exports = async(client) => {
    console.log('\x1b[33mDB Is Intiazlizing\x1b[0m')
    await db('DELETE FROM channel', function(err, rows)   {
        if(err) return console.log(err)
    });
    await console.log(`\x1b[32mMySQL Database Intialized And Ready\x1b[0m`)
}