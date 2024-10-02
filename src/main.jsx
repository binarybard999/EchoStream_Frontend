import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"

// Import the FontAwesomeIcon component and core functionality
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // fas: Font Awesome Solid
import { far } from '@fortawesome/free-regular-svg-icons'; // far: Font Awesome Regular
import { fab } from '@fortawesome/free-brands-svg-icons'; // fab: Font Awesome Brands

// Add all icons to the library (solid, regular, brands)
library.add(fas, far, fab);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
