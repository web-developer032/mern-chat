import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HttpClient from "@/services/httpClient";
import UserServices from "@/services/USer";
import Home from "@/pages/Home/Home";
import Chat from "@/pages/Chat/Chat";

function App() {
    useEffect(() => {
        let token = localStorage.getItem("token");

        HttpClient.authorization = token;
        (async () => {
            const data = await UserServices.loginUsingToken();

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
