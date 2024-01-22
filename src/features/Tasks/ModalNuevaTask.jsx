import Input from "../ui/Input";
import Button from "../ui/Button";
import { addTask } from "../../toDoSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

function ModalNuevaTask({ onCloseModal }) {
  ModalNuevaTask.propTypes = {
    onCloseModal: PropTypes.func,
  };

  const dispatch = useDispatch();

  const [taskText, setTaskText] = useState("");
  const [deadline, setDeadline] = useState("");

  const { id: categoryId } = useParams();

  function handleSubmit(e) {
    e.preventDefault();

    if (!taskText || !deadline) return;

    dispatch(addTask(categoryId, taskText, deadline));
    onCloseModal();

    setTaskText("");
    setDeadline("");
  }

  return (
    <div className="flex w-72 flex-col justify-center">
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

        <Button className="mt-4 rounded-xl bg-primary px-6 py-3 text-xl font-medium text-white outline-none ring-offset-2 transition-all duration-300 hover:bg-primary-darker focus:ring-2 focus:ring-primary focus:ring-opacity-50">
          Enviar
        </Button>
      </form>
    </div>
  );
}

export default ModalNuevaTask;
