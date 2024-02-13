import { ThemeProvider } from './theme-provider'
import { ModeToggle } from './mode-toggle'
import { logOut } from './store/slices/AuthSlice'
import { AppDispatch } from './store/store'
import { useDispatch, useSelector } from 'react-redux'
import { CustomAuth } from './Login'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const NavBar = () => {
    const user = useSelector((state: CustomAuth) => state.auth);
    const dispatch = useDispatch<AppDispatch>()
    return (
        <div className='float-end flex gap-x-8 items-center'>
            {user.user && <DropdownMenu>
                <DropdownMenuTrigger className='capitalize border border-gray-500 p-2 rounded-lg bg-slate-800 hover:bg-slate-900 duration-300'>{user.user?.username}</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className="bg-red-500" onClick={() => dispatch(logOut())}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>}
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <ModeToggle />
            </ThemeProvider>
        </div>
    )
}
