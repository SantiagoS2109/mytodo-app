import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Trash } from "@phosphor-icons/react/dist/ssr";

import TaskItem from "./TaskItem";
import ModalNuevaTask from "./ModalNuevaTask";
import Modal from "../ui/Modal";

import { getCategoryById } from "../../toDoSlice";
import DeleteCategory from "../Categories/DeleteCategory";
import Button from "../ui/Button";

function Tasks() {
  const navigate = useNavigate();
  const { id } = useParams();

  const categories = useSelector((state) => state.toDo.categories);
  const currentCategory = getCategoryById(categories, id);

  const allTasks = categories.map((category) => category.tasks).flat();
  const sortedAllTasks = allTasks
    .sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
    .sort((a, b) => a.completed - b.completed);

  const tasks = [...currentCategory.tasks];
  const sortedTasks = tasks
    .sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
    .sort((a, b) => a.completed - b.completed);

  console.log("allTasks", allTasks);

  return (
    <>
      <div>
        <div className="flex justify-between">
          <Button
            className="mb-2 text-6xl font-medium"
            onClick={() => navigate(-1)}
          >
            &larr;
          </Button>

          {id !== "1" && (
            <Modal>
              <Modal.Open name="delete">
                <Button>
                  <Trash size={32} color={"#e03131"} />
                </Button>
              </Modal.Open>
              <Modal.Window name="delete">
                <DeleteCategory id={id} />
              </Modal.Window>
            </Modal>
          )}
        </div>
        <h2 className="text-4xl font-medium">
          {currentCategory.emoji} {currentCategory.categoryName}
        </h2>
      </div>

      <ul className="grid max-h-[310px] grid-cols-1 gap-4 overflow-scroll px-6 py-2">
        {Number(id) === 1 && allTasks.length === 0 && (
          <div className="flex items-center justify-center">
            <span className="text-lg font-medium">
              Aún no hay tareas. Empieza por agregar algunas. 🎯
            </span>
          </div>
        )}

        {Number(id) !== 1 && currentCategory.tasks.length === 0 && (
          <div className="flex items-center justify-center">
            <span className="text-lg font-medium">
              Aún no hay tareas. Empieza por agregar algunas. 🎯
            </span>
          </div>
        )}

        {Number(id) === 1
          ? sortedAllTasks.map((task) => (
              <TaskItem
                categoryId={task.categoryId}
                key={task.id}
                task={task}
              />
            ))
          : sortedTasks.map((task) => (
              <TaskItem categoryId={id} key={task.id} task={task} />
            ))}
      </ul>

      <div className="flex items-end justify-end">
        <Modal>
          <Modal.Open name="newTask">
            <Button
              type="rounded"
              className="h-20 w-20 bg-primary text-6xl text-white xl:h-14 xl:w-14 xl:text-4xl"
            >
              +
            </Button>
          </Modal.Open>
          <Modal.Window name="newTask">
            <ModalNuevaTask />
          </Modal.Window>
        </Modal>
      </div>
    </>
  );
}

export default Tasks;
