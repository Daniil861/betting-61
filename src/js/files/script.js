import { deleteMoney, checkRemoveAddClass, noMoney, getRandom, addMoney } from './functions.js';
import { startData } from './startData.js';


export function initStartData() {

	if (sessionStorage.getItem('money')) {
		writeScore();
	} else {
		sessionStorage.setItem('money', startData.bank);
		writeScore();
	}

	if (!sessionStorage.getItem('current-bet')) {
		sessionStorage.setItem('current-bet', startData.countBet);
		writeCurrentBet();
	} else {
		writeCurrentBet();
	}

}

function writeScore() {
	if (document.querySelector(startData.nameScore)) {
		document.querySelectorAll(startData.nameScore).forEach(el => {
			el.textContent = sessionStorage.getItem('money');
		})
	}
}

export function writeCurrentBet() {
	const betItem = document.querySelectorAll(startData.nameBetScore);
	if (betItem.length) {
		betItem.forEach(item => {
			item.textContent = sessionStorage.getItem('current-bet');
		})
	}

}

initStartData();


//========================================================================================================================================================
//main

export const config = {
	currentGame: 2 // 1 - basket, 2 - slot
}

//========================================================================================================================================================
// game

// 1. Кликаем по экрану:
//		1.1 Если состояние игры в положении 1 - запускаем функцию начала игры
//	++		1.1.0 Снимаем деньги ставку
//	++		1.1.1 Переводим состояние игры в положение 2
//	++		1.1.2 Генерируем случайный результат. Может быть два значения.
//	++		1.1.3 Проверяем какой результат выпал:
//	++			- если менее 0,5 - проиграли
//	++					- запускаем анимацию мяча _lose
//	++			- если более 0,5 - выиграли
//	++					- запускаем анимацию мяча _win
//						- добавляем денег на счет - х2
//			1.1.4 Когда анимация завершится - переводим положение игры в положение 1 и можем играть заново

export const configGame = {
	state: 1, // 1 - not playing, 2 - playing
	ball: document.querySelector('.basket__ball')
}

export function startGame() {

	deleteMoney(+sessionStorage.getItem('current-bet'), '.score');

	configGame.state = 2;

	const randomNum = getRandom(1, 3);
	setTimeout(() => {
		checkResultGame(randomNum);
	}, 500);

	setTimeout(() => {
		resetGame();
	}, 2000);

}

function checkResultGame(num) {

	if (num === 1) { // lose
		configGame.ball.classList.add('_lose');
	} else if (num === 2) { // win
		configGame.ball.classList.add('_win');
		setTimeout(() => {
			winLogic();
		}, 1500);
	}
}

function winLogic() {
	const winScore = +sessionStorage.getItem('current-bet') * 2;
	addMoney(winScore, '.score', 1000, 2000);
}

function drawStartPosBall() {
	if (configGame.ball.classList.contains('_win')) configGame.ball.classList.remove('_win');
	else if (configGame.ball.classList.contains('_lose')) configGame.ball.classList.remove('_lose');
}

export function resetGame() {
	drawStartPosBall();
	configGame.state = 1;
}