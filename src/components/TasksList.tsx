import { TaskCard } from "./TaskCard";
import { getTasks } from "../api/task";
import plus from "../assets/plus.svg";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CreateTaskModal } from "../modals/CreateTaskModal";
import { twMerge } from "tailwind-merge";

export const TaskList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [filter, setFIlter] = useState<boolean>(false);

  const { data: tasks } = useQuery({
    queryKey: ["tasks", search, filter],
    queryFn: () => getTasks(search, filter),
  });

  console.log(tasks);

  return (
    <div className="p-4 h-full flex flex-col [--parent-max-h:50vh] ">
      <CreateTaskModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <section className="flex justify-between border-b mb-10">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Do the dishes..."
          className="border w-1/3 mb-4 rounded-xl bg-orange-100 border-orange-300 outline-none px-4 py-2"
        />
        <section className="flex flex-row gap-6">
          <button
            onClick={() => setFIlter((prev) => !prev)}
            className={twMerge(
              filter
                ? "bg-green-300 border-green-400"
                : "bg-orange-100 border-orange-300",
              "items-center py-3 px-4 cursor-pointer hover:scale-105 duration-300 border rounded-xl mb-4"
            )}
          >
            <p>Completed</p>
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="flex flex-row gap-1 items-center bg-orange-100 py-3 px-2 cursor-pointer hover:scale-105 duration-300 border border-orange-300 rounded-xl mb-4"
          >
            <img src={plus} alt="Plus image" className="size-5" />
            <p>New task</p>
          </button>
        </section>
      </section>
      <section className="h-(--parent-max-h) truncate overflow-y-auto px-2 overflow-hidden">
        {tasks?.length ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p className="flex justify-center">No tasks yet...</p>
        )}
      </section>
    </div>
  );
};
