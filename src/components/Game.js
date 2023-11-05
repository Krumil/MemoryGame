import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Game.css";

const Game = () => {
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [isChecking, setIsChecking] = useState(false);

	// Function to shuffle and select images
	const shuffleImages = () => {
		const allImages = Array.from({ length: 11 }, (_, i) => `/images/image${i + 1}.png`);

		// Shuffle array and pick the first 10
		const shuffled = allImages.sort(() => 0.5 - Math.random());
		const selectedImages = shuffled.slice(0, 10);

		return selectedImages;
	};

	// Initialize or reset the game
	useEffect(() => {
		const initializeCards = () => {
			const selectedImages = shuffleImages();
			const initializedCards = selectedImages
				.concat(selectedImages) // You need two of each for a pair
				.sort(() => Math.random() - 0.5)
				.map((image, index) => ({ id: index, image, flipped: false, matched: false }));

			setCards(initializedCards);
			setTurns(0);
		};

		initializeCards();
	}, []);

	// Handle card flip
	const handleCardClick = id => {
		// If we are checking for matches, ignore any clicks
		if (isChecking || cards.some(card => card.id === id && card.flipped)) {
			return;
		}

		const newCards = cards.map(card => {
			if (card.id === id && !card.flipped) {
				return { ...card, flipped: true };
			}
			return card;
		});

		setCards(newCards);
		if (choiceOne === null) {
			setChoiceOne(id);
		} else {
			setChoiceTwo(id);
			setIsChecking(true); // Start checking for matches
		}
	};

	useEffect(() => {
		if (choiceOne !== null && choiceTwo !== null) {
			const cardOne = cards.find(card => card.id === choiceOne);
			const cardTwo = cards.find(card => card.id === choiceTwo);

			if (cardOne.image === cardTwo.image) {
				setCards(prevCards =>
					prevCards.map(card => {
						if (card.image === cardOne.image) {
							return { ...card, matched: true };
						}
						return card;
					})
				);
				resetTurn();
			} else {
				setTimeout(() => {
					const newCards = cards.map(card => {
						if (card.id === choiceOne || card.id === choiceTwo) {
							return { ...card, flipped: false };
						}
						return card;
					});
					setCards(newCards);
					resetTurn();
				}, 1000);
			}
		}
	}, [choiceOne, choiceTwo, cards, turns]);

	// Separate function to reset turns and choice states
	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns(prevTurns => prevTurns + 1);
		setIsChecking(false); // Re-enable clicking after checking
	};

	return (
		<div className='game'>
			<h1>Memory Game</h1>
			<div className='card-grid'>
				{cards.map(card => (
					<Card
						key={card.id}
						id={card.id}
						flipped={card.flipped || card.matched}
						handleClick={handleCardClick}
						image={card.matched || card.flipped ? card.image : "/images/card-back.png"} // Path to the image displayed on the back of the card
						className={card.matched ? "matched" : ""} // Add this line
					/>
				))}
			</div>
			<p>Turns: {turns}</p>
		</div>
	);
};

export default Game;
