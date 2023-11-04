import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthContext } from "@/context/AuthContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ChakraProvider>
            <BrowserRouter>
                <AuthContext>
                    <App />
                </AuthContext>
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>
);
