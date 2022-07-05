import { Routes, Route } from "react-router-dom";
import PageDefault from "./components/pageDefault.jsx";
import Home from "./components/home/home.jsx";
import "./App.css";
import Create from "./components/create/create.jsx";
import Detail from "./components/details/detail.jsx";
import Loading from "./components/loading/loading.jsx";

function App() {
  return (
    <div className="conteiner">
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/game/" element={<PageDefault />}>
          <Route path="home" element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="details/:id" element={<Detail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
