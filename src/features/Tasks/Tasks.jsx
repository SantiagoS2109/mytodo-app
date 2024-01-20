import { useNavigate, useParams } from "react-router-dom";
import TaskItem from "./TaskItem";
import {
  deleteCategory,
  getCategoryById,
  toggleTaskModal,
} from "../Categories/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import ModalNuevaTask from "./ModalNuevaTask";
import { Trash } from "@phosphor-icons/react/dist/ssr";

function Tasks() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories);
  const currentCategory = getCategoryById(categories, id);

  const allTasks = categories.map((category) => category.tasks).flat();

  const isNewTaskFormOpen = useSelector(
    (state) => state.categories.isNewTaskFormOpen,
  );

  return (
    <>
      <div>
        <div className="flex justify-between">
          <button
            className="mb-2 text-6xl font-medium"
            onClick={() => navigate(-1)}
          >
            &larr;
          </button>

          <button
            onClick={() => {
              dispatch(deleteCategory(id));
              navigate("/app");
            }}
          >
            <Trash size={32} color={"#9b1212"} />
          </button>
        </div>
        <h2 className="text-4xl font-medium">
          {currentCategory.emoji} {currentCategory.categoryName}
        </h2>
      </div>

      <ul className="grid max-h-[310px] grid-cols-1 gap-4 overflow-scroll p-2">
        {currentCategory.tasks.length === 0 && (
          <div className="flex items-center justify-center">
            <span className="text-lg font-medium">
              Aún no hay tareas. Empieza por agregar algunas. 🎯
            </span>
          </div>
        )}

        {Number(id) === 1
          ? allTasks.map((task) => (
              <TaskItem
                categoryId={id}
                key={task.id}
                task={task}
                color={currentCategory.color}
              />
            ))
          : currentCategory.tasks.map((task) => (
              <TaskItem
                categoryId={id}
                key={task.id}
                task={task}
                color={currentCategory.color}
              />
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
