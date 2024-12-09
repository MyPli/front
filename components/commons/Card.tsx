import Link from 'next/link';
import React from 'react';

interface IProps {
	imageUrl: string;
	title: string;
	link: string;
	size?: 'large' | 'small';
}

const Card = ({ imageUrl, title, link, size = 'large' }: IProps) => {
	return (
		<Link
			href={link}
			className={`${
				size === 'large' ? 'w-[450px]' : 'w-[180px]'
			} flex flex-col cursor-pointer`}
		>
			<img
				src={imageUrl}
				alt={title}
				className={`${
					size === 'large' ? 'w-[450px] h-[225px]' : 'w-[180px] h-[180px]'
				} rounded-2xl object-cover`}
			/>
			<h4 className={`w-full text-[16px] line-clamp-1 mt-2`}>{title}</h4>
		</Link>
	);
};

export default Card;
