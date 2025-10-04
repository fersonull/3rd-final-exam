import { CheckCircle, FolderClockIcon, Folders } from "lucide-react";

const typeConfig = {
  finished: {
    icon: <CheckCircle size={16} className="text-green-600" />,
    border: "border-green-400",
  },
  ongoing: {
    icon: <FolderClockIcon size={16} className="text-blue-600" />,
    border: "border-blue-400",
  },
  created: {
    icon: <Folders size={16} className="text-orange-600" />,
    border: "border-orange-400",
  },
};

export default function RecentCard({
  type = "finished",
  title,
  time,
  className = "",
  ...props
}) {
  const config = typeConfig[type] || typeConfig.finished;

  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-lg border-l-4 bg-accent ${config.border} ${className}`}
      {...props}
    >
      {config.icon}
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}
