import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
          <TableRow>
            <TableCell className="font-medium">Create a modal</TableCell>
            <TableCell>UI/UX</TableCell>
            <TableCell>In Progress</TableCell>
            <TableCell>Low</TableCell>
            <TableCell>2023-09-15</TableCell>
            <TableCell className="text-right">Jasfer Monton</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              Toast popups for actions
            </TableCell>
            <TableCell>UI/UX</TableCell>
            <TableCell>In Progress</TableCell>
            <TableCell>High</TableCell>
            <TableCell>2024-09-18</TableCell>
            <TableCell className="text-right">Kimberly Macatangay</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
