"use client";

import {
  Repeat,
  Play,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import Image from "next/image";

// TODO: Import dependencies yang diperlukan
// import { motion } from "motion/react";
// import { ... } from "lucide-react";

export function MusicPlayer() {
  // TODO: Implementasikan state management untuk playing, paused, loading

  // TODO: Implementasikan handler untuk play/pause

  // TODO: Implementasikan komponen music player sesuai desain Figma
  // Struktur yang perlu dibuat:
  // - Container dengan background dan shadow animations
  // - Album artwork dengan rotation dan scale animations
  // - Equalizer bars dengan stagger effect
  // - Progress bar dengan fill animation
  // - Control buttons (play/pause, skip, volume)

  return (
    <div className="flex flex-col w-full max-w-125 rounded-2xl gap-5 p-4 bg-[#0f0f0f]">
      {/* Song Info */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="rounded-xl w-30 h-30 bg-linear-to-br from-purple-600 to-pink-600 flex justify-center items-center">
            <Image
              width={48}
              height={60}
              src="/music-note.png"
              alt="Music note icon"
            />
          </div>
          <div className="flex flex-col gap-2 w-81">
            <h2 className="text-lg font-bold text-neutral-100">
              Awesome Song Title
            </h2>
            <p className="text-sm font-normal text-neutral-400">
              Amazing Artist
            </p>
          </div>
        </div>
        <div className="w-full pl-36">
          <div className="flex gap-1 w-fit h-fit">
            <div className="w-2 h-1.5 bg-primary-200 p-0 m-0" />
            <div className="w-2 h-1.5 bg-primary-200 p-0 m-0" />
            <div className="w-2 h-1.5 bg-primary-200 p-0 m-0" />
            <div className="w-2 h-1.5 bg-primary-200 p-0 m-0" />
            <div className="w-2 h-1.5 bg-primary-200 p-0 m-0" />
          </div>
        </div>
      </div>

      {/* Progres Bar */}
      <div className="w-full h-2 rounded-full bg-neutral-800" />

      {/* Duration Info */}
      <div className="flex justify-between items-center text-xs text-neutral-500">
        <p>1:23</p>
        <p>3:45</p>
      </div>

      {/* Controls */}
      <div className="flex w-full justify-center items-center gap-4">
        <div className="w-9 h-9 p-0 m-0 flex-center">
          <Shuffle size={20} />
        </div>
        <div className="w-9 h-9 p-0 m-0 flex-center">
          <SkipBack size={20} />
        </div>
        <div className="w-14 h-14 bg-primary-200 rounded-full flex justify-center items-center">
          <Play size={24} />
        </div>
        <div className="w-9 h-9 p-0 m-0 flex-center">
          <SkipForward size={20} />
        </div>
        <div className="w-9 h-9 p-0 m-0 flex-center">
          <Repeat size={20} />
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex justify-between gap-2 items-center">
        <Volume2 size={16} />
        <div className="w-full h-1 rounded-full bg-neutral-800" />
      </div>
    </div>
  );
}
