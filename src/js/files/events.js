import { deleteMoney, checkRemoveAddClass, noMoney, getRandom, addMoney } from './functions.js';
import { initStartData, writeCurrentBet, config, configGame, startGame } from './script.js';
// import { startGame, resetGame, stopAnimation, config_game, autoMode } from './aviator.js';
import { configSlot } from './slot.js';
import { startData } from './startData.js';

const preloader = document.querySelector('.preloader');

// Объявляем слушатель событий "клик"

document.addEventListener('click', (e) => {
	initStartData();

	let targetElement = e.target;

	const wrapper = document.querySelector('.wrapper');

	const money = +sessionStorage.getItem('money');
	const currentBet = +sessionStorage.getItem('current-bet');

	if (targetElement.closest('[data-btn="privacy"]')) {
		window.location.href = 'index.html';
	}

	if (targetElement.closest('.preloader__button')) {
		window.location.href = 'main.html';
	}

	if (targetElement.closest('[data-btn="game"]')) {
		wrapper.classList.add('_bet-screen');
		config.currentGame = 1;
	}

	if (targetElement.closest('[data-btn="game-home"]')) {
		wrapper.classList.remove('_game');
	}

	if (targetElement.closest('[data-btn="slot"]')) {
		wrapper.classList.add('_bet-screen');
		config.currentGame = 2;

	}

	if (targetElement.closest('[data-btn="slot-home"]')) {
		wrapper.classList.remove('_slot');
		if (configSlot.isAutMode) {
			clearInterval(configSlot.autospin);
			configSlot.isAutMode = false;

			document.querySelector('.controls-slot__button-box').classList.remove('_hold');
		}
	}

	if (targetElement.closest('[data-btn="bet"]')) {
		if (config.currentGame === 1) {
			wrapper.classList.add('_game');
		} else if (config.currentGame === 2) {
			wrapper.classList.add('_slot');
		}
		setTimeout(() => {
			wrapper.classList.remove('_bet-screen');
		}, 1000);
	}

	//========================================================================================================================================================
	// bet-box

	if (targetElement.closest('[data-btn="bet-down"]') && currentBet > startData.countBet) {
		sessionStorage.setItem('current-bet', currentBet - startData.countBet);
		writeCurrentBet()
	}

	if (targetElement.closest('[data-btn="bet-up"]') && money > currentBet + startData.countBet && currentBet < startData.maxBet) {
		sessionStorage.setItem('current-bet', currentBet + startData.countBet);
		writeCurrentBet();
	}

	if (targetElement.closest('[data-bet]')) {
		const bet = +targetElement.closest('[data-bet]').dataset.bet;
		sessionStorage.setItem('current-bet', bet);
		writeCurrentBet();
	}

	//========================================================================================================================================================
	// game
	if (targetElement.closest('.game') && configGame.state === 1 && !targetElement.closest('[data-btn="game-home"]')) {
		startGame();
	}

})
