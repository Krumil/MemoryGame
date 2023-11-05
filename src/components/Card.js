import React from "react";

const Card = ({ id, flipped, handleClick, image }) => {
	const onClick = () => {
		if (!flipped) {
			handleClick(id);
		}
	};

	return (
		<div className={`card ${flipped ? "flipped" : ""}`} onClick={onClick}>
			<div className='card-front'>
				<img src={image} alt='Card front' />
			</div>
			<div className='card-back'></div>
		</div>
	);
};

export default Card;
