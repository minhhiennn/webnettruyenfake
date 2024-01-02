import "./assets/styles/_allPage.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TruyenDetailsPage from "./pages/TruyenDetails";
import ChapReader from "./pages/ChapReader";

function App() {
  return (
    <>
      <Router basename="webnettruyenfake">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="truyen-tranh">
            <Route path=":truyenId" element={<TruyenDetailsPage />}></Route>
            <Route
              path=":truyenName/:chapNumber/:id"
              element={<ChapReader />}
            ></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
