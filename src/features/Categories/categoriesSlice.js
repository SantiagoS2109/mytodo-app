import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    {
      id: 1,
      categoryName: "Todas las tareas",
      emoji: "🎯",
      tasks: [],
      color: "",
    },
  ],
  isModalOpen: false,
  isNewCategoryFormOpen: false,
  isNewTaskFormOpen: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: {
      prepare(categoryName, emoji, color) {
        return {
          payload: { id: Date.now(), categoryName, emoji, tasks: [], color },
        };
      },

      reducer(state, action) {
        state.categories.push(action.payload);
      },
    },

    addTask: {
      prepare(categoryId, taskText, deadline) {
        return {
          payload: {
            id: Date.now(),
            categoryId,
            taskText,
            deadline,
            completed: false,
          },
        };
      },

      reducer(state, action) {
        const { categoryId, taskText, deadline, completed, id } =
          action.payload;
        const existingCategory = state.categories.find(
          (category) => category.id === Number(categoryId),
        );

        if (existingCategory) {
          existingCategory.tasks.push({
            id,
            taskText,
            deadline,
            completed,
          });
        }
      },
    },

    deleteTask: {
      prepare(categoryId, taskId) {
        return {
          payload: { categoryId, taskId },
        };
      },

      reducer(state, action) {
        const { categoryId, taskId } = action.payload;
        const existingCategory = state.categories.find(
          (category) => category.id === Number(categoryId),
        );

        if (existingCategory) {
          existingCategory.tasks = existingCategory.tasks.filter(
            (task) => task.id !== taskId,
          );
        }
      },
    },

    completeTask: {
      prepare(categoryId, taskId) {
        return {
          payload: { categoryId, taskId },
        };
      },

      reducer(state, action) {
        const { categoryId, taskId } = action.payload;
        const existingCategory = state.categories.find(
          (category) => category.id === Number(categoryId),
        );

        if (existingCategory) {
          const existingTask = existingCategory.tasks.find(
            (task) => task.id === taskId,
          );

          if (existingTask) {
            existingTask.completed = !existingTask.completed;
          }
        }
      },
    },

    toggleCategoryModal(state) {
      state.isNewCategoryFormOpen = !state.isNewCategoryFormOpen;
    },
    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen;
    },
    toggleTaskModal(state) {
      state.isNewTaskFormOpen = !state.isNewTaskFormOpen;
    },

    deleteCategory(state, action) {
      const categoryId = action.payload;

      state.categories = state.categories.filter(
        (category) => category.id !== Number(categoryId),
      );
    },
  },
});

export function getCategoryById(state, categoryId) {
  return state.find((category) => category.id === Number(categoryId));
}

export const {
  addCategory,
  addTask,
  completeTask,
  deleteTask,
  toggleModal,
  toggleCategoryModal,
  toggleTaskModal,
  deleteCategory,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
