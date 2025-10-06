export const columns = [
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

export const statusOptions = [
  { value: "In Progress", label: "In Progress" },
  { value: "Finished", label: "Finished" },
  { value: "Unassigned", label: "Unassigned" },
  { value: "Due", label: "Due" },
  { value: "Overdue", label: "Overdue" },
];
  
export const priorityOptions = [
  { value: "High", label: "High" },
  { value: "Low", label: "Low" },
];