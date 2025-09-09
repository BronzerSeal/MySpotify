import NavBar from "./app/components/ui/navBar";
import MainPage from "./app/pages/mainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArtistPage from "./app/pages/artistPage";
import { ToastContainer } from "react-toastify";
import SearchPage from "./app/pages/searchPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
          <Route path="/search/:text" element={<SearchPage />} />
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
