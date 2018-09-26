var area = [];
for(i = 0;i < 9;i++)
	area.push(0);

//must be 'human','easy bot','medium bot'
var secondPlayer;

var strokeNum = 0;
var ostanovaDot = 0;

setMode(0);

function chgTdColor(td, BgColor, color) 
{
	td.style.backgroundColor = BgColor;
	td.style.color = color;
}

function setMode(modeNum) 
{
	switch (modeNum) 
	{
		case 0:
			secondPlayer = "human";
		break;
		case 1:
			secondPlayer = "easy bot";
		break;
		case 2:
			secondPlayer = "medium bot";
		break;
	}

	var a = document.getElementsByTagName("span");
	for(i = 0;i < 3;i++) 
	{
		if(i == modeNum) 
		{
			a[i].style.backgroundColor = "black";
			a[i].style.color = "white";
		}
		else 
		{
			a[i].style.backgroundColor = "white";
			a[i].style.color = "black";
		}
	}
}

function set(pos, mark) 
{
	if(area[pos] || ostanovaDot || pos < 0 || pos > 8) 
		return;

	var a = document.getElementsByTagName("td");

	if(secondPlayer == "human") 
	{
		if(strokeNum % 2 == 1) 
			mark = 2;

		chgTdColor(a[pos],'#333333','white');
		setTimeout(chgTdColor,600,a[pos],'#EEEEEE','black');
		
		a[pos].innerHTML = mark == 1 ? 'X' : 'O';

		area[pos] = mark;
		
		checkArea(2,"'O' win\nDo you wanna play new game?");
		checkArea(1,"'X' win\nDo you wanna play new game?");

		strokeNum++;
	}
	else 
	{
		if(mark == 1) 
		{
			chgTdColor(a[pos],'#333333','white');
			a[pos].innerHTML = 'X';
			setTimeout(chgTdColor,600,a[pos],'#EEEEEE','black');
		}

		if(mark == 2)
			a[pos].innerHTML = 'O';
		area[pos] = mark;
		
		if(mark == 2 && !ostanovaDot)
			checkArea(2,"You Lose!!");

		if(mark == 1 && !ostanovaDot) 
		{
			checkArea(1,"You Win!!\nCongratulations!!!");
			if(secondPlayer == "medium bot")
				mediumBotAction();
			if(secondPlayer == "easy bot")
				easyBotAction();
		}
	}
}

function clearArea() 
{
	var a = document.getElementsByTagName("td");
	for(i = 0;i < 9;i++) 
	{
		area[i] = 0;
		a[i].innerHTML = '';
	}
	ostanovaDot = 0;	
	strokeNum = 0;
}

function newGameMassage(massage) 
{
	if(ostanovaDot) return;
	ostanovaDot = 1;
	setTimeout(alert,400,massage);
	setTimeout(clearArea,440);
}

function checkArea(num, massage) 
{
	var timeout = 0;

	var a = document.getElementsByTagName("td");
	if(area[0] == num && area[1] == num && area[2] == num)
		newGameMassage(massage);

	if(area[3] == num && area[4] == num && area[5] == num)
		newGameMassage(massage);

	if(area[6] == num && area[7] == num && area[8] == num)
		newGameMassage(massage);

	if(area[0] == num && area[3] == num && area[6] == num)
		newGameMassage(massage);
	
	if(area[1] == num && area[4] == num && area[7] == num)
		newGameMassage(massage);
	
	if(area[2] == num && area[5] == num && area[8] == num)
		newGameMassage(massage);

	if(area[0] == num && area[4] == num && area[8] == num)
		newGameMassage(massage);

	if(area[2] == num && area[4] == num && area[6] == num)
		newGameMassage(massage);


	if(area[0] && area[1] && area[2] && area[3] && area[4] 
	&& area[5] && area[6] && area[7] && area[8])
		newGameMassage("Draw");
}