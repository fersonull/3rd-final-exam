export default function DotLoading({ size = 12 }) {
  return (
    <div className="flex gap-2 items-center">
      <span
        className="rounded-full bg-accent animate-pulse"
        style={{ width: 8, height: 8, animationDelay: "0s" }}
      />
      <span
        className="rounded-full bg-accent animate-pulse"
        style={{ width: 8, height: 8, animationDelay: "0.2s" }}
      />
      <span
        className="rounded-full bg-accent animate-pulse"
        style={{ width: 8, height: 8, animationDelay: "0.4s" }}
      />
    </div>
  );
}
