import { Routes, Route } from "react-router-dom";
import AddPage from "./components/AddPage";
import Home from "./components/Home";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route index Component={Home} />
                <Route path="add" Component={AddPage} />
            </Routes>
        </div>
    );
}

export default App;
