"use client";

import {
  Repeat,
  Play,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  Pause,
  LoaderCircle,
} from "lucide-react";
import Image from "next/image";

import { motion } from "motion/react";
import { useState } from "react";

type State = "playing" | "paused" | "loading";
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
  const [state, setState] = useState<State>("paused");
  const barAnimations = [
    { delay: 0.2, duration: 0.8, maxScaleY: 4 },
    { delay: 0.5, duration: 1.2, maxScaleY: 5 },
    { delay: 0, duration: 0.9, maxScaleY: 6 },
    { delay: 0.7, duration: 1.1, maxScaleY: 4 },
    { delay: 0.3, duration: 1.0, maxScaleY: 5 },
  ];

  const togglePlayButton = () => {
    if (state === "playing") {
      setState("paused");
    } else if (state === "paused") {
      setState("playing");
    }
  };

  const musicPlayerCardVariants = {
    playing: {
      backgroundColor: "#1a1a1a",
      boxShadow: "0px 0px 40px 0px #8B5CF64D",
      transition: { duration: 0.3 },
    },
    paused: {
      backgroundColor: "#0f0f0f",
      transition: { duration: 0.3 },
    },
    loading: {
      opacity: 0.7,
    },
  };

  const musicInfoVariants = {
    playing: {
      rotate: 360,
      scale: [0.85, 0.9, 0.85],
      willChange: "transform",
      transition: {
        rotate: {
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        },
        scale: {
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        },
      },
    },
    paused: {
      rotate: 0,
      scale: 1,
      transition: {
        rotate: {
          duration: 0.3,
          ease: "linear",
        },
        scale: {
          duration: 0.3,
          ease: "linear",
        },
      },
    },
  };

  const albumArtVariants = {
    playing: {
      rotate: -360,
      transition: {
        rotate: {
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        },
      },
    },
    paused: {
      rotate: 0,
      transition: {
        rotate: {
          duration: 0,
          ease: "linear",
        },
      },
    },
  };

  const barVariants = {
    playing: (i: number) => ({
      scaleY: [1, barAnimations[i].maxScaleY, 1],
      transition: {
        scaleY: {
          duration: barAnimations[i].duration,
          repeat: Infinity,
          delay: barAnimations[i].delay,
          ease: "easeInOut",
        },
      },
      willChange: "transform",
    }),
    paused: () => ({
      scaleY: 1,
      transition: {
        scaleY: {
          duration: 1,
          ease: "easeInOut",
        },
      },
    }),
  };

  return (
    <motion.div
      variants={musicPlayerCardVariants}
      animate={state}
      className="flex flex-col w-full max-w-125 rounded-2xl gap-5 p-4 "
    >
      {/* Song Info */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <motion.div
            variants={musicInfoVariants}
            animate={state}
            className="rounded-xl w-30 h-30 bg-linear-to-br from-purple-600 to-pink-600 flex justify-center items-center"
          >
            <motion.div variants={albumArtVariants} animate={state}>
              <Image
                width={48}
                height={60}
                src="/music-note.png"
                alt="Music note icon"
                placeholder="empty"
              />
            </motion.div>
          </motion.div>
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
            {barAnimations.map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={barVariants}
                animate={state}
                className="w-2 h-1.5 bg-primary-200 p-0 m-0 origin-bottom"
              />
            ))}
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
          <Shuffle size={20} className="text-neutral-300" />
        </div>
        <div className="w-9 h-9 p-0 m-0 flex-center">
          <SkipBack size={20} className="text-neutral-300" />
        </div>
        <button
          className={`${state === "playing" ? "bg-primary-200" : "bg-neutral-500"} w-14 h-14 rounded-full flex justify-center items-center cursor-pointer`}
          onClick={togglePlayButton}
          disabled={state === "loading"}
        >
          {state === "playing" && <Pause size={24} className="text-white" />}
          {state === "paused" && <Play size={24} className="text-white" />}
          {state === "loading" && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "loop",
                ease: "circInOut",
              }}
            >
              <LoaderCircle size={24} className="text-white" />
            </motion.div>
          )}
        </button>
        <div className="w-9 h-9 p-0 m-0 flex-center">
          <SkipForward size={20} className="text-neutral-300" />
        </div>
        <div className="w-9 h-9 p-0 m-0 flex-center">
          <Repeat size={20} className="text-neutral-300" />
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex justify-between gap-2 items-center">
        <Volume2 className="text-neutral-400" size={16} />
        <div className="w-full h-1 rounded-full bg-neutral-800" />
      </div>
    </motion.div>
  );
}
