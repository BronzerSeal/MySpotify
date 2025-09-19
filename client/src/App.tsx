import NavBar from "./app/components/ui/navBar";
import MainPage from "./app/pages/mainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArtistPage from "./app/pages/artistPage";
import { ToastContainer } from "react-toastify";
import SearchPage from "./app/pages/searchPage";
import AlbumPage from "./app/pages/albumPage";
import Login from "./app/pages/login";
import AppLoader from "./app/components/ui/hoc/appLoader";
import UserPage from "./app/pages/userPage";
import UserEditPage from "./app/pages/userEditPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppLoader>
          <NavBar />

          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/artist/:id" element={<ArtistPage />} />
            <Route path="/search/:text" element={<SearchPage />} />
            <Route path="/album/:id" element={<AlbumPage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/user/:id/edit" element={<UserEditPage />} />
          </Routes>
        </AppLoader>

        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
