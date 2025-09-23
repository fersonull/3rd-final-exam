import clsx from "clsx";

export default function DotLoading({ size = 2 }) {
  return (
    <div className="flex gap-1 items-center">
      <div
        className={`w-${size} h-${size} rounded-full animate-pulse bg-accent`}
      ></div>
      <div
        className={`w-${size} h-${size} rounded-full animate-pulse bg-accent`}
      ></div>
      <div
        className={`w-${size} h-${size} rounded-full animate-pulse bg-accent`}
      ></div>
    </div>
  );
}
