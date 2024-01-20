// import Homepage from "./features/User/Homepage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Categories from "./features/Categories/Categories";
import Homepage from "./features/User/Homepage";
import AppLayout from "./AppLayout";
import Tasks from "./features/Tasks/Tasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Homepage />}></Route>
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Categories />}></Route>
          <Route path="tasks/:id" element={<Tasks />}></Route>
        </Route>
        <Route path="*" element={<h1>404</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
