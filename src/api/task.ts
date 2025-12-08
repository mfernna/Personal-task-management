import { api } from "./axios";

export interface TasksBase {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
interface UpdateTaskPayload {
  id: number;
  title?: string;
  description?: string;
  completed?: boolean;
}
export type Task = Omit<TasksBase, "id">;
type TaskCreateType = Omit<TasksBase, "id" | "completed">;

export const getTasks = async (title?: string, completed?: boolean) => {
  let response;

  if (title && completed) {
    response = await api.get<TasksBase[]>(`/tasks?title=${title}&completed=1`);
  } else if (title) {
    response = await api.get<TasksBase[]>(`/tasks?title=${title}`);
  } else if (completed) {
    response = await api.get<TasksBase[]>(`/tasks?completed=1`);
  } else {
    response = await api.get<TasksBase[]>("/tasks");
  }

  return response.data;
};

export const updateTask = async (payload: UpdateTaskPayload) => {
  const response = await api.put<TasksBase>(`/tasks/${payload.id}`, payload);

  return response.data;
};

export const updateTaskStatus = async (id: number) => {
  const response = await api.put<TasksBase>(`/tasks/${id}`, {
    completed: true,
  });

  return response.data;
};

export const createTask = async (payload: TaskCreateType) => {
  const response = await api.post<TasksBase>("/tasks", payload);

  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await api.delete(`/tasks/${id}`);

  return response.data;
};
