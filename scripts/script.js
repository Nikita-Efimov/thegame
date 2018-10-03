document.getElementById("name").innerHTML = "Nikita"; // prompt('Enter your name..');

function chgTdColor(td, BgColor, color) 
{
	td.style.backgroundColor = BgColor;
	td.style.color = color;
}

function set(pos, mark) 
{
	var a = document.getElementsByTagName("td");

	if(a[pos].innerHTML !== "" || pos < 0 || pos > 8) 
		return;


	chgTdColor(a[pos], '#333333', 'white');
	setTimeout(chgTdColor, 400, a[pos], '#EEEEEE', 'black');
		
	a[pos].innerHTML = mark == 1 ? 'X' : 'O';
}

function clearArea() 
{
	var a = document.getElementsByTagName("td");
	for(i = 0;i < 9;i++) 
	{
		area[i] = 0;
		a[i].innerHTML = '';
	}
}