import React, { useState } from "react";
import Banner from "../ui/banner";
import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "../ui/input-group";
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
import { ChevronUp, ChevronDown, Plus, SearchIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const initialTableData = [
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
  {
    task: "Create login form",
    project: "e-dolo",
    status: "In Progress",
    priority: "Low",
    dueDate: "2023-09-15",
    assignee: null,
  },
  {
    task: "Fix dashboard bugs",
    project: "e-dolo",
    status: "Finished",
    priority: "High",
    dueDate: "2023-09-20",
    assignee: "Jasfer Monton",
  },
  {
    task: "Fix authentication",
    project: "e-dolo",
    status: "In Progress",
    priority: "High",
    dueDate: "2023-09-12",
    assignee: null,
  },
];

const columns = [
  { key: "task", label: "Tasks", sortable: true, className: "w-[200px]" },
  { key: "project", label: "Project", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "priority", label: "Priority", sortable: true },
  { key: "dueDate", label: "Due Date", sortable: true },
  {
    key: "assignee",
    label: "Assignee",
    sortable: true,
    className: "text-right",
  },
];

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

const teamMembers = [
  { value: "Jasfer Monton", label: "Jasfer Monton" },
  { value: "Kimberly Macatangay", label: "Kimberly Macatangay" },
];

const statusOptions = [
  { value: "In Progress", label: "In Progress" },
  { value: "Finished", label: "Finished" },
];

const priorityOptions = [
  { value: "High", label: "High" },
  { value: "Low", label: "Low" },
];

export default function TasksTable() {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [tableData, setTableData] = useState(initialTableData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Filtering logic
  const filteredData = tableData.filter((row) => {
    const matchesSearch =
      search === "" ||
      row.task.toLowerCase().includes(search.toLowerCase()) ||
      row.project.toLowerCase().includes(search.toLowerCase()) ||
      (row.assignee
        ? row.assignee.toLowerCase().includes(search.toLowerCase())
        : false);
    const matchesStatus = statusFilter === "all" || row.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || row.priority === priorityFilter;
    const matchesAssignee =
      assigneeFilter === "all" || row.assignee === assigneeFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  const sortedData = getSortedData(filteredData, sortKey, sortOrder);

  // Layout
  return (
    <>
      {/* Filters and Search */}

      <div className="grid grid-cols-1">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  {statusOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Priority</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  {priorityOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Assignee</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.value} value={member.value}>
                      {member.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-64">
            <InputGroup>
              <InputGroupInput
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
        {/* Table */}
        <Card>
          <CardContent>
            <div className="overflow-x-auto w-full">
              <Table className="min-w-[700px] w-full">
                <TableCaption>A list of all tasks.</TableCaption>
                <TableHeader>
                  <TableRow>
                    {columns.map((col) => (
                      <TableHead
                        key={col.key}
                        className={col.className}
                        style={{
                          cursor: col.sortable ? "pointer" : "default",
                          userSelect: "none",
                        }}
                        onClick={
                          col.sortable ? () => handleSort(col.key) : undefined
                        }
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
                                <ChevronUp
                                  size={14}
                                  style={{ marginBottom: -4 }}
                                />
                                <ChevronDown
                                  size={14}
                                  style={{ marginTop: -4 }}
                                />
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
                      <TableCell
                        colSpan={columns.length}
                        className="text-center py-8"
                      >
                        <span className="text-muted-foreground">
                          No tasks found.
                        </span>
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedData.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell className="py-3 font-medium">
                          {data.task}
                        </TableCell>
                        <TableCell className="py-3">{data.project}</TableCell>
                        <TableCell className="py-3">{data.status}</TableCell>
                        <TableCell className="py-3">{data.priority}</TableCell>
                        <TableCell className="py-3">{data.dueDate}</TableCell>
                        <TableCell className="py-3 flex-end">
                          {data.assignee === null ? (
                            <div>
                              <Select>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Select assignee" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Your team</SelectLabel>
                                    {teamMembers.map((member) => (
                                      <SelectItem
                                        key={member.value}
                                        value={member.value}
                                      >
                                        {member.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          ) : (
                            <span>{data.assignee}</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
