"use client";

import { useState } from "react";
import { TasksSection } from "../TasksSection";
import { TaskModal } from "../TaskModal";
import type { CommitteeTask } from "../types";

export function CommitteeTasksPage() {
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<CommitteeTask | null>(null);

  const openCreateTask = () => {
    setTaskToEdit(null);
    setTaskModalOpen(true);
  };

  const openEditTask = (task: CommitteeTask) => {
    setTaskToEdit(task);
    setTaskModalOpen(true);
  };

  return (
    <div>
      <TasksSection onOpenCreateTask={openCreateTask} onEditTask={openEditTask} />
      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}
