import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    {
      id: 1,
      categoryName: "Todas las tareas",
      emoji: "🎯",
      tasks: [
        // {
        //   id: "1",
        //   taskText: "Tarea 1",
        //   completed: false,
        //   deadline: "12/02/24",
        // },
        // {
        //   id: "2",
        //   taskText: "Tarea 2",
        //   completed: false,
        //   deadline: "12/02/24",
        // },
        // {
        //   id: "3",
        //   taskText: "Tarea 3",
        //   completed: false,
        //   deadline: "12/02/24",
        // },
      ],
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
      prepare(categoryName, emoji) {
        return {
          payload: { id: Date.now(), categoryName, emoji, tasks: [] },
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
      const { categoryId } = action.payload;
      state.categories = state.categories.filter(
        (category) => category.id !== categoryId,
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
  deleteTask,
  toggleModal,
  toggleCategoryModal,
  toggleTaskModal,
  deleteCategory,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
