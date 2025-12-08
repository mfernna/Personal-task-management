import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "./components/Navbar";
import { TaskList } from "./components/TasksList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-orange-200 h-screen">
        <section className="w-[60%] h-full m-auto bg-orange-200">
          <Navbar />
          <TaskList />
        </section>
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
};
