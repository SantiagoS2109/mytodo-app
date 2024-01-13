import { CheckCircle, Circle, Trash } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { completeTask, deleteTask } from "../Categories/categoriesSlice";

function TaskItem({ categoryId, task }) {
  TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    categoryId: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  };

  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  console.log(categories);
  console.log(categoryId);

  const currentColor = categories.find(
    (category) => category.id === Number(categoryId),
  )?.color;

  return (
    <li
      className={`flex h-20 items-center gap-4 rounded-md border-s-[5px] p-2 shadow-lg`}
      style={{ borderColor: currentColor }}
    >
      <button onClick={() => dispatch(completeTask(categoryId, task.id))}>
        {task.completed ? (
          <CheckCircle weight="fill" size={32} color={currentColor} />
        ) : (
          <Circle size={32} color={currentColor} />
        )}
      </button>
      <div>
        <span className={`text-xl ${task.completed ? "line-through" : ""}`}>
          {task.taskText}
        </span>
        <p className="text-grey-darker">{task.deadline}</p>
      </div>
      <button
        onClick={() => {
          alert("¿Estás seguro que quieres eliminar esta tarea?");
          dispatch(deleteTask(categoryId, task.id));
        }}
        className="ms-auto text-[#e03131] "
      >
        <Trash size={32} />
      </button>
    </li>
  );
}

export default TaskItem;
