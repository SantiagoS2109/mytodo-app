import { useSelector } from "react-redux";

import CategoryItem from "./CategoryItem";
import ModalNuevaCategoria from "./ModalNuevaCategoria";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

function Categories() {
  const username = useSelector((state) => state.user.username);
  const categories = useSelector((state) => state.toDo.categories);

  return (
    <>
      <div className="h-fit">
        <h2 className="text-3xl font-medium ">¿Qué onda, {username}?</h2>
        <h3 className="mt-2 text-2xl">Categorias</h3>
      </div>

      <ul className="grid h-[460px] grid-cols-2 gap-x-6 gap-y-12 overflow-scroll sm:grid-cols-3 md:h-[340px] md:gap-x-0 md:gap-y-0">
        {categories.map((categoria) => (
          <CategoryItem
            key={categoria.id}
            id={categoria.id}
            categoria={categoria.categoryName}
            emoji={categoria.emoji}
            tareas={categoria.tasks.length}
            color={categoria.color}
          />
        ))}
      </ul>

      <div className="flex items-end justify-end">
        <Modal>
          <Modal.Open name="newCategory">
            <Button
              type="rounded"
              className="h-20 w-20 bg-primary text-6xl text-white xl:h-14 xl:w-14 xl:text-4xl"
            >
              +
            </Button>
          </Modal.Open>
          <Modal.Window name="newCategory">
            <ModalNuevaCategoria />
          </Modal.Window>
        </Modal>
      </div>
    </>
  );
}

export default Categories;
