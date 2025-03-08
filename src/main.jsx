import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { OrderProvider } from "../context/OrderContext.jsx";
import { FavoritProvider} from "../context/Favorit.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <OrderProvider>
      <FavoritProvider>
      <App />
      </FavoritProvider>
    </OrderProvider>
  </BrowserRouter>
);
