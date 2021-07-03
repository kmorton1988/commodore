const https = require('https')

module.exports = {
  name: "torn",
  description: "Lookup Torn Stuff",
  execute(msg, args) {
    
    https.get('https://yata.yt/api/v1/travel/export/', (res) => {
      var data ='';  
      res.on('data', (chunk) => {
        data += chunk;
      })

      
      
      //console.log(`statusCode: ${res.statusCode}`);

      res.on('end', () => {
        var stocks = '';
        var item = '';
        var loc = '';
        var message='';
        data = JSON.parse(data);
        if (args.length > 0 ) {
          loc = args[0];
          stocks = data.stocks[args[0]].stocks;
          stocks.forEach (function (d) {
            message += `${d.name}: ${d.quantity}\n`
          })
        }
        if (args.length < 1) {
          console.log("no selection");
          msg.reply('Try again with format \`..torn [location] [item]\`');
        } else if (args.length == 2) {
          item = args[1];
          loc = args[0];
          console.log("both arguments given")
          item = item.split(" ").map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
          var i = stocks.find(i => i["name"] === item);
          msg.reply(`${i.name}: ${i.quantity}`); 
        } else if (args.length == 1) {
          loc = args[0];
          console.log("only one argument");
          msg.reply(`Stock Info For ${loc}:\n ${message}`) 
        } else {msg.reply("Too many arguments sent. Try again with format \`..torn [location] [item]\`")
      };
      }).on('error', error => {
        console.error(error);
      });
    
    
    });
  },
};
