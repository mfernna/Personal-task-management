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

export const getTasks = async () => {
  const response = await api.get<TasksBase[]>("/tasks");

  return response.data;
};

export const updateTask = async (payload: UpdateTaskPayload) => {
  const response = await api.put<TasksBase>(`/tasks/${payload.id}/`, payload);

  return response.data;
};

export const updateTaskStatus = async (id: number) => {
  const response = await api.put<TasksBase>(`/tasks/${id}/`);

  return response.data;
};

export const createTask = async (payload: Task) => {
  const response = await api.post<TasksBase>("/tasks/", payload);

  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await api.delete(`/tasks/${id}/`);

  return response.data;
};
