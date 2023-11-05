import React from "react";

// Inside your Card component
const Card = ({ id, flipped, handleClick, image, className }) => {
	return (
		<div
			className={`card ${flipped ? "flipped" : ""} ${className}`} // Apply the className here
			onClick={() => handleClick(id)}>
			<img src={image} alt='Card' />
		</div>
	);
};

export default Card;
