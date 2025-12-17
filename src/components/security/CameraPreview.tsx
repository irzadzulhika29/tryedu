"use client";

import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Camera, CameraOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface CameraPreviewProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  onError?: (error: string) => void;
  onReady?: () => void;
}

const sizeConfig = {
  sm: "w-32 h-20",
  md: "w-48 h-32",
  lg: "w-full aspect-video",
};

export function CameraPreview({
  className,
  size = "md",
  onError,
  onReady,
}: CameraPreviewProps) {
  const webcamRef = useRef<Webcam>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleUserMedia = () => {
    setIsReady(true);
    setHasError(false);
    onReady?.();
  };

  const handleUserMediaError = (error: string | DOMException) => {
    setHasError(true);
    setIsReady(false);
    const errorMessage =
      typeof error === "string"
        ? error
        : error.message || "Camera access denied";
    onError?.(errorMessage);
  };

  return (
    <div
      className={cn(
        "relative bg-zinc-900 rounded-lg overflow-hidden",
        sizeConfig[size],
        className
      )}
    >
      {!isReady && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <CameraOff className="h-8 w-8 mb-2 opacity-50" />
          <p className="text-xs opacity-75">Loading...</p>
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-red-900/50">
          <CameraOff className="h-8 w-8 mb-2 text-red-400" />
          <p className="text-xs text-center px-2">Camera unavailable</p>
        </div>
      )}
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        className="w-full h-full object-cover"
        onUserMedia={handleUserMedia}
        onUserMediaError={handleUserMediaError}
        videoConstraints={{
          facingMode: "user",
          width: size === "lg" ? 640 : 320,
          height: size === "lg" ? 480 : 240,
        }}
      />
      {isReady && (
        <div className="absolute bottom-1 right-1 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/50 text-white text-xs">
          <Camera className="h-3 w-3" />
          <span>LIVE</span>
        </div>
      )}
    </div>
  );
}
