"use client";

import { useState } from "react";
import { TasksSection } from "@/components/dashboard/leader/TasksSection";
import { TaskModal } from "@/components/dashboard/leader/TaskModal";
import type { CommitteeTask } from "@/components/dashboard/leader/types";

export default function LeaderTasksPage() {
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<CommitteeTask | null>(null);

  const handleOpenCreateTask = () => {
    setTaskToEdit(null);
    setTaskModalOpen(true);
  };

  const handleOpenEditTask = (task: CommitteeTask) => {
    setTaskToEdit(task);
    setTaskModalOpen(true);
  };

  return (
    <div>
      <TasksSection
        onOpenCreateTask={handleOpenCreateTask}
        onEditTask={handleOpenEditTask}
      />

      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}
