'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { IoPlaySharp } from 'react-icons/io5';

interface IProps {
	imageUrl: string;
	title: string;
	link: string;
	size?: 'large' | 'small';
}

const Card = ({ imageUrl, title, link, size = 'large' }: IProps) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link
			href={link}
			className={`flex flex-col cursor-pointer relative`}
			onMouseOver={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className={`relative ${size === 'small' ? 'w-full' : ''}`}>
				{isHovered && (
					<div className='w-full h-full bg-black absolute backdrop-blur-sm top-0 left-0 flex justify-center items-center opacity-70 z-50'>
						<IoPlaySharp size={87} />
					</div>
				)}
				<img
					src={imageUrl}
					alt={title}
					className={`rounded-2xl object-cover ${
						size === 'small' ? 'w-full h-full aspect-square' : ''
					}`}
				/>
			</div>
			<h4 className={`w-full text-[16px] line-clamp-1 mt-2`}>{title}</h4>
		</Link>
	);
};

export default Card;
