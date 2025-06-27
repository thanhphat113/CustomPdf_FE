import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";

// import PreciseDotsLine from './App.jsx'
// import SnapWithGuides from './App.jsx'
// import SmartInsertLine from './App.jsx'
// import SnapInsertDemo from './App.jsx'

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
