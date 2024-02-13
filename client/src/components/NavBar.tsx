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
import { ChevronDown, Fingerprint } from 'lucide-react'
export const NavBar = () => {
    const user = useSelector((state: CustomAuth) => state.auth);
    const dispatch = useDispatch<AppDispatch>()
    return (
        <div className='flex justify-between items-center p-4'>
            <div className='flex gap-x-4 items-center'>
                <Fingerprint size={50} />
                <div className='capitalize font-medium text-3xl'>
                    <h1 className='text-rose-500'>auth flow</h1>
                    <h1>pro</h1>
                </div>
            </div>
            <div className='float-end flex gap-x-8 items-center'>
                {user.user && <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center gap-x-4 capitalize border dark:border-gray-500 p-2 rounded-lg dark:bg-slate-800 dark:hover:bg-slate-900 duration-300'>{user.user?.username} <ChevronDown /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="hover:bg-red-600 bg-red-500" onClick={() => dispatch(logOut())}>Logout</DropdownMenuItem>
                        <DropdownMenuItem className='capitalize'>role : {user.user.role}</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>}
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <ModeToggle />
                </ThemeProvider>
            </div>
        </div>
    )
}
