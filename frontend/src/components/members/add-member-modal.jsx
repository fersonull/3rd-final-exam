import { useState, useEffect } from "react";
import { Search, UserPlus, Loader2 } from "lucide-react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useFetch } from "@/hooks/use-fetch";

export function AddMemberModal({ isOpen, onClose, onInvite, projectId }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isInviting, setIsInviting] = useState(false);

  const { data: searchResults, loading: searchLoading } = useFetch(
    searchQuery.length >= 2
      ? `/users/search?q=${encodeURIComponent(searchQuery)}`
      : null
  );

  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setSelectedUser(null);
    }
  }, [isOpen]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setSelectedUser(null);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleInvite = async () => {
    if (!selectedUser || !projectId) return;

    setIsInviting(true);
    try {
      await onInvite(selectedUser, projectId);
      onClose();
    } catch (error) {
      console.error("Failed to invite user:", error);
      alert(`Failed to invite user: ${error.message}`);
    } finally {
      setIsInviting(false);
    }
  };

  const users = searchResults?.data || [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Team Member"
      className="max-w-lg"
    >
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
          {searchLoading && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>

        {/* Search Results */}
        {searchQuery.length >= 2 && (
          <div className="max-h-60 overflow-y-auto border rounded-md bg-background">
            {users.length === 0 && !searchLoading ? (
              <div className="p-4 text-center text-muted-foreground">
                No users found matching "{searchQuery}"
              </div>
            ) : (
              users.map((user) => (
                <div
                  key={user.id}
                  className={[
                    "p-3 border-b last:border-b-0 cursor-pointer",
                    "hover:bg-accent hover:text-accent-foreground",
                    selectedUser?.id === user.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-background",
                  ].join(" ")}
                  onClick={() => handleUserSelect(user)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                    {selectedUser?.id === user.id && (
                      <div className="text-primary">
                        <UserPlus className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Selected User */}
        {selectedUser && (
          <div className="p-4 bg-accent border border-accent rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">
                  {selectedUser.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedUser.email}
                </div>
              </div>
              <Button onClick={handleInvite} disabled={isInviting}>
                {isInviting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Inviting...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Instructions */}
        {searchQuery.length < 2 && (
          <div className="text-center text-muted-foreground py-8">
            <UserPlus className="h-12 w-12 mx-auto mb-4 text-muted" />
            <p>Start typing to search for users by name or email</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
