import z from "zod";
import cross from "../assets/x-mark.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/task";
import { toast } from "react-toastify";

interface CreateTaskModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CreateTaskModal = ({
  isOpen,
  setIsOpen,
}: CreateTaskModalProps) => {
  const queryClient = useQueryClient();

  const { mutate: createNewTask } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      reset();
      setIsOpen(false);
      toast.done("Task created successfully");
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const createTaskFormData = z.object({
    title: z.string().min(1, "Title is required").max(50, "Title is too long"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(250, "Description is too long"),
  });

  type taskFormData = z.infer<typeof createTaskFormData>;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<taskFormData>({
    resolver: zodResolver(createTaskFormData),
  });

  const title = watch("title");
  const description = watch("description");

  const onSubmit = () => {
    return createNewTask({ title, description });
  };

  if (!isOpen) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-orange-100 rounded-4xl absolute h-[51%] w-1/4 border z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <button
        onClick={() => setIsOpen(false)}
        className="flex cursor-pointer w-full justify-end px-4 pt-4 hover:scale-101 duration-300"
      >
        <img src={cross} alt="Cross icon" className="size-7" />
      </button>

      <main className="text-lg gap-10 [&>section]:font-light [&>section]:flex [&>section]:flex-col [&_input]:outline-none flex flex-col size-full py-4 px-8">
        <section>
          Name:
          <input
            placeholder="Do the dishes..."
            type="text"
            className="border-b w-4/5 mt-2"
            {...register("title")}
          />
          <p className="text-red-600 text-sm">{errors.title?.message}</p>
        </section>
        <section>
          Description:
          <input
            placeholder="Do not brake anything..."
            type="text"
            className="border-b w-4/5 mt-2"
            {...register("description")}
          />
          <p className="text-red-600 text-sm">{errors.description?.message}</p>
        </section>

        <button
          type="submit"
          className="rounded-2xl flex justify-center py-3 px-5 border bg-amber-200 hover:cursor-pointer hover:scale-105 duration-300 w-1/3 self-center"
        >
          Create
        </button>
      </main>
    </form>
  );
};
