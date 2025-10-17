import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/use-fetch";
import { toast } from "sonner";
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
import { formatDate } from "@/lib/utils";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function isTaskOverdue(task) {
  if (typeof task.overdue === "boolean") return task.overdue;
  if (task.status === "completed" || !task.due_date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(task.due_date);
  if (isNaN(due.getTime())) return false;
  return due < today;
}

function getPriorityStyle(priority) {
  switch ((priority || "").toLowerCase()) {
    case "high":
      return { color: "#d32f2f", fontWeight: 600 }; // red, bold
    case "normal":
      return { color: "#f9a825", fontWeight: 500 }; // amber/brownish
    case "low":
      return { color: "#388e3c", fontWeight: 500 }; // green
    default:
      return { color: "#757575" };
  }
}

function getPriorityLabel(priority) {
  if (!priority) return "";
  switch (priority.toLowerCase()) {
    case "high":
      return "High";
    case "normal":
      return "Normal";
    case "low":
      return "Low";
    default:
      return priority.charAt(0).toUpperCase() + priority.slice(1);
  }
}

function getSortValue(row, sortKey) {
  switch (sortKey) {
    case "title":
      return row.title || "";
    case "status":
      return row.status || "";
    case "priority":
      const priorityRank = { high: 1, normal: 2, low: 3 };
      return priorityRank[(row.priority || "").toLowerCase()] || 99;
    case "dueDate":
    case "due_date":
      return row.due_date ? new Date(row.due_date).getTime() : Infinity;
    case "assignee":
      return row.assignee_name || "";
    default:
      return row[sortKey];
  }
}

function getSortedData(data, sortKey, sortOrder) {
  if (!sortKey) return data;
  return [...data].sort((a, b) => {
    let aValue = getSortValue(a, sortKey);
    let bValue = getSortValue(b, sortKey);

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      const aStr = (aValue ?? "").toString().toLowerCase();
      const bStr = (bValue ?? "").toString().toLowerCase();
      if (aStr < bStr) return sortOrder === "asc" ? -1 : 1;
      if (aStr > bStr) return sortOrder === "asc" ? 1 : -1;
      return 0;
    }
  });
}

function iEquals(a, b) {
  if (a == null || b == null) return false;
  return String(a).toLowerCase() === String(b).toLowerCase();
}

export default function TasksTable({ tasks }) {
  const { pid } = useParams();
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [assigningTask, setAssigningTask] = useState(null);

  const {
    data: membersData,
    loading: membersLoading,
    error: membersError,
  } = useFetch(pid ? `/projects/${pid}/members` : null);

  const { refetch: updateTaskAssignee } = useFetch(
    "/tasks",
    { method: "PUT" },
    false
  );

  const handleAssigneeChange = async (taskId, assigneeId) => {
    console.log("Assigning task:", taskId, "to assignee:", assigneeId);

    if (!taskId || !assigneeId) {
      console.log("Missing taskId or assigneeId:", { taskId, assigneeId });
      return;
    }

    setAssigningTask(taskId);
    try {
      const res = await updateTaskAssignee({
        body: JSON.stringify({
          id: taskId,
          assignee_id: assigneeId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Update response:", res);

      if (res?.success) {
        toast.success("Task assignee updated successfully!");
      } else if (res?.errors) {
        Object.values(res.errors).forEach((errorMsg) => {
          toast.error(errorMsg);
        });
      } else {
        toast.error(res?.error || "Failed to update assignee");
      }
    } catch (error) {
      console.error("Error updating assignee:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setAssigningTask(null);
    }
  };

  const projectMembers = membersData || [];

  function handleSort(nextKey) {
    if (sortKey === nextKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(nextKey);
      setSortOrder("asc");
    }
  }

  const filteredData =
    tasks?.filter((row) => {
      const searchText = search.trim().toLowerCase();
      const matchesSearch =
        !searchText ||
        (row.title && row.title.toLowerCase().includes(searchText)) ||
        (row.project && row.project.toLowerCase().includes(searchText)) ||
        (row.assignee_name &&
          row.assignee_name.toLowerCase().includes(searchText));

      const matchesStatus =
        statusFilter === "all" || iEquals(row.status, statusFilter);

      const matchesPriority =
        priorityFilter === "all" || iEquals(row.priority, priorityFilter);

      const matchesAssignee =
        assigneeFilter === "all" ||
        String(row.assignee_id) === assigneeFilter ||
        (row.assignee_name &&
          row.assignee_name.toLowerCase() ===
            teamMembers
              .find((m) => m.value === assigneeFilter)
              ?.label?.toLowerCase());

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesAssignee
      );
    }) || [];

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
                  {sortedData?.length === 0 || !tasks ? (
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
                    sortedData?.map((data, index) => {
                      return (
                        <TableRow
                          key={index}
                          style={
                            data?.overdue
                              ? { backgroundColor: "rgba(255, 83, 83, 0.07)" }
                              : {}
                          }
                          className={
                            data?.overdue
                              ? "animate-pulse-[.5s] transition-colors"
                              : ""
                          }
                          title={
                            data?.overdue ? "This task is overdue" : undefined
                          }
                        >
                          <TableCell className="py-3 font-medium">
                            {data.title}
                          </TableCell>
                          <TableCell className="py-3">
                            <TaskStatusPill status={data.status} />
                          </TableCell>
                          <TableCell className="py-3">
                            <span style={getPriorityStyle(data.priority)}>
                              {getPriorityLabel(data.priority)}
                            </span>
                          </TableCell>
                          <TableCell className="py-3">
                            {formatDate(data.due_date)}
                          </TableCell>
                          <TableCell className="py-3 flex-end">
                            {data.assignee_id === null ? (
                              <div>
                                {membersError ? (
                                  <div className=" text-xs">
                                    No members available
                                  </div>
                                ) : (
                                  <Select
                                    onValueChange={(assigneeId) => {
                                      console.log(
                                        "Select changed for task:",
                                        data.id,
                                        "assignee:",
                                        assigneeId
                                      );
                                      handleAssigneeChange(data.id, assigneeId);
                                    }}
                                    disabled={
                                      assigningTask === data.id ||
                                      membersLoading ||
                                      projectMembers.length === 0
                                    }
                                  >
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue
                                        placeholder={
                                          membersLoading
                                            ? "Loading members..."
                                            : projectMembers.length === 0
                                            ? "No members available"
                                            : "Select assignee"
                                        }
                                      />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {projectMembers.length === 0 ? (
                                        <div className="p-2 text-sm text-muted-foreground text-center">
                                          No members available
                                        </div>
                                      ) : (
                                        <SelectGroup>
                                          <SelectLabel>
                                            Project Members
                                          </SelectLabel>
                                          {projectMembers.map((member) => (
                                            <SelectItem
                                              key={member.user_id}
                                              value={member.user_id}
                                            >
                                              {member.user_name ||
                                                member.user_email}
                                            </SelectItem>
                                          ))}
                                        </SelectGroup>
                                      )}
                                    </SelectContent>
                                  </Select>
                                )}
                              </div>
                            ) : (
                              <span>{data.assignee_name}</span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
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
