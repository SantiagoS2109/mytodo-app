import { CheckCircle, Circle, Trash } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { completeTask, deleteTask } from "../../toDoSlice";
import Button from "../ui/Button";
import { useParams } from "react-router-dom";

function TaskItem({ categoryId, task }) {
  TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    categoryId: PropTypes.string.isRequired,
  };

  const categories = useSelector((state) => state.toDo.categories);
  const dispatch = useDispatch();
  const { id } = useParams();

  const pastDeadline = new Date(task.deadline + "T13:00:00.000Z") < new Date();

  const currentColor = categories.find(
    (category) => category.id === Number(categoryId),
  )?.color;

  const categoryName = categories.find(
    (category) => category.id === Number(categoryId),
  )?.categoryName;

  console.log(categoryId, id);

  return (
    <li
      className={`flex h-20 items-center gap-4 rounded-md border-s-[5px] p-2 shadow-lg`}
      style={{ borderColor: currentColor }}
    >
      <Button onClick={() => dispatch(completeTask(categoryId, task.id))}>
        {task.completed ? (
          <CheckCircle weight="fill" size={32} color={currentColor} />
        ) : (
          <Circle size={32} color={currentColor} />
        )}
      </Button>
      <div>
        <span
          className={`text-xl ${task.completed ? "line-through" : ""} ${
            pastDeadline ? "text-red-600" : ""
          }`}
        >
          {task.taskText}
        </span>
        <p className={`text-grey-darker ${pastDeadline ? "text-red-600" : ""}`}>
          {task.deadline}
        </p>
        <p className="text-sm font-medium " style={{ color: currentColor }}>
          {Number(categoryId) !== Number(id) && categoryName}
        </p>
      </div>
      <Button
        onClick={() => {
          dispatch(deleteTask(categoryId, task.id));
        }}
        className="ms-auto text-[#e03131] "
      >
        <Trash size={32} />
      </Button>
    </li>
  );
}

export default TaskItem;
