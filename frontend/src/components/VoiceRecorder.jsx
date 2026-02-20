import { useRef, useState } from "react";
import microphone from "../assets/microphone.svg";

export default function VoiceRecorder({ onStop }) {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const dataArrayRef = useRef(null);

  const [recording, setRecording] = useState(false);
  const [scale, setScale] = useState(1);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // 🎙 recorder
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    audioChunksRef.current = [];

    recorder.ondataavailable = e => audioChunksRef.current.push(e.data);
    recorder.onstop = sendAudio;
    recorder.start();

    // 🔊 analyser for loudness
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 256;
    source.connect(analyser);

    analyserRef.current = analyser;
    dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

    animatePulse();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    cancelAnimationFrame(animationRef.current);
    setScale(1);
    setRecording(false);
  };

  const animatePulse = () => {
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];

    const avg = sum / dataArray.length;
    const volumeScale = 1 + (avg / 255) * 1.5;

    setScale(volumeScale);
    animationRef.current = requestAnimationFrame(animatePulse);
  };

  const sendAudio = async () => {
    const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });

    // 🚀 Send audio to Dashboard
    if (onStop) {
      await onStop(blob);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
      <div
        onClick={recording ? stopRecording : startRecording}
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          background: recording ? "#ff4d4d" : "#4caf50",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transform: `scale(${scale})`,
          transition: "transform 0.08s linear",
        }}
      >
        <img src={microphone} alt="Mic" style={{ width: 24, height: 24 }} />
      </div>
    </div>
  );
}