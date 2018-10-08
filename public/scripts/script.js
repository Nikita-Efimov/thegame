var socket = io();

document.getElementById("name").innerHTML = "Nikita"; //prompt('Enter your name..');

socket.emit('get_name', document.getElementById("name").innerHTML );

socket.on('alert', (msg) => 
{	
	console.info(msg)
});

socket.on('interface_add_room', (name, roomNum) =>
{
	var elem = document.createElement('div');
	elem.setAttribute('class', 'room');
	elem.setAttribute('onclick', 'connectToRoom(' + roomNum + ')');
	elem.innerHTML = name;
	document.getElementById('players_rooms').appendChild(elem);
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
});

socket.on('update_move', (player_num, pos) =>
{
	set(pos, player_num);
});

function connectToRoom(num)
{
	console.log("Connect to: " + num);
	socket.emit('connect_room', num);
}

function makeMove(pos)
{
	socket.emit('make_move', pos);
}