console.log("node server up");

var http = require('http');
class Game {
  constructor(title, status, hours) {
      this.title = title;
      this.status = status;
      this.hours = hours;
  }
}

var myGame = new Game("Minecraft2", "Have played", "42");
gameStore = JSON.stringify(myGame);

http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(gameStore);
}).listen(8080);

process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server has closed.');
    process.exit(0);
  });
});

