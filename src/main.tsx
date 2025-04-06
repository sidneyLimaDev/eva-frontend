import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import App from "./App";
import "./App.css";
import { EmployeeList } from "./components/Employee/EmployeeList";
import Journey from "./pages/Journey";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<App />} />
          <Route path="/colaboradores" element={<EmployeeList />} />{" "}
          <Route path="/jornadas" element={<Journey />} />{" "}
        </Route>
      </Routes>
    </BrowserRouter>
  );
} else {
  console.error("Root element not found");
}
