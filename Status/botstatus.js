const discord = require('discord.js');
//-----------------------------------------------------
const activities_list = [
    'Kerala Gamers Official',
    `Server Is Online`,
    `Join And Rise With kgo.world`,
    'kgo.world',
    'discord.kgo.world',
    'Season #4',
    'The Greatest Ever',
    `Survival`,
    `Mini-Games`,
    `Bedwars`,
    `Kit-PvP`,
    `home.kgo.world`
]; 
//-------------------------------------------------------
module.exports = async(client) => {
    var interval = setInterval (function () {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); 
        client.user.setActivity(activities_list[index]);
    }, 5 * 1000); 
}