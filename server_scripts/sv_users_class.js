module.exports = class Users 
{
	constructor()
	{
		this.users = [];
		this.sockets = [];
		this.ids = [];
		this.names = [];
		this.rooms = [];
		this.room_queue = [];
		this.w = [];
		this.l = [];
		this.d = [];
	}

	find_free_id()
	{
		var i = 1;
		for (; ; i++)
		{
			if (this.users[i] != 1)
				break;

			if (i >= (Number.MAX_VALUE - 10))
			{
				console.error("User id max id overflow");
				throw "User id max id overflow";
			}
		}

		return i;
	}

	rm(pos)
	{
		delete this.users[pos];
		delete this.sockets[pos];
		delete this.ids[pos];
		delete this.names[pos];
		delete this.rooms[pos];
		delete this.room_queue[pos];
		delete this.w[pos];
		delete this.l[pos];
		delete this.d[pos];
	}

	clear_room(num)
	{
		this.users.forEach( (item, i) =>
		{
			if (this.rooms[i] === num)
				this.rooms[i] = 0;
		});
	}

	update_wld(pos)
	{
		if (this.sockets[pos] !== undefined)
			this.sockets[pos].emit('update_wld', this.w[pos], this.l[pos], this.d[pos]);
	}

	update_rooms()
	{
		this.users.forEach( (item, i) =>
		{
			if (this.rooms[i] === 0)
			{
				if (this.sockets[i] !== undefined) 
				{
					this.sockets[i].emit('interface_clear_rooms');
					this.users.forEach( (item, j) => 
					{
						if (this.rooms[j] === 0 && this.names[j] !== undefined)
						{
							// console.log(this.names[j]);
							if (i == j)
								this.sockets[i].emit('interface_add_room', this.names[j] + ' (you)', j);
							else
								this.sockets[i].emit('interface_add_room', this.names[j], j);
						}
					});
				}
			}
		});
	}
}