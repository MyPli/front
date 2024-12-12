import Image from 'next/image';

export interface PlayList {
	imageUrl: string;
	musicName: string;
	artist: string;
	time: string;
}

interface IProps extends PlayList {
	onDelete: () => void;
}

const Playlist = ({ onDelete, ...props }: IProps) => {
	return (
		<div className='w-full flex items-center max-w-[1190px] h-[92px] relative group hover:bg-[#ffffff10] cursor-pointer'>
			<div className='flex-[0.5]'>
				<Image
					src={props.imageUrl}
					alt='album cover'
					width={96}
					height={92}
					className='rounded-lg object-cover w-[96px] h-[92px]'
				/>
			</div>
			<span className='text-base text-white flex-[0.6]'>{props.musicName}</span>
			<span className='text-sm text-white flex-1'>{props.artist}</span>
			<div className='flex items-center justify-between flex-[0.4]'>
				<span className='text-base text-white'>{props.time}</span>
				<button
					className='px-[44px] opacity-0 group-hover:opacity-100 transition-opacity'
					onClick={onDelete}
				>
					<Image
						src='/delete.svg'
						alt='delete icon'
						width={20}
						height={20}
						className='w-5 h-5'
					/>
				</button>
			</div>
		</div>
	);
};

export default Playlist;
