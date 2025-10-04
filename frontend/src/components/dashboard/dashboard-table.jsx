import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectLabel,
} from "../ui/select";
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
        <TableCaption>A list of recent tasks.</TableCaption>
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
              <TableCell className="flex-end">
                <Select defaultValue={data.assignee}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Your team</SelectLabel>
                      <SelectItem selected value="Jasfer Monton">
                        Jasfer Monton
                      </SelectItem>
                      <SelectItem value="Kimberly Macatangay">
                        Kimberly Macatangay
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
