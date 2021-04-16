const util = require('minecraft-server-util');
const server = require('../Config/server.json')
const channel  = require('../Config/channel.json')
//-----------------------------------------------------
module.exports = async(client) => {

    var interval = setInterval (function () {
        var status = pingNetwork().then(result=>{
            if(!result) return;
            else if(result){

                if(result[0] == true){
                    client.channels.cache.get(channel.vcnetwork).setName('🟢║ ɴᴇᴛᴡᴏʀᴋ');
                }else{
                    client.channels.cache.get(channel.vcnetwork).setName('🔴║ ɴᴇᴛᴡᴏʀᴋ');
                }
                
                if(result[1] == true){
                    client.channels.cache.get(channel.vcsurvival).setName('🟢║ ꜱᴜʀᴠɪᴠᴀʟ')
                }else{
                    client.channels.cache.get(channel.vcsurvival).setName('🔴║ ꜱᴜʀᴠɪᴠᴀʟ')
                }

                if(result[2] == true){
                    client.channels.cache.get(channel.vchub).setName('🟢║ ʜᴜʙ')
                }else{
                    client.channels.cache.get(channel.vchub).setName('🔴║ ʜᴜʙ')
                }

                if(result[3] == true){
                    client.channels.cache.get(channel.vcskyblock).setName('🟢║ ꜱᴋʏʙʟᴏᴄᴋ')
                }else{
                    client.channels.cache.get(channel.vcskyblock).setName('🔴║ ꜱᴋʏʙʟᴏᴄᴋ')
                }
                if(result[4] == true ){
                    client.channels.cache.get(channel.vckitpvp).setName('🟢║ ᴋɪᴛᴘᴠᴘ')
                }else{
                    client.channels.cache.get(channel.vckitpvp).setName('🔴║ ᴋɪᴛᴘᴠᴘ') 
                }
                if(result[5] == true ){
                    client.channels.cache.get(channel.vcbedwars).setName('🟢║ ʙᴇᴅᴡᴀʀꜱ')
                }else{
                    client.channels.cache.get(channel.vcbedwars).setName('🔴║ ʙᴇᴅᴡᴀʀꜱ') 
                }
            }
            

        }).catch((error) => {
            console.log(error)
        })
    },600 * 1000); 

}

async function pingNetwork(){
    console.log('\x1B[34mCalled For Pinging Servers')
    var i;
    var network = new Array();
    for(i=0; i<6; i++){
    data = JSON.parse(JSON.stringify(server[i][0]))
    await util.status(data.ip, { port:parseInt(data.port)}).then((response) => {
        network[i] = true
    }).catch((error) => {
        network[i] = false
    })
}
    console.log(`\x1b[36mPinging Of\x1b[35m ${i}\x1b[36m Servers Completed..!!`)
    return network;
}