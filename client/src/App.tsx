import { Auth } from "./components/Auth";
import { useEffect } from "react";
import { AppDispatch } from "./components/store/store";
import { useDispatch, useSelector } from "react-redux";
import { CustomAuth } from "./components/Login";
import { getUser } from "./components/store/slices/AuthSlice";
import { NavBar } from "./components/NavBar";

function App() {

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: CustomAuth) => state.auth);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])
  return (
    <>
      <div className="p-3">
        <NavBar />
        {!user.user && <Auth />}
      </div>
    </>
  )
}

export default App