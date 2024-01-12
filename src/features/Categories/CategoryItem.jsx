import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function CategoryItem({ categoria, emoji, tareas, id }) {
  CategoryItem.propTypes = {
    id: PropTypes.number.isRequired,
    categoria: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    tareas: PropTypes.string.isRequired,
    color: PropTypes.any,
  };

  const categories = useSelector((state) => state.categories.categories);
  const allTasks = categories.map((category) => category.tasks).flat().length;

  return (
    <li>
      <Link className="contents" to={`/app/tasks/${id}`}>
        <div
          className={`flex h-36 w-36 flex-col justify-between rounded-lg border-s-[6px] border-primary px-4 py-2 shadow-xl`}
        >
          <span className="text-[32px]">{emoji}</span>
          <span className="text-xl font-medium">{categoria}</span>
          <p className="justify-self-end text-grey-darker">
            {Number(id) === 1 ? allTasks : tareas} Tareas
          </p>
        </div>
      </Link>
    </li>
  );
}

export default CategoryItem;
