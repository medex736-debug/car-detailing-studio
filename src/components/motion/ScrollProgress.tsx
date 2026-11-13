import { useScrollProgress } from "@/hooks/useScrollProgress";

/** 2px gold reading-progress bar pinned to the top edge. */
export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="scroll-progress"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}
