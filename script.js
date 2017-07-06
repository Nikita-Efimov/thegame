var area = [];
for(i = 0;i < 9;i++)
	area.push(0);

var ostanovaDot = 0;

function chgTdColor(td,BgColor,color) {
	td.style.backgroundColor = BgColor;
	td.style.color = color;
}

function set(pos,mark) {
	if(area[pos] || ostanovaDot) 
		return;

	var a = document.getElementsByTagName("td");
	if(mark == 1) {
		chgTdColor(a[pos],'#333333','white');
		a[pos].innerHTML = 'X';
		setTimeout(chgTdColor,600,a[pos],'#EEEEEE','black');
	}
	if(mark == 2)
		a[pos].innerHTML = 'O';
	area[pos] = mark;
		
	if(mark == 2 && !ostanovaDot)
		checkArea(playerLose,2);

	if(mark == 1 && !ostanovaDot) {
		checkArea(playerWin,1);
		botAction();
	}
}

function botAction() {
	var pos;
	while(1 && !ostanovaDot) {
		pos = getRandomInt(0,8);
		if(!area[pos])
			break;
	}
	set(pos,2);
}

function clearArea() {
	var a = document.getElementsByTagName("td");
	for(i = 0;i < 9;i++) {
		area[i] = 0;
		a[i].innerHTML = '';
	}
	ostanovaDot = 0;
}

function playerWin() {
	if(ostanovaDot) return;
	ostanovaDot = 1;
	setTimeout(alert,400,"You Win!!\nCongratulations!!!");
	setTimeout(clearArea,440);	
}

function playerLose() {
	if(ostanovaDot) return;
	ostanovaDot = 1;
	setTimeout(alert,400,"You Lose!!");
	setTimeout(clearArea,440);
}

function playerDraw() {
	if(ostanovaDot) return;
	ostanovaDot = 1;
	setTimeout(alert,400,"Draw");
	setTimeout(clearArea,440);
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkArea(action,num) {
	var timeout = 0;

	var a = document.getElementsByTagName("td");
	if(area[0] == num && area[1] == num && area[2] == num) {
		action();
	}
	if(area[3] == num && area[4] == num && area[5] == num) {
		action();
	}
	if(area[6] == num && area[7] == num && area[8] == num) {
		action();
	}
	if(area[0] == num && area[3] == num && area[6] == num) {
		action();
	}
	if(area[1] == num && area[4] == num && area[7] == num) {
		action();
	}
	if(area[2] == num && area[5] == num && area[8] == num) {
		action();
	}
	if(area[0] == num && area[4] == num && area[8] == num) {
		action();
	}
	if(area[2] == num && area[4] == num && area[6] == num) {
		action();
	}

	if(area[0] && area[1] && area[2] && area[3] && area[4] 
	&& area[5] && area[6] && area[7] && area[8])
		playerDraw();
}