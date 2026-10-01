"use client";

import { useState } from "react";
import { useLeaderDashboard } from "./LeaderDashboardContext";
import type { CommitteeTask, TaskPriority, TaskStatus } from "./types";
import { X, CheckSquare, Calendar } from "lucide-react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: CommitteeTask | null;
}

interface TaskFormProps {
  taskToEdit?: CommitteeTask | null;
  onClose: () => void;
}

function TaskForm({ taskToEdit, onClose }: TaskFormProps) {
  const { addTask, updateTask, members, canManageTasks } =
    useLeaderDashboard();

  const [title, setTitle] = useState(taskToEdit?.title ?? "");
  const [description, setDescription] = useState(taskToEdit?.description ?? "");
  const [assignedMemberId, setAssignedMemberId] = useState(
    taskToEdit?.assignedMemberId ?? members[0]?.id ?? ""
  );
  const [dueDate, setDueDate] = useState(taskToEdit?.dueDate ?? "Oct 20, 2026");
  const [priority, setPriority] = useState<TaskPriority>(
    taskToEdit?.priority ?? "Medium"
  );
  const [status, setStatus] = useState<TaskStatus>(taskToEdit?.status ?? "To Do");

  const [touched, setTouched] = useState<{
    title?: boolean;
    assignedMemberId?: boolean;
    dueDate?: boolean;
  }>({});
  const [generalError, setGeneralError] = useState("");

  const validateTitle = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return "Task title is required.";
    if (trimmed.length < 3) return "Task title must be at least 3 characters.";
    if (trimmed.length > 150) return "Task title cannot exceed 150 characters.";
    return "";
  };

  const validateAssigned = (val: string) => {
    if (!val) return "Please select a member to assign this task.";
    return "";
  };

  const validateDueDate = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return "Due date is required.";
    return "";
  };

  const titleError = touched.title ? validateTitle(title) : "";
  const assignedError = touched.assignedMemberId ? validateAssigned(assignedMemberId) : "";
  const dueDateError = touched.dueDate ? validateDueDate(dueDate) : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ title: true, assignedMemberId: true, dueDate: true });

    const tErr = validateTitle(title);
    const aErr = validateAssigned(assignedMemberId);
    const dErr = validateDueDate(dueDate);

    if (tErr || aErr || dErr) {
      setGeneralError("Please resolve the required fields before saving.");
      return;
    }

    const assigned = members.find((m) => m.id === assignedMemberId);
    const assignedName = assigned ? assigned.name : "Unassigned";

    if (taskToEdit) {
      updateTask(taskToEdit.id, {
        title: title.trim(),
        description: description.trim(),
        assignedMemberId,
        assignedMemberName: assignedName,
        dueDate: dueDate.trim(),
        priority,
        status,
      });
    } else {
      addTask({
        title: title.trim(),
        description: description.trim(),
        assignedMemberId,
        assignedMemberName: assignedName,
        createdBy: "Shahad",
        dueDate: dueDate.trim(),
        priority,
        status,
      });
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
            <CheckSquare className="size-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">
              {taskToEdit ? "Edit Task" : "Create New Task"}
            </h2>
            <p className="text-xs text-muted">
              Assign and track tasks for the Data Analysis committee members.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-muted hover:bg-surface-muted hover:text-foreground"
        >
          <X className="size-5" />
        </button>
      </div>

      {!canManageTasks && (
        <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-300">
          You currently have a restricted role. You need Leader, Co-Leader, or Temporary Elevated permissions to assign or modify tasks.
        </div>
      )}

      {generalError && (
        <div className="mt-4 rounded-xl border border-rose-500/20 bg-rose-50/20 p-3 text-xs text-rose-600 dark:bg-rose-950/20 dark:text-rose-400">
          {generalError}
        </div>
      )}

      <div className="mt-4 space-y-4">
        {/* Task Title */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-foreground">
              Task Title *
            </label>
            <span className="text-[10px] text-muted">
              {title.length}/150
            </span>
          </div>
          <input
            type="text"
            value={title}
            maxLength={150}
            onChange={(e) => {
              setTitle(e.target.value);
              if (generalError) setGeneralError("");
            }}
            onBlur={() => setTouched((p) => ({ ...p, title: true }))}
            placeholder="e.g. Export and analyze Study Jam registrations"
            className={`mt-1 h-10 w-full rounded-xl border px-3 text-sm text-foreground outline-none transition ${
              titleError
                ? "border-rose-500 bg-rose-50/20 dark:bg-rose-950/20 focus:border-rose-600"
                : "border-border bg-surface-muted/30 focus:border-blue-500"
            }`}
          />
          {titleError && (
            <p className="mt-1 text-[11px] font-medium text-rose-600 dark:text-rose-400">
              {titleError}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-foreground">
              Description (Optional)
            </label>
            <span className="text-[10px] text-muted">
              {description.length}/500
            </span>
          </div>
          <textarea
            rows={3}
            value={description}
            maxLength={500}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide context, acceptance criteria, or relevant links..."
            className="mt-1 w-full rounded-xl border border-border bg-surface-muted/30 p-3 text-sm text-foreground outline-none focus:border-blue-500"
          />
        </div>

        {/* Assignment Control */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-foreground">
              Assign To *
            </label>
            {members.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setAssignedMemberId(members[0].id);
                  if (generalError) setGeneralError("");
                }}
                className="text-[11px] font-semibold text-blue-600 hover:underline dark:text-blue-400"
              >
                Assign to me
              </button>
            )}
          </div>
          <select
            value={assignedMemberId}
            onChange={(e) => {
              setAssignedMemberId(e.target.value);
              if (generalError) setGeneralError("");
            }}
            onBlur={() => setTouched((p) => ({ ...p, assignedMemberId: true }))}
            className={`mt-1 h-10 w-full rounded-xl border px-3 text-sm text-foreground outline-none transition cursor-pointer ${
              assignedError
                ? "border-rose-500 bg-rose-50/20 dark:bg-rose-950/20 focus:border-rose-600"
                : "border-border bg-surface-muted/30 focus:border-blue-500"
            }`}
          >
            <option value="">Select Member</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.role})
              </option>
            ))}
          </select>
          {assignedError && (
            <p className="mt-1 text-[11px] font-medium text-rose-600 dark:text-rose-400">
              {assignedError}
            </p>
          )}
        </div>

        {/* Due date, Priority & Status */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-foreground">
              Due Date *
            </label>
            <div className="relative mt-1">
              <Calendar className="pointer-events-none absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={dueDate}
                maxLength={40}
                onChange={(e) => {
                  setDueDate(e.target.value);
                  if (generalError) setGeneralError("");
                }}
                onBlur={() => setTouched((p) => ({ ...p, dueDate: true }))}
                placeholder="e.g. Oct 20"
                className={`h-10 w-full rounded-xl border ps-8 pe-2 text-xs text-foreground outline-none transition ${
                  dueDateError
                    ? "border-rose-500 bg-rose-50/20 dark:bg-rose-950/20 focus:border-rose-600"
                    : "border-border bg-surface-muted/30 focus:border-blue-500"
                }`}
              />
            </div>
            {dueDateError && (
              <p className="mt-1 text-[10px] font-medium text-rose-600 dark:text-rose-400">
                {dueDateError}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="mt-1 h-10 w-full rounded-xl border border-border bg-surface-muted/30 px-2 text-xs text-foreground outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="mt-1 h-10 w-full rounded-xl border border-border bg-surface-muted/30 px-2 text-xs text-foreground outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Modal Actions */}
      <div className="mt-6 flex items-center justify-end gap-3 border-t border-border pt-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-surface-muted transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!canManageTasks}
          className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95 disabled:opacity-50"
        >
          {taskToEdit ? "Save Changes" : "Create Task"}
        </button>
      </div>
    </form>
  );
}

export function TaskModal({ isOpen, onClose, taskToEdit }: TaskModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-2xl">
        <TaskForm
          key={taskToEdit?.id ?? "new"}
          taskToEdit={taskToEdit}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
