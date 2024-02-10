import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import { ThemeProvider } from "./components/theme-provider"
import { ModeToggle } from "./components/mode-toggle"
function App() {
  return (
    <div className="p-3">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ModeToggle />
      </ThemeProvider>
      <div className="flex justify-center h-screen items-center">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <Login />
          <SignUp />
        </Tabs>
      </div>
    </div>
  )
}

export default App