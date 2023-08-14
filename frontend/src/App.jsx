import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home/Home";
import Chat from "@/pages/Chat/Chat";

function App() {
    useEffect(() => {
        (async () => {
            const data = await fetch(
                `http://127.0.0.1:5000/api/user/loginUsingToken?token=${localStorage.getItem(
                    "token"
                )}`
            );
            console.log("Data: ", data);
        })();
    }, []);
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
