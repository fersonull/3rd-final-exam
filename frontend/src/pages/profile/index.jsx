import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Shield,
  Settings,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 2023",
    role: "Project Manager",
    avatar: null,
    bio: "Experienced project manager with a passion for team collaboration and efficient workflow management.",
    skills: [
      "Project Management",
      "Team Leadership",
      "Agile",
      "Communication",
      "Problem Solving",
    ],
  });

  const [editForm, setEditForm] = useState(profile);

  const handleEdit = () => {
    setEditForm(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-8">
        <div className="max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">
              Manage your account settings and profile information
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Overview */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="relative inline-block mx-auto">
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback className="text-2xl">
                        {profile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                        variant="secondary"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <CardTitle className="text-xl">{profile.name}</CardTitle>
                  <CardDescription>{profile.role}</CardDescription>
                  <Badge variant="secondary" className="mt-2">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Joined {profile.joinDate}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal information and preferences
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button size="sm" onClick={handleSave}>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancel}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={handleEdit}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={editForm.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                        />
                      ) : (
                        <p className="text-sm py-2">{profile.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editForm.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                        />
                      ) : (
                        <p className="text-sm py-2">{profile.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={editForm.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                        />
                      ) : (
                        <p className="text-sm py-2">{profile.phone}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      {isEditing ? (
                        <Input
                          id="location"
                          value={editForm.location}
                          onChange={(e) =>
                            handleInputChange("location", e.target.value)
                          }
                        />
                      ) : (
                        <p className="text-sm py-2">{profile.location}</p>
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <textarea
                        id="bio"
                        className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md resize-none"
                        value={editForm.bio}
                        onChange={(e) =>
                          handleInputChange("bio", e.target.value)
                        }
                      />
                    ) : (
                      <p className="text-sm py-2">{profile.bio}</p>
                    )}
                  </div>

                  {/* Role */}
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    {isEditing ? (
                      <Input
                        id="role"
                        value={editForm.role}
                        onChange={(e) =>
                          handleInputChange("role", e.target.value)
                        }
                      />
                    ) : (
                      <p className="text-sm py-2">{profile.role}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Account Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account preferences and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Change Password</p>
                      <p className="text-sm text-muted-foreground">
                        Update your account password
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Two-Factor Authentication</p>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Delete Account</p>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
