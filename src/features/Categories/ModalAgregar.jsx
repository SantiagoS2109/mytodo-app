import { useDispatch } from "react-redux";
import { toggleCategoryModal, toggleModal } from "./categoriesSlice";

function ModalAgregar() {
  const dispatch = useDispatch();

  return (
    <div className="absolute bottom-[130px] right-6 h-32 w-1/2 rounded-md bg-slate-100 shadow-lg">
      <ul className="flex h-full w-full flex-col items-center justify-center gap-3 p-4">
        <li className="w-full rounded-sm border-s-4 border-primary bg-white p-2 ">
          <button
            onClick={() => {
              dispatch(toggleCategoryModal());
              dispatch(toggleModal());
            }}
          >
            Agregar categoria
          </button>
        </li>
        <li className="w-full rounded-sm border-s-4 border-primary bg-white p-2 ">
          <button>Agregar tarea</button>
        </li>
      </ul>
    </div>
  );
}

export default ModalAgregar;
