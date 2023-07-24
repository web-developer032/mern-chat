import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home/Home";
import Chat from "@/pages/Chat/Chat";

function App() {
    return (
        <section className="main-container">
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/About" Component={() => <div>About</div>} />
                <Route path="/Chat" Component={Chat} />
            </Routes>
        </section>
    );
}

export default App;
