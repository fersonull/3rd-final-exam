import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function NewMemberForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active"
  });

  const [submitted, setSubmitted] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (value) => {
    setForm((prev) => ({
      ...prev,
      role: value
    }));
  };

  const handleStatusChange = (value) => {
    setForm((prev) => ({
      ...prev,
      status: value
    }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    // Simple email regex for demo purposes
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email))
      errs.email = "Invalid email";
    if (!form.role) errs.role = "Role is required";
    if (!form.status) errs.status = "Status is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // This is where you would normally POST data to the backend.
      setSubmitted(true);
      // Simulate clear or redirect as needed.
    }
  };

  return (
    <div >
      <h1 className="text-xl font-bold mb-4">Add New Member</h1>
      {submitted ? (
        <div className="p-4 mb-2 bg-green-50 rounded text-green-800 font-medium">
          Member added! (Demo: form submitted)
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter member name"
              autoComplete="off"
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              autoComplete="off"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select value={form.role} onValueChange={handleRoleChange}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Member">Member</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Guest">Guest</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-red-600 text-sm">{errors.role}</p>}
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={form.status} onValueChange={handleStatusChange}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && <p className="text-red-600 text-sm">{errors.status}</p>}
          </div>
          <Button type="submit" className="w-full">
            Add member
          </Button>
        </form>
      )}
    </div>
  );
}