import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tableData = [
  {
    task: "Create a modal",
    project: "UI/UX",
    status: "In Progress",
    priority: "Low",
    dueDate: "2023-09-15",
    assignee: "Jasfer Monton",
  },
  {
    task: "Toast popups for actions",
    project: "UI/UX",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-09-18",
    assignee: "Kimberly Macatangay",
  },
];

export default function DashboardTable() {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Tasks</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Assignee</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((data, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{data.task}</TableCell>
              <TableCell>{data.project}</TableCell>
              <TableCell>{data.status}</TableCell>
              <TableCell>{data.priority}</TableCell>
              <TableCell>{data.dueDate}</TableCell>
              <TableCell className="text-right">{data.assignee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
