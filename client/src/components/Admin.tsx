import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import api from "@/config"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useSelector } from "react-redux"
import { CustomAuth } from "./Login"
interface user {
    id: string,
    email: string,
    username: string,
    role: {
        name: string
    }
}

const Admin = () => {
    const user = useSelector((state: CustomAuth) => state.auth)
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            const res = await api.get("http://localhost:8080/api/users")
            setUsers(res.data)
        }
        getUsers()
    }, [])
    console.log(users)
    return (
        <div className="flex justify-center items-center h-screen p-10 w-full">
            {users.length > 0 ?
                <Table className="w-full ">
                    <TableHeader className="text-center capitalize">
                        <TableRow>
                            <TableHead className="w-fit">email</TableHead>
                            <TableHead className="w-fit">username</TableHead>
                            <TableHead className="w-fit">role</TableHead>
                            {user.user?.role == "super_admin" && <TableHead className="w-fit">actions</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users && users.map((data: user) =>
                            <TableRow key={data.id}>
                                <TableCell>{data.email}</TableCell>
                                <TableCell>{data.username}</TableCell>
                                <TableCell>{data.role.name}</TableCell>
                                <TableCell>
                                    {user.user?.role == "super_admin" && data.role.name != "super_admin" && <Button variant={"destructive"}>Delete</Button>}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table> : <div className="flex items-center justify-center h-96">
                    <h1 className="text-8xl text-red-500 border border-gray-600 p-8 rounded-md bg-slate-800 text-center capitalize">nothing found</h1>
                </div>}
        </div>
    )
}

export default Admin
