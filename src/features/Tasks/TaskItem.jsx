import { Circle, Trash } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteTask } from "../Categories/categoriesSlice";

function TaskItem({ categoryId, task }) {
  TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    categoryId: PropTypes.string.isRequired,
  };

  const dispatch = useDispatch();

  return (
    <li className="flex h-20 items-center gap-4 rounded-md border-s-[5px] border-primary p-2 shadow-lg">
      <button>
        <Circle size={32} color="#1D6D81" />
      </button>
      <div>
        <span className="text-xl">{task.taskText}</span>
        <p className="text-grey-darker">{task.deadline}</p>
      </div>
      <button
        onClick={() => {
          alert("¿Estás seguro que quieres eliminar esta tarea?");
          dispatch(deleteTask(categoryId, task.id));
        }}
        className="ms-auto"
      >
        <Trash size={32} color="#e03131" />
      </button>
    </li>
  );
}

export default TaskItem;
