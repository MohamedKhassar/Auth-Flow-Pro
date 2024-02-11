import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Login from "./Login"
import SignUp from "./SignUp"
import { useDispatch } from "react-redux"
import { clearError } from "./store/slices/AuthSlice"


export const Auth = () => {
    const dispatch = useDispatch()

    const clearErrors = () => {
        dispatch(clearError())
    }

    return (

        <div className="flex justify-center h-screen items-center">
            <Tabs defaultValue="login" className="w-[400px]" onValueChange={clearErrors}>
                <TabsList className="grid w-full grid-cols-2"  >
                    <TabsTrigger value="login" >Login</TabsTrigger>
                    <TabsTrigger value="signUp">SignUp</TabsTrigger>
                </TabsList>
                <Login />
                <SignUp />
            </Tabs>
        </div>
    )
}
