import React, { useState } from "react";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  statusOptions,
  columns,
  priorityOptions,
} from "@/lib/tasks-table-definitions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "../ui/card";
import {
  ChevronUp,
  ChevronDown,
  Plus,
  SearchIcon,
  ListPlus,
} from "lucide-react";
import { initialTableData, teamMembers } from "@/lib/tasks-data-placeholder";
import TaskStatusPill from "./task-status-pill";
import TaskPriorityPill from "./task-priority-pill";
import { formatDate } from "@/lib/utils";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

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

export default function TasksTable({ tasks }) {


  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [tableData, setTableData] = useState(tasks);
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

  const filteredData = tasks?.filter((row) => {
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

  return (
    <>
      <div className="grid grid-cols-1">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="all">Filter by status</SelectItem>
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
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Priority</SelectLabel>
                  <SelectItem value="all">Filter by priority</SelectItem>
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
                <SelectValue placeholder="Filter by assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Assignee</SelectLabel>
                  <SelectItem value="all">Filter by assignee</SelectItem>
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
        <Card>
          <CardHeader>
            <CardTitle>All Tasks</CardTitle>
            <CardDescription>
              View, filter, and manage all tasks assigned to your team
            </CardDescription>
            <CardAction>
              <Link to="new-task">
                <Button variant="default" size="sm" title="Create new task">
                  <ListPlus />
                  Add Task
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
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
                  {sortedData?.length === 0 ? (
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
                    sortedData?.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell className="py-3 font-medium">
                          {data.title}
                        </TableCell>
                        <TableCell className="py-3">
                          <TaskStatusPill status={data.status} />
                        </TableCell>
                        <TableCell className="py-3">
                          <TaskPriorityPill priority={data.priority} />
                        </TableCell>
                        <TableCell className="py-3">
                          {formatDate(data.due_date)}
                        </TableCell>
                        <TableCell className="py-3 flex-end">
                          {data.assignee_id === null ? (
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
                            <span>{data.assignee_name}</span>
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
