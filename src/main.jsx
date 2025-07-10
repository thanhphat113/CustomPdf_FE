import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";
// import TableDndKit from "./Test.jsx";
import Pdf from "./Pdf.jsx";


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <App />
            <Pdf />
        </Provider>
    </StrictMode>
);
