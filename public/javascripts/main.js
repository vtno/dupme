
var socket

var piano = {

	initialize : function() {
		this.socketAction()
		this.pianoStartHandler()
	},
	socketAction : function () {
		socket.on('welcomeName', function (name) {
			$(".cover").text("Welcome "+name+". Let's wait for other clients to join...")

		})
		socket.on('gameStart',function () {
			socket.emit('throwName')
			$(".cover").hide()
			
		})

		socket.on('you', function (name) {
			$(".yourName").text("You: "+name)
			$(".yourPoint").text("Point: ")
			console.log(name)
		})
		socket.on('oppo', function (name) {
			$(".oppoName").text("Opponent: "+name)
			$(".oppoPoint").text("Point: ")
			console.log(name)
		})
		socket.on('timer',function (time) {
			$('.time').text(time)
		})

		/*socket.on('rand', function (name) {
			$(".randomText").text(name+" starts first.")
		})*/

		socket.on('youFirst', function (name) {
			$(".random").show()
			$(".randomText").text(name)
		
		})

		socket.on('oppoFirst', function (name) {
			$(".random").show()
			$(".randomText").text(name)
			console.log("oppoooooo")
		
		})
		
	},

	pianoStartHandler : function () {
		$('#start').click(function () {
			$(".random").hide()
		})
	}
}

var welcome = {

	initialize : function () {

	this.setUpHandler()

	},

	setUpHandler : function () {

		$('#join').click(function () {
			socket = io.connect('http://localhost:3000')	
			socket.emit('playerJoin',$("#name").val())
			$('#main-container').load('piano',function () {
			piano.initialize()
			})

		})
	}
}

welcome.initialize()