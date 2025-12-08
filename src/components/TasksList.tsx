import { TaskCard } from "./TaskCard";
import { getTasks } from "../api/task";
import plus from "../assets/plus.svg";
import { useQuery } from "@tanstack/react-query";

export const TaskList = () => {
  const { data: taskList } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  return (
    <div className="p-4">
      <section className="flex justify-end border-b mb-10">
        <button className="flex flex-row gap-1 items-center bg-orange-100 py-3 px-2 cursor-pointer hover:scale-105 duration-300 border border-orange-300 rounded-xl mb-4">
          <img src={plus} alt="Plus image" className="size-5" />
          <p>New task</p>
        </button>
      </section>
      {taskList ? (
        taskList.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <p className="flex justify-center">No tasks yet...</p>
      )}
    </div>
  );
};
