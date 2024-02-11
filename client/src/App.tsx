import { ModeToggle } from "./components/mode-toggle"
import { ThemeProvider } from "./components/theme-provider"
import { Auth } from "./components/Auth";
import { useEffect } from "react";
import { AppDispatch } from "./components/store/store";
import { useDispatch, useSelector } from "react-redux";
import { CustomAuth } from "./components/Login";
import { getUser, logOut } from "./components/store/slices/AuthSlice";
import { Button } from "./components/ui/button";

function App() {

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: CustomAuth) => state.auth);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])
  return (
    <>
      <div className="p-3">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ModeToggle />
        </ThemeProvider>
        {!user.user ?
          <Auth />
          :
          <Button variant="outline" onClick={() => dispatch(logOut())}>Button</Button>
        }
      </div>
    </>
  )
}

export default App