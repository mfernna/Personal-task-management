import { Navbar } from "./components/Navbar";
import { TaskList } from "./components/TasksList";

export const App = () => {
  return (
    <div className="bg-orange-200 h-screen">
      <section className="w-[60%] h-full m-auto">
        <Navbar />
        <TaskList />
      </section>
    </div>
  );
};
