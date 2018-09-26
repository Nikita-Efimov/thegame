var randSeed;

getSeed();

function mediumBotAction() {
	var pos = botThinking();
	
	//если есть куда поставить путем лог. раздумий
	if(pos != -1) {
		set(pos,2);
		return;
	}

	//выбираем не занятую точку на рандом
	while(1 && !ostanovaDot) {
		pos = getRandomInt(0,8);
		if(!area[pos])
			break;
	}

	set(pos,2);
}

function easyBotAction() {
	//выбираем не занятую точку на рандом
	while(!ostanovaDot) {
		pos = getRandomInt(0,8);
		if(!area[pos])
			break;
	}

	set(pos,2);
}

function botThinking() {
	var me = 2;
	var player = 1;
	var pos = -1;

	pos = botThinkingCheckPos(pos,0,1,2,me);
	pos = botThinkingCheckPos(pos,3,4,5,me);
	pos = botThinkingCheckPos(pos,6,7,8,me);

	pos = botThinkingCheckPos(pos,0,3,6,me);
	pos = botThinkingCheckPos(pos,1,4,7,me);
	pos = botThinkingCheckPos(pos,2,5,8,me);

	pos = botThinkingCheckPos(pos,0,4,8,me);
	pos = botThinkingCheckPos(pos,6,4,2,me);

	if(pos != -1)
		return pos;

	pos = botThinkingCheckPos(pos,0,1,2,player);
	pos = botThinkingCheckPos(pos,3,4,5,player);
	pos = botThinkingCheckPos(pos,6,7,8,player);

	pos = botThinkingCheckPos(pos,0,3,6,player);
	pos = botThinkingCheckPos(pos,1,4,7,player);
	pos = botThinkingCheckPos(pos,2,5,8,player);

	pos = botThinkingCheckPos(pos,0,4,8,player);
	pos = botThinkingCheckPos(pos,6,4,2,player);

	return pos;
}

function botThinkingCheckPos(lastPos,pos1,pos2,pos3,mark) {
	if(area[pos1] == mark && area[pos2] == mark && !area[pos3])
		return pos3;
	if(area[pos1] == mark && area[pos3] == mark && !area[pos2])
		return pos2;
	if(area[pos2] == mark && area[pos3] == mark && !area[pos1])
		return pos1;
	return lastPos;
}

function setSeed(num) {
	randSeed = num;
	localStorage.setItem('randSeed', num);
	alert(num);
}

function getSeed() {
	randSeed = localStorage.getItem('randSeed');
	if (!randSeed) 
		randSeed = 0;
	return randSeed;
}

function getRandomInt(min, max) {
	return Math.floor((Math.random()) * (max - min + 1)) + min;
}