import { Auth } from "./components/Auth";
import { useEffect } from "react";
import { AppDispatch } from "./components/store/store";
import { useDispatch, useSelector } from "react-redux";
import { CustomAuth } from "./components/Login";
import { getUser } from "./components/store/slices/AuthSlice";
import { NavBar } from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Admin from "./components/Admin";
import User from "./components/User";

function App() {

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: CustomAuth) => state.auth);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])

  console.log(user.user?.role)
  return (
    <>
      <div className="p-3">
        <NavBar />
      </div>
      {!user.user ? <Auth /> :
        <Routes>
          <Route path="/" element={user.user.role == "user" ? <User /> : <Admin />} />
        </Routes>
      }
    </>
  )
}

export default App