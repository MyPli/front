/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Video } from '@/models/playlist.model';
import { useControlPlayingStore } from "@/store/playStore";
import Image from 'next/image';
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

const SoundPlayer = () => {
  const {
    currentPlaylist,
    currentVideoIndex,
    next,
    prev,
    playStatus,
    setPlayStatus,
  } = useControlPlayingStore();

  const [player, setPlayer] = useState<any>(null);
  const [currentSong, setCurrentSong] = useState<Video>();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    setCurrentSong(currentPlaylist[currentVideoIndex]);
    setCurrentTime(0);
    if (player) {
      player.seekTo(0);
    }
  }, [currentVideoIndex]);

  useEffect(() => {
    if (!player) return;

    if (playStatus === "play") {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
  }, [playStatus]);
  
  const handleVolumeChange = (newVolume: number) => {
    if (!player) return;

    setVolume(newVolume);
    player.setVolume(newVolume);
  };

  const getYoutubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYoutubeVideoId(currentPlaylist[currentVideoIndex].url);

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
    },
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const onReady = (event: any) => {
    setPlayer(event.target);
    setDuration(event.target.getDuration());
  };

  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      setCurrentTime(player.getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [player]);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-zinc-900 border-t border-zinc-800 z-[5]">
      {currentPlaylist[currentVideoIndex].title ? (
        <div className="flex items-center justify-center gap-4 bg-pink w-screen-xl h-full mx-20">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-[60px] h-[60px] rounded-lg overflow-hidden">
                {currentSong?.thumbnailUrl ? (
                  <Image
                    src={currentSong?.thumbnailUrl as string}
                    alt="thumbnail"
                    width={60}
                    height={60}
                    className="object-cover w-[60px] h-[60px]"
                  />
                ) : (
                  <Image
                    src={'/logo-gray.png'}
                    alt="thumbnail"
                    width={60}
                    height={60}
                    className="object-cover w-[60px] h-[60px]"
                  />
                )}
              </div>
              <div className="text-white">
                <div className="w-[300px] overflow-hidden">
                  <h3
                    className={`font-medium whitespace-nowrap ${
                      currentSong?.title && currentSong.title.length > 30
                        ? "animate-marquee"
                        : ""
                    }`}
                  >
                    {currentSong?.title as string}
                  </h3>
                </div>
                <p className="text-sm text-gray-400">
                  {currentSong?.artist as string}
                </p>
              </div>
            </div>
            <div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="w-[200px] h-1 rounded-lg appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-container]:bg-[#545454]"
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 absolute">
            <div className="flex items-center gap-4">
              <button onClick={prev} className="text-white hover:text-gray-300">
                <Image src="/prev.svg" alt="prev" width={24} height={24} />
              </button>
              <button
                onClick={() =>
                  setPlayStatus(playStatus === "play" ? "pause" : "play")
                }
                className="text-white hover:text-gray-300"
              >
                <Image
                  src={playStatus === "play" ? "/pause.svg" : "/play.svg"}
                  alt={playStatus === "play" ? "pause" : "play"}
                  width={24}
                  height={24}
                />
              </button>
              <button onClick={next} className="text-white hover:text-gray-300">
                <Image src="/next.svg" alt="prev" width={24} height={24} />
              </button>
            </div>
            <div className="w-[500px] flex items-center gap-2">
              <span className="text-xs text-gray-400">
                {formatTime(currentTime)}
              </span>
              <div className="w-full bg-[#54545420] h-1 rounded-full">
                <div
                  className="bg-primary h-1 rounded-full"
                  style={{
                    width: `${(currentTime / duration) * 100}%`,
                  }}
                />
              </div>
              <span className="text-xs text-gray-400">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        "재생 중인 곡이 없습니다"
      )}
      <div className="max-w-screen mx-auto px-4 h-full flex items-center justify-between">
        <div className="hidden">
          {videoId && (
            <YouTube
              videoId={videoId}
              opts={opts}
              onReady={onReady}
              onEnd={next}
              className="hidden"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SoundPlayer;
