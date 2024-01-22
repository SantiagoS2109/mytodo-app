import { useDispatch } from "react-redux";
import { deleteCategory } from "../../toDoSlice";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../ui/Button";

function DeleteCategory({ onCloseModal, id }) {
  DeleteCategory.propTypes = {
    onCloseModal: PropTypes.func,
    id: PropTypes.string.isRequired,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex w-72 flex-col items-center justify-center">
      <h2 className="text-center text-xl ">
        ¿Estás seguro de que quieres{" "}
        <span className="font-medium text-red-500">eliminar</span> esta
        categoría?
      </h2>
      <div className="mt-4 flex items-center justify-center gap-2">
        <Button
          onClick={() => {
            dispatch(deleteCategory(id));
            navigate("/app");
          }}
          className="w-16 rounded-md border border-primary bg-white px-4 py-2 font-bold text-primary transition-all duration-300 hover:bg-primary-darker hover:text-white"
        >
          Sí
        </Button>
        <Button
          onClick={onCloseModal}
          className="w-16 rounded-md border  bg-primary px-4 py-2 font-bold text-white transition-all duration-300 hover:bg-primary-darker"
        >
          No
        </Button>
      </div>
    </div>
  );
}

export default DeleteCategory;
