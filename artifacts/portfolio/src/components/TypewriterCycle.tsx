import { useState, useEffect } from "react";

const WORDS = [
  { text: "Django.", color: "#00ff9d" },
  { text: "FastAPI.", color: "#00f5ff" },
  { text: "LLMs.", color: "#a78bfa" }
];

const TYPING_SPEED = 80;
const DELETING_SPEED = 50;
const PAUSE_MS = 1800;

export function TypewriterCycle() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[wordIdx].text;
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), TYPING_SPEED);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), PAUSE_MS);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), DELETING_SPEED);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx]);

  const { color } = WORDS[wordIdx];

  return (
    <span style={{ color }} className="text-glow-green relative">
      {displayed}
      <span
        className="ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.05em] animate-[blink_1s_step-end_infinite] rounded-sm"
        style={{ background: color }}
      />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
}
