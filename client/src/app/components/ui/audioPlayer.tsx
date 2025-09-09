import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "../common/slider";
import { Button } from "../common/button";
import { formatTimeSec } from "@/app/utils/trackTime";
import { toast } from "react-toastify";

type Props = {
  title: string;
  artist: string;
  audioImg: string;
  preview: string;
};

export default function AudioPlayer({
  title,
  artist,
  audioImg,
  preview,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          toast("Автовоспроизведение заблокировано браузером:", err);
        });
    }
  }, [preview]);

  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-2xl shadow-md bg-neutral-900 text-white  w-full ">
      {/* Левая часть: обложка + инфо */}
      <div className="flex items-center gap-3 w-[250px]">
        <img src={audioImg} alt={title} className="w-14 h-14 rounded-md" />
        <div className="flex flex-col overflow-hidden">
          <span className="font-bold truncate">{title}</span>
          <span className="text-sm text-gray-400 truncate">{artist}</span>
        </div>
      </div>

      {/* Центр: контролы + прогресс */}
      <div className="flex flex-col items-center w-[400px]">
        <div className="flex items-center gap-3 mb-2">
          <Button size="icon" variant="ghost">
            <SkipBack />
          </Button>
          <Button size="icon" variant="ghost" onClick={togglePlay}>
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button size="icon" variant="ghost">
            <SkipForward />
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-gray-400 w-10 text-right">
            {formatTimeSec(progress)}
          </span>
          <Slider
            value={[progress]}
            max={duration}
            step={1}
            className="flex-1"
            onValueChange={(val) => {
              if (audioRef.current) audioRef.current.currentTime = val[0];
            }}
          />
          <span className="text-xs text-gray-400 w-10">
            {formatTimeSec(duration)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 w-[150px]">
        <Volume2 className="w-5 h-5 text-gray-300" />
        <Slider
          value={[volume]}
          max={1}
          step={0.01}
          onValueChange={(val) => setVolume(val[0])}
        />
      </div>

      <audio
        ref={audioRef}
        src={preview}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}
