import { useMutation } from "@tanstack/react-query";
import { deleteTask, updateTaskStatus, type TasksBase } from "../api/task";
import check from "../assets/check.svg";
import trash from "../assets/trash.svg";
import { toast } from "react-toastify";

interface TaskCardProps {
  task: TasksBase;
}

const status = {
  COMPLETED: "COMPLETED",
  INCOMPLETED: "INCOMPLETED",
} as const;

export const TaskCard = ({ task }: TaskCardProps) => {
  const { mutate: deleteCurrentTask } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.done("Task deleted successfully");
    },
    onError: () => {},
  });

  const { mutate: updateTask } = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => {
      toast.done("Task updated successfully");
    },
    onError: () => {},
  });

  return (
    <div className="border border-slate-300 p-6 rounded-xl shadow bg-orange-100 mb-4">
      <section className="flex justify-between items-center [&>span]:text-md">
        <span>{task.title}</span>
        <span className="max-w-[20%] whitespace-nowrap truncate">
          {task.description}
        </span>
        <span className="[&>p]:flex [&>p]:w-full">
          {task.completed ? (
            <p className="rounded-xl p-2 bg-green-400">{status.COMPLETED}</p>
          ) : (
            <p className="rounded-xl p-2 bg-red-400">{status.INCOMPLETED}</p>
          )}
        </span>
        <section className="[&>button]:cursor-pointer [&>button]:hover:scale-105 flex justify-between w-40">
          {task.completed ? (
            <></>
          ) : (
            <button
              onClick={() => {
                updateTask(task.id);
              }}
            >
              <img src={check} alt="Check icon" className="size-7" />
            </button>
          )}

          <button onClick={() => deleteCurrentTask(task.id)}>
            <img src={trash} alt="trash icon" className="size-7" />
          </button>
        </section>
      </section>
    </div>
  );
};
