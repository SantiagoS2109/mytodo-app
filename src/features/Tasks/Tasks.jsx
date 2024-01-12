import { useNavigate, useParams } from "react-router-dom";
import TaskItem from "./TaskItem";
import {
  getCategoryById,
  toggleTaskModal,
} from "../Categories/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import ModalNuevaTask from "./ModalNuevaTask";

function Tasks() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories);
  const currentCategory = getCategoryById(categories, id);

  const allTasks = categories.map((category) => category.tasks).flat();

  console.log(allTasks);
  console.log(currentCategory);

  const isNewTaskFormOpen = useSelector(
    (state) => state.categories.isNewTaskFormOpen,
  );

  return (
    <>
      <div>
        <button
          className="mb-2 text-6xl font-medium"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr;
        </button>
        <h2 className="text-4xl font-medium">
          {currentCategory.emoji} {currentCategory.categoryName}
        </h2>
      </div>

      <ul className="grid  max-h-[310px] grid-cols-1 gap-4 overflow-scroll p-2">
        {Number(id) === 1
          ? allTasks.map((task) => (
              <TaskItem categoryId={id} key={task.id} task={task} />
            ))
          : currentCategory.tasks.map((task) => (
              <TaskItem categoryId={id} key={task.id} task={task} />
            ))}
      </ul>

      <div className="flex items-end justify-end">
        <button
          onClick={() => dispatch(toggleTaskModal())}
          className="h-20 w-20 rounded-full bg-primary text-6xl text-white xl:h-14 xl:w-14 xl:text-4xl"
        >
          +
        </button>
      </div>

      {isNewTaskFormOpen && <ModalNuevaTask />}
    </>
  );
}

export default Tasks;
