import React from 'react';

interface TitleProps {
	text: string;
	className?: string;
}

const Title = ({ text, className }: TitleProps) => {
	return <h1 className={`text-3xl font-semibold ${className}`}>{text}</h1>;
};

export default Title;
