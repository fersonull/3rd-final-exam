import { useState } from "react";
import { dummyMembers } from "@/lib/members-data-placeholder";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { UserPlus2, Pencil, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
];

function getSortedData(data, sortKey, sortOrder) {
  if (!sortKey) return data;
  return [...data].sort((a, b) => {
    let aVal = a[sortKey]?.toString().toLowerCase() ?? "";
    let bVal = b[sortKey]?.toString().toLowerCase() ?? "";

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
}

export default function MembersTable() {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedMembers = getSortedData(dummyMembers, sortKey, sortOrder);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Directory</CardTitle>
        <CardDescription>
          View and manage all members of your team. Add, remove, or update
          member information as needed.
        </CardDescription>

        <CardAction>
          <Link to="new-member">
            <Button>
              <UserPlus2 />
              Add member
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  style={{
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onClick={() => handleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sortKey === col.key ? (
                      sortOrder === "asc" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )
                    ) : (
                      <span className="opacity-30">
                        <ChevronUp size={14} style={{ marginBottom: -4 }} />
                        <ChevronDown size={14} style={{ marginTop: -4 }} />
                      </span>
                    )}
                  </span>
                </TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMembers.map((member, idx) => (
              <TableRow key={idx}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <span
                    className={
                      member.status === "Active"
                        ? "text-green-600 font-medium"
                        : "text-gray-400"
                    }
                  >
                    {member.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Link to={`members/edit/${member.id || idx}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Pencil size={16} />
                      Edit
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
