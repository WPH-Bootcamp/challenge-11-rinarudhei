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
import { useEffect, useState } from "react";
import { msToMinutesSeconds } from "@/utils/utils";

const SONG_DURATION_MS = 100000;

type State = "playing" | "paused" | "loading";
export function MusicPlayer() {
  const [state, setState] = useState<State>("paused");
  const [currentMs, setCurrentMs] = useState<number>(0);
  const barAnimations = [
    { delay: 0.2, duration: 0.8, maxScaleY: 4 },
    { delay: 0.5, duration: 1.2, maxScaleY: 5 },
    { delay: 0, duration: 0.9, maxScaleY: 6 },
    { delay: 0.7, duration: 1.1, maxScaleY: 4 },
    { delay: 0.3, duration: 1.0, maxScaleY: 5 },
  ];
  const SKIP_STEP = 5000;

  useEffect(() => {
    if (currentMs >= SONG_DURATION_MS && state === "playing") {
      return () => {
        setCurrentMs(0);
        setState("paused");
      };
    }
  });
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state === "playing") {
      interval = setInterval(() => {
        setCurrentMs((prev) => prev + 100);
      }, 100);
    }

    return () => {
      clearInterval(interval);
    };
  }, [state]);

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
          type: "spring",
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
      scale: [1, 1.2, 1],
      transition: {
        rotate: {
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        },
        scale: {
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        },
      },
    },
    paused: {
      rotate: 0,
      scale: 1,
      transition: {
        rotate: {
          duration: 0.1,
          ease: "easeInOut",
        },
        scale: {
          duration: 0.1,
          ease: "easeInOut",
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

  const progressBarVariants = {
    playing: {
      scaleX: currentMs / SONG_DURATION_MS,
      transition: {
        scaleX: {
          duration: 0.1,
          ease: "linear",
        },
      },
    },
    paused: {
      scaleX: currentMs / SONG_DURATION_MS,
      transition: {
        scaleX: {
          duration: 0,
        },
      },
    },
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
      <div className="w-full h-2 rounded-full bg-neutral-800">
        <motion.div
          className="h-full rounded-bl-full rounded-tl-full bg-primary-200"
          variants={progressBarVariants}
          style={{ originX: 0 }}
          initial={{ scaleX: 0 }}
          animate={state}
        />
      </div>

      {/* Duration Info */}
      <div className="flex justify-between items-center text-xs text-neutral-500">
        <p>{msToMinutesSeconds(currentMs)}</p>
        <p>{msToMinutesSeconds(SONG_DURATION_MS)}</p>
      </div>

      {/* Controls */}
      <div className="flex w-full justify-center items-center gap-4">
        <div className="w-9 h-9 p-0 m-0 flex-center">
          <Shuffle size={20} className="text-neutral-300" />
        </div>
        <div
          className="w-9 h-9 p-0 m-0 flex-center"
          onClick={() =>
            setCurrentMs((prev) => (prev < SKIP_STEP ? 0 : prev - SKIP_STEP))
          }
        >
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
        <div
          className="w-9 h-9 p-0 m-0 flex-center"
          onClick={() =>
            setCurrentMs((prev) =>
              prev > SONG_DURATION_MS - SKIP_STEP
                ? SONG_DURATION_MS
                : prev + SKIP_STEP,
            )
          }
        >
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
