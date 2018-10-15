// Setup basic express server
var express = require('express');
var http = require("http");
var app = express();
var path = require('path');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 3000;



// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Setup
server.listen(port, () => 
{
	console.log('Server listening at port: %d', port);
});

var Users = require("./server_scripts/sv_users_class");
var users = new Users;

class Game
{
	constructor()
	{
		this.board = [];
		this.queue = this.percent_probality(50);
		this.player1_id;
		this.player2_id;
		this.timer = 0;
	}

	make_move(player_num, pos)
	{
		clearTimeout(this.timer);
		this.timer = setTimeout( () =>
		{
			this.clear(0);
		}, 30000);

		if (this.queue != player_num) return;
		if (this.board[pos] !== undefined) return;

		this.board[pos] = player_num;
		this.queue = !this.queue;

		users.sockets[this.player1_id].emit('update_move', player_num, pos);
		users.sockets[this.player2_id].emit('update_move', player_num, pos);

		var check = this.check();

		switch (check)
		{		
				// player 1 win
			case 0:
				users.w[this.player1_id]++;
				users.l[this.player2_id]++;
			break;
				// player 2 win
			case 1:
				users.w[this.player2_id]++;
				users.l[this.player1_id]++;
			break;
				// draw
			case 2:
				users.d[this.player1_id]++;
				users.d[this.player2_id]++;
			break;
		}

		if (check === 0 || check === 1 || check === 2)
		{
			this.clear();
			users.update_wld(this.player1_id);
			users.update_wld(this.player2_id);
		}

		return check;
	}

	clear(isqueue = 1)
	{
		for (var i = 0; i < 9; i++)
			delete this.board[i];

		if (isqueue)
			this.queue = this.percent_probality(50);

		setTimeout(() =>
		{
			if (users.users[this.player1_id] === undefined || users.users[this.player2_id] === undefined) return;
			users.sockets[this.player1_id].emit('clear_board');
			users.sockets[this.player2_id].emit('clear_board');
		}, 1700);
	}

	check()
	{
		if (this.is_win(users.room_queue[this.player1_id])) return 0;
		if (this.is_win(users.room_queue[this.player2_id])) return 1;
		if (this.is_draw()) return 2;
		return -1;
	}

	is_win(player_num)
	{
		if (this.board[0] == player_num && this.board[1] == player_num && this.board[2] == player_num) return true;	
		if (this.board[3] == player_num && this.board[4] == player_num && this.board[5] == player_num) return true;	
		if (this.board[6] == player_num && this.board[7] == player_num && this.board[8] == player_num) return true;	

		if (this.board[0] == player_num && this.board[3] == player_num && this.board[6] == player_num) return true;
		if (this.board[1] == player_num && this.board[4] == player_num && this.board[7] == player_num) return true;
		if (this.board[2] == player_num && this.board[5] == player_num && this.board[8] == player_num) return true;

		if (this.board[0] == player_num && this.board[4] == player_num && this.board[8] == player_num) return true;
		if (this.board[6] == player_num && this.board[4] == player_num && this.board[2] == player_num) return true;

		return false;
	}

	is_draw()
	{
		for (var i = 0; i < 9; i++)
			if (this.board[i] === undefined)
				return false;
		return true;
	}

	is_clear()
	{
		for (var i = 0; i < 9; i++)
			if (this.board[i] !== undefined)
				return false;
		return true;
	}

	get_random_int(min, max)
	{
		return Math.floor((Math.random()) * (max - min + 1)) + min;
	}

	percent_probality(percent)
	{
		var a = this.get_random_int(0, 100);
	    
	    if (a < percent)
	        return 1;
	    else
	        return 0;
	}
}

var games = [];

io.on('connection', (socket) => 
{
	var user_id = users.find_free_id();

	users.users[user_id] = 1;
	users.sockets[user_id] = socket;
	users.rooms[user_id] = 0;
	users.w[user_id] = 0;
	users.l[user_id] = 0;
	users.d[user_id] = 0;
	
	console.log("[" + user_id + "]->" + "connected");

	users.update_rooms();

	socket.on('get_name', (name) => 
	{
		users.names[user_id] = name;
		users.update_rooms();
	});

	socket.on('make_move', (pos) =>
	{
		if (users.rooms[user_id] === 0)
			return;

		// console.log("[" + user_id + "]->"  + "make move: " + pos);
		var check = games[users.rooms[user_id]].make_move(users.room_queue[user_id], pos);
	});

	socket.on('connect_room', (room_num) =>
	{
		// чтобы юзер не мог зайти в свою руму
		if (room_num === user_id) return;

		// console.log("[" + user_id + "]->" + "switched to room: " + room_num);

		if (room_num === 0 && games[users.rooms[user_id]].is_clear())
		{
			users.clear_room(users.rooms[user_id]);
			delete games[users.rooms[user_id]];
		}
		
		if (room_num !== 0)
		{
			users.rooms[user_id] = room_num;

			if (user_id !== room_num)
			{
				games[room_num] = new Game;

				games[room_num].player1_id = user_id;
				games[room_num].player2_id = room_num;

				// отправка имен юзеров юзерам!
				users.sockets[user_id].emit('set_players_names', users.names[user_id], users.names[room_num]);
				users.sockets[room_num].emit('set_players_names', users.names[room_num], users.names[user_id]);

				users.rooms[room_num] = room_num;
				users.sockets[room_num].emit('interface_clear_rooms');
				users.sockets[room_num].emit('interface_add_room', 'Exit', 0);

				users.room_queue[room_num] = user_id < room_num;
			}

			socket.emit('interface_clear_rooms');
			socket.emit('interface_add_room', 'Exit', 0);

			users.room_queue[user_id] = room_num < user_id;
		}

		users.update_rooms();
	});

	socket.on('disconnect', () => 
	{
		console.log("[" + user_id + "]->" + "disconnected");

		if (users.rooms[user_id] !== 0)
		{
			users.clear_room(users.rooms[user_id]);
		}

		users.rm(user_id);
		users.update_rooms();
	});
});
