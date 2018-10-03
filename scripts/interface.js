function addRoom(name, roomNum)
{
	var elem = document.createElement('div');
	elem.setAttribute('class', 'room');
	elem.setAttribute('onclick', 'connectToRoom(' + roomNum + ')');
	elem.innerHTML = name;
	document.getElementById('players_rooms').appendChild(elem);
}

function clearRooms()
{
	document.getElementById('players_rooms').innerHTML = "";
}

function connectToRoom(num)
{
	console.log("Connect to: " + num);
}

