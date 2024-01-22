import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function CategoryItem({ categoria, emoji, tareas, id, color }) {
  CategoryItem.propTypes = {
    id: PropTypes.number.isRequired,
    categoria: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    tareas: PropTypes.number.isRequired,
    color: PropTypes.any,
  };

  const categories = useSelector((state) => state.toDo.categories);
  const allTasks = categories.map((category) => category.tasks).flat().length;

  return (
    <li>
      <Link className="contents" to={`/app/tasks/${id}`}>
        <div
          className={`flex h-32 w-32 flex-col justify-between rounded-lg border-s-[6px] px-4 py-2 shadow-xl sm:h-40 sm:w-40`}
          style={{ borderColor: `${color ? color : "#1D6D81"}` }}
        >
          <span className="text-[32px]">{emoji}</span>
          <span className="text-md font-medium sm:text-xl">{categoria}</span>
          <p className="justify-self-end text-xs font-light text-grey-darker sm:text-base">
            {Number(id) === 1 ? allTasks : tareas} Tareas
          </p>
        </div>
      </Link>
    </li>
  );
}

export default CategoryItem;
