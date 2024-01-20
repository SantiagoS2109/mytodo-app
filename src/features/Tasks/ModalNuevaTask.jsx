import Input from "../ui/Input";
import Button from "../ui/Button";
import { addTask, toggleTaskModal } from "../Categories/categoriesSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { X } from "@phosphor-icons/react";

function ModalNuevaTask() {
  const dispatch = useDispatch();

  const [taskText, setTaskText] = useState("");
  const [deadline, setDeadline] = useState("");

  const { id: categoryId } = useParams();

  function handleSubmit(e) {
    e.preventDefault();

    if (!taskText || !deadline) return;

    dispatch(addTask(categoryId, taskText, deadline));
    dispatch(toggleTaskModal());

    setTaskText("");
    setDeadline("");
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 p-4 backdrop-blur-sm">
      <div className="relative flex h-fit w-96 flex-col justify-center rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-3xl">Nueva Tarea</h2>
        <form className="relative flex flex-col" onSubmit={handleSubmit}>
          <Input
            value={taskText}
            setValue={setTaskText}
            placeholder={"Descripción"}
            style={"mb-4 h-36"}
            type={"textarea"}
          />
          <div className="flex w-full items-center justify-between gap-2">
            <label htmlFor="date">Fecha</label>
            <Input
              name={"date"}
              value={deadline}
              setValue={setDeadline}
              type={"date"}
            />
          </div>

          <Button style="mt-4 bg-primary text-white font-medium text-xl px-6 py-3 outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300 ring-offset-2 rounded-xl hover:bg-primary-darker">
            Enviar
          </Button>
        </form>
        <button
          onClick={() => dispatch(toggleTaskModal())}
          className="absolute right-6 top-6"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}

export default ModalNuevaTask;
