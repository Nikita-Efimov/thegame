var socket = io();

var name = /*"Nikita";*/ prompt('Enter your name... (in eng pls)');

document.getElementById("name").innerHTML = name;

document.getElementById('footer').getElementsByTagName('a')[0].href = document.getElementById('footer').getElementsByTagName('a')[0].href + '?name=' + name;

socket.emit('get_name', document.getElementById("name").innerHTML);

socket.on('alert', (msg) => 
{	
	console.info(msg)
});

socket.on('set_players_names', (name1, name2) =>
{
	document.getElementById('player_1_name').innerHTML = name1;
	document.getElementById('player_2_name').innerHTML = name2;
});

socket.on('interface_add_room', (name, roomNum) =>
{
	var elem = document.createElement('div');
	elem.setAttribute('class', 'room');
	elem.setAttribute('onclick', 'connectToRoom(' + roomNum + ')');
	elem.innerHTML = name;
	document.getElementById('players_rooms').appendChild(elem);

	// very not optimal code!!!
	try {
		if (document.getElementsByClassName('room')[0].getAttribute('onclick')[14] != '0')
			document.getElementById('players_names').style.display = 'none';
		else 
			document.getElementById('players_names').style.display = 'block';
	} catch (e) {}
});

socket.on('clear_board', () =>
{
	clearArea();
});

socket.on('update_wld', (w, l, d) =>
{
	document.getElementById('counter_of_wins').innerHTML = w;
	document.getElementById('counter_of_draws').innerHTML = d;
	document.getElementById('counter_of_loses').innerHTML = l;
});

socket.on('interface_clear_rooms', () =>
{
	document.getElementById('players_rooms').innerHTML = "";
	clearArea();
});

socket.on('update_move', (player_num, pos) =>
{
	set(pos, player_num);
});

function connectToRoom(num)
{
	socket.emit('connect_room', num);
}

function makeMove(pos)
{
	socket.emit('make_move', pos);
}