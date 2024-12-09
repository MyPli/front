import Card from '@/components/commons/Card';
import Title from '@/components/commons/Title';
import React from 'react';

const dummy = {
	link: '',
	imageUrl:
		'https://i.ytimg.com/vi/jVNyKwF5wL8/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDnsEqKhhEYiP2E0stj3lq9Zj1Qgg',
	title: '[KPOP Playlist] 짧은 케이팝 노동요',
};

const Home = async () => {
	return (
		<div className='w-[calc(100vw-110px)] h-[100dvh]'>
			<Title text='인기 플레이리스트' />
			<div className='w-full mt-[25px] grid grid-cols-3 pr-0'>
				{[dummy, dummy, dummy].map((item, i) => (
					<Card key={item.title + i} size='large' {...item} />
				))}
			</div>
			<div className='mt-20'>
				<Title text='오늘의 최신 플레이리스트' className='font-normal' />
				<div className='mt-[25px] grid grid-cols-7 w-[100%]'>
					{[dummy, dummy, dummy, dummy, dummy, dummy, dummy].map((item, i) => (
						<Card key={item.title + i} size='small' {...item} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
