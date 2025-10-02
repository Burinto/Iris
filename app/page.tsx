"use client";

import { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";

export default function Home() {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imgSrc = webcamRef.current?.getScreenshot();
    if (imgSrc) setImage(imgSrc);
  }, [webcamRef]);

  const downloadImage = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = "photobooth.jpg";
    link.click();
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📸 Photobooth</h1>

      {!image ? (
        <div className="flex flex-col items-center">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-xl shadow-lg"
            videoConstraints={{ facingMode: "user" }}
          />
          <button
            onClick={capture}
            className="mt-4 px-6 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 transition"
          >
            Take Photo
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src={image}
            alt="Captured"
            className="rounded-xl shadow-lg mb-4"
          />
          <div className="flex gap-4">
            <button
              onClick={downloadImage}
              className="px-6 py-2 rounded-xl bg-green-500 hover:bg-green-600 transition"
            >
              Download
            </button>
            <button
              onClick={() => setImage(null)}
              className="px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition"
            >
              Retake
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

