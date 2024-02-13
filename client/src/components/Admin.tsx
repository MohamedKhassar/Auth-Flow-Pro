import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from "axios"
import { useEffect, useState } from "react"
interface user {
    id: string,
    email: string,
    username: string,
    role: string
}

const Admin = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            const res = await axios.get("http://localhost:8080/api/users")
            setUsers(res.data)
        }
        getUsers()
    }, [])

    return (
        <div className="flex justify-center items-center h-screen">

            {users.length < 0 ?
                <Table>
                    <TableHeader className="text-center capitalize">
                        <TableRow>
                            <TableHead className="w-1/3">email</TableHead>
                            <TableHead className="w-1/3">username</TableHead>
                            <TableHead className="w-1/3">role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users && users.map((user: user) =>
                            <TableRow key={user.id}>
                                <TableCell></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table> : <h1>none of users found</h1>}
        </div>
    )
}

export default Admin
