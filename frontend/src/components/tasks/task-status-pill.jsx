export default function TaskStatusPill({ status }) {
  let colorClass =
    status === "Finished"
      ? "bg-green-50 text-green-700 border-green-100"
      : status === "In Progress"
      ? "bg-yellow-50 text-yellow-700 border-yellow-100"
      : "bg-gray-50 text-gray-700 border-gray-100";
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${colorClass}`}
      style={{ minWidth: 90, textAlign: "center" }}
    >
      {status}
    </span>
  );
}