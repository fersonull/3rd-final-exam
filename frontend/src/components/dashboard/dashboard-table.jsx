import React, { useState } from "react";
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
import TaskStatusPill from "../tasks/task-status-pill";
import { ChevronUp, ChevronDown } from "lucide-react";
import { columns } from "@/lib/dashboard-table-definitions";
import { initialTableData } from "@/lib/tasks-data-placeholder";
import { formatDate } from "@/lib/utils";

function getSortedData(data, sortKey, sortOrder) {
  if (!sortKey) return data;
  return [...data].sort((a, b) => {
    let aValue = a[sortKey];
    let bValue = b[sortKey];

    if (sortKey === "dueDate") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
}

export default function DashboardTable() {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [tableData, setTableData] = useState(initialTableData);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = getSortedData(tableData, sortKey, sortOrder);

  return (
    <div className="overflow-x-auto w-full">
      <Table className="min-w-[700px] w-full">
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={col.className}
                style={{
                  cursor: col.sortable ? "pointer" : "default",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                }}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {col.sortable &&
                    (sortKey === col.key ? (
                      sortOrder === "asc" ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )
                    ) : (
                      <span className="opacity-30">
                        <ChevronUp size={14} style={{ marginBottom: -4 }} />
                        <ChevronDown size={14} style={{ marginTop: -4 }} />
                      </span>
                    ))}
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8">
                <span className="text-muted-foreground">No tasks found.</span>
              </TableCell>
            </TableRow>
          ) : (
            sortedData.map((data, index) => (
              <TableRow key={index}>
                <TableCell className="py-3 font-medium">{data.task}</TableCell>
                <TableCell className="py-3">{data.project}</TableCell>
                <TableCell className="py-3">
                  <TaskStatusPill status={data.status} />
                </TableCell>
                <TableCell className="py-3">{data.priority}</TableCell>
                <TableCell className="py-3">
                  {formatDate(data.dueDate)}
                </TableCell>
                <TableCell className="py-3 flex-end">
                  {data.assignee ? (
                    data.assignee
                  ) : (
                    <p className="text-muted-foreground">No assignee</p>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
