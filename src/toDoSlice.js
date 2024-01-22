import { createSlice } from "@reduxjs/toolkit";

const storedValue = localStorage.getItem("toDoStorage");

let initialState = {};

storedValue
  ? (initialState = JSON.parse(storedValue))
  : (initialState = {
      categories: [
        {
          id: 1,
          categoryName: "Todas las tareas",
          emoji: "🎯",
          tasks: [],
          color: "#1D6D81",
        },
      ],
    });

const toDoSlice = createSlice({
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

        localStorage.setItem("toDoStorage", JSON.stringify(state));
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
            categoryId,
            taskText,
            deadline,
            completed,
          });

          localStorage.setItem("toDoStorage", JSON.stringify(state));
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

          localStorage.setItem("toDoStorage", JSON.stringify(state));
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

            localStorage.setItem("toDoStorage", JSON.stringify(state));
          }
        }
      },
    },

    deleteCategory(state, action) {
      const categoryId = action.payload;

      state.categories = state.categories.filter(
        (category) => category.id !== Number(categoryId),
      );

      localStorage.setItem("toDoStorage", JSON.stringify(state));
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
  deleteCategory,
} = toDoSlice.actions;

export default toDoSlice.reducer;
