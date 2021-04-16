const Discord = require('discord.js');
const channel = require('../Config/channel.json')
const role = require('../Config/roles.json');
const options = require('../Config/data.json');
const db = require('../Server/mysql');
var inArray = require('in-array');
//-----------------------------------------------------
module.exports = async(client,message) => {
    const args = message.content.toUpperCase().trim().split(/ +/);
    if(inArray(args,'XD')){
        reactXD(message);
    }
    if(inArray(args,'LOL')||inArray(args,"LEL")||inArray(args,"LOOL")||inArray(args,"LEEL")){
        reactLOL(message)
    }
    if(inArray(args,"LMAO")){
        reactLMAO(message)
    }
    if(inArray(args,'NP')){
        reactNP(message)
    }
    if(inArray(args,'NOP')){
        reactNOP(message)
    }
    if(inArray(args,'YEP')){
        reactYEP(message)
    }
    if(inArray(args,"YES")){
        reactYES(message)
    }
    if(inArray(args,"WADU")){
        reactWADU(message)
    }
    if(inArray(args,"HI")){
        reactHey(message)
    }
    
    async function reactHey(message){
        message.react("🇭")
        message.react("🇪")
        message.react("🇾")

    }
    async function reactWADU(message){
        message.react("🇼")
        message.react("🇦")
        message.react("🇩")
        message.react("🇺")
    }
    async function reactXD(message){
        message.react("🇽")
        message.react("🇩")
    }
    async function reactLOL(message){
        message.react("🇱")
        message.react("🇴")
        message.react("🇮")        
    }
    async function reactLMAO(message){
        message.react("🇱")
        message.react("🇲")
        message.react("🇦")
        message.react("🇴")
    }
    async function reactNP(message){
        message.react("🇳")
        message.react("🇵")
    }
    async function reactNOP(message){
        message.react("🇳")
        message.react("🇴")
        message.react("🇵")
    }
    async function reactYEP(message){
        message.react("🇾")
        message.react("🇪")
        message.react("🇵")
    }    
    async function reactYEP(message){
        message.react("🇾")
        message.react("🇪")
        message.react("🇵")
    }       
    async function reactYES(message){
        message.react("🇾")
        message.react("🇪")
        message.react("🇸")
    }       
}