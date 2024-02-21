import { useSelector } from "react-redux"
import { CustomAuth } from "./Login"

const User = () => {
    const user = useSelector((state: CustomAuth) => state.auth.user)
    return (
        <div className="grid justify-center items-center h-screen">
            <h1 className="bg-red-600/50 backdrop-blur-md p-4 rounded-md text-4xl capitalize">Welcome {user?.username}</h1>
        </div>
    )
}

export default User
