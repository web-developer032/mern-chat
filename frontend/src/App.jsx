import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <section>
            <Routes>
                <Route path="/" Component={() => <div>Home</div>} />
                <Route path="/About" Component={() => <div>About</div>} />
                <Route path="/Chat" Component={() => <div>Chat</div>} />
            </Routes>
        </section>
    );
}

export default App;
