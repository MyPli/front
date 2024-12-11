'use client';

import Image from 'next/image';
import { IoAddCircle } from 'react-icons/io5';
import { PlayList } from './Playlist';

interface IProps extends PlayList {
	onAdd: () => void;
}

const CreatePlaylist = ({ onAdd, ...props }: IProps) => {
	return (
		<div className='w-full h-20 flex items-center px-3 border-b border-gray relative max-w-[550px] bg-white'>
			<Image
				src={props.imageUrl}
				alt='album cover'
				width={60}
				height={50}
				className='rounded-lg w-[60px] h-[50px] object-cover'
			/>
			<div className='ml-4 flex-[1.5]'>
				<span className='block text-base font-semibold text-secondary'>
					{props.musicName}
				</span>
				<span className='block text-sm text-secondary mt-[2px]'>
					{props.artist}
				</span>
			</div>
			<span className='text-base text-secondary flex-1'>
				{props.time || '2:52:27'}
			</span>
			<button
				className='flex items-center gap-[7px] text-primary absolute right-3 px-2 py-2 rounded-xl'
				onClick={onAdd}
			>
				<IoAddCircle />
				<span>추가하기</span>
			</button>
		</div>
	);
};

export default CreatePlaylist;
