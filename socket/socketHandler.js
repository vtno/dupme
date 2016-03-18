var stopwatch = require('timer-stopwatch')
var doOneTime = 0
function Player(socket,name){

	this.socket = socket
	this.name = name
}

function getTimer(players) {
  var timer = new stopwatch(10000,{refreshRateMS: 50})
  // timer
  timer.on('time', function(time) {
  	console.log(time)
    for(var player of players)player.socket.emit('timer',Math.round(time.ms/1000))
  })
  timer.on('done',function(){
    if(doOneTime%2==0){ // due to the npm stopwatch sucks and bug calling done twice so i need to hack it.
    }
    timer.reset()
    timer.start()
    doOneTime++
  });
  return timer
}

function socketHandler(io) {

var count = 0
var firstPlayer
var newPlayer



var players = [] 

	  io.on('connection', function (socket) {

	  	socket.on('playerJoin', function (name) {

	  		newPlayer = new Player(socket,name)
	  		players.push(newPlayer)
			count++
			socket.emit('welcomeName',newPlayer.name)

			if(count==2) {
				io.emit('gameStart')
				console.log("count = "+count)
				firstPlayer=players[Math.floor(Math.random()*players.length)]
			
	  			console.log("random "+firstPlayer.name)
	  			//io.emit('rand', firstPlayer.name)
	  			//io.emit('rand',firstPlayer.name)
	  			for(var i=0;i<players.length;i++){
	  				if(players[i].socket==firstPlayer.socket){
						players[i].socket.emit('youFirst',"you start first")
					}else{
						console.log("else")
						players[i].socket.emit('oppoFirst',"your opponent starts first")
					}
					console.log("i: "+i)
	  			}
	  			var timer = getTimer(players)
	  			timer.start()
			}

			


	  	})


	  	socket.on('throwName', function () {

	  		for(var i=0 ; i<players.length ; i++){

	  			if(socket.id == players[i].socket.id){

	  				socket.emit('you',players[i].name)

	  			}else{
	  				socket.emit('oppo', players[i].name)
	  			}
	  		}

	  		

	  		

	  	})

	  	/*socket.on('randomPlayer', function (argument) {
	  		rand=players[Math.floor(Math.random()*players.length)].name
	  		console.log("random "+rand)
	  		io.emit('random',rand)
	  	})*/

	  })


}
module.exports = socketHandler
