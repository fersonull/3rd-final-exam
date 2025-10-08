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
import { UserPlus2 } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function MembersTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Directory</CardTitle>
        <CardDescription>
          View and manage all members of your team. Add, remove, or update
          member information as needed.
        </CardDescription>

        <CardAction>
          <Link to="/members/new-member">
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
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyMembers.map((member, idx) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
