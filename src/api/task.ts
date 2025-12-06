import { api } from "./axios";

export interface Tasks {
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

export const getTasks = async () => {
  const response = await api.get<Tasks[]>("/tasks/");

  return response.data;
};

export const updateTask = async (payload: UpdateTaskPayload) => {
  const response = await api.put<Tasks>(`/tasks/${payload.id}/`, payload);

  return response.data;
};

export const createTask = async (payload: Omit<Tasks, "id">) => {
  const response = await api.post<Tasks>("/tasks/", payload);

  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await api.delete(`/tasks/${id}/`);

  return response.data;
};
