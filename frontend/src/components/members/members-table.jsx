import { useState } from "react";
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
import { Link, useParams } from "react-router-dom";
import { useFetch } from "@/hooks/use-fetch";
import { AddMemberModal } from "./add-member-modal";
import { useFormData } from "@/hooks/use-formdata";
import { toast } from "sonner";

const columns = [
  { key: "user_name", label: "Name" },
  { key: "user_email", label: "Email" },
  { key: "role", label: "Role" },
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
  const { pid: projectId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: members,
    loading,
    error,
    refetch,
  } = useFetch(projectId ? `/projects/${projectId}/members` : null);

  const {
    loading: addMemberLoading,
    error: addMemberError,
    refetch: addMember,
  } = useFetch(
    projectId ? `/members` : null,
    {
      method: "POST",
    },
    false
  );

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

  const sortedMembers = getSortedData(members ?? [], sortKey, sortOrder);

  const handleInviteUser = async (user, projectId) => {
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("project_id", projectId);
    formData.append("role", "member");

    const result = await addMember({
      body: formData,
    });

    if (result?.success) {
      toast.success(result.message);
      refetch();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Directory</CardTitle>
        <CardDescription>
          View and manage all members of your team. Add, remove, or update
          member information as needed.
        </CardDescription>
        <CardAction>
          <Button onClick={() => setIsModalOpen(true)}>
            <UserPlus2 />
            Add member
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {loading && <div>Loading members...</div>}
        {!loading && (
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
              {!sortedMembers || error || sortedMembers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="text-center"
                  >
                    No members found.
                  </TableCell>
                </TableRow>
              ) : (
                sortedMembers.map((member, idx) => (
                  <TableRow key={member.id || idx}>
                    {/* Use backend fields: user_name, user_email, role */}
                    <TableCell>{member.user_name || "-"}</TableCell>
                    <TableCell>{member.user_email || "-"}</TableCell>
                    <TableCell>{member.role || "-"}</TableCell>
                    <TableCell>
                      <Link to={`edit/${member.id || idx}`}>
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
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onInvite={handleInviteUser}
        projectId={projectId}
      />
    </Card>
  );
}
