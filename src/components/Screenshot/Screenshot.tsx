import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/react";
import { AiFillCamera } from "react-icons/ai";

const DEFAULT_ASPECT_RATIO = 4 / 3;

interface ScreenshotProps {
  onCapture: (imageUri: string) => void;
}

const Screenshot = ({ onCapture }: ScreenshotProps) => {
  const video = React.useRef<HTMLVideoElement>(null);
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const [streaming, setStreaming] = useState(false);

  const updateDimensions = useCallback(() => {
    video.current!.setAttribute("width", `${width}`);
    video.current!.setAttribute("height", `${height}`);
    canvas.current!.setAttribute("width", `${width}`);
    canvas.current!.setAttribute("height", `${height}`);
  }, [height, width]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "environment",
        },
        audio: false,
      })
      .then((stream) => {
        video.current!.srcObject = stream;
        video.current!.play().catch(console.error);
      })
      .catch(handleCameraError);
  }, []);

  useEffect(() => {
    updateDimensions();
  }, [updateDimensions]);

  const handleCameraError = (err: DOMException) => {
    if (err.name === "NotFoundError") {
      return toast.error("Nenhuma câmera encontrada");
    }
    if (err.name === "NotAllowedError") {
      return toast.error("Permissão de acesso à camera negada");
    }
    return toast.error("Falha ao acessar a câmera");
  };

  useEffect(() => {
    const onWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  const takePicture = () => {
    const context = canvas.current!.getContext("2d")!;
    context.drawImage(video.current!, 0, 0, width, height);
    const data = canvas.current!.toDataURL("image/png");
    onCapture(data);
  };

  const handleCanPlay = () => {
    if (streaming) {
      return;
    }

    if (isNaN(height)) {
      setHeight(width / DEFAULT_ASPECT_RATIO);
    } else {
      setHeight(
        video.current!.videoHeight / (video.current!.videoWidth / width),
      );
    }

    setStreaming(true);
  };

  return (
    <div>
      <div
        className="relative"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <video
          className="rounded border border-red-500"
          ref={video}
          id="captureVideo"
          onCanPlay={handleCanPlay}
        >
          Video stream not available.
        </video>

        <Button
          className="absolute bottom-4 h-24 w-24 rounded-full bg-transparent p-4 text-white"
          isIconOnly
          size="lg"
          variant="ghost"
          id="startButton"
          onClick={(ev) => {
            ev.preventDefault();
            takePicture();
          }}
        >
          <AiFillCamera size="lg" />
        </Button>
      </div>

      <canvas className="hidden" ref={canvas} id="canvas"></canvas>
    </div>
  );
};

export default Screenshot;
