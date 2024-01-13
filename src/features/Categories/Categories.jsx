import CategoryItem from "./CategoryItem";
import ModalAgregar from "./ModalAgregar";
import { useDispatch, useSelector } from "react-redux";
import ModalNuevaCategoria from "./ModalNuevaCategoria";
import { toggleModal } from "./categoriesSlice";

function Categories() {
  // const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.username);
  const categories = useSelector((state) => state.categories.categories);
  const isModalOpen = useSelector((state) => state.categories.isModalOpen);
  const isOpenNewCategory = useSelector(
    (state) => state.categories.isNewCategoryFormOpen,
  );

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
        <button
          onClick={() => dispatch(toggleModal())}
          className="h-20 w-20 rounded-full bg-primary text-6xl text-white xl:h-14 xl:w-14 xl:text-4xl"
        >
          +
        </button>
      </div>

      {isModalOpen && !isOpenNewCategory && <ModalAgregar />}

      {isOpenNewCategory && <ModalNuevaCategoria />}
    </>
  );
}

export default Categories;
