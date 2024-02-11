import { ThemeProvider } from './theme-provider'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { logOut } from './store/slices/AuthSlice'
import { AppDispatch } from './store/store'
import { useDispatch, useSelector } from 'react-redux'
import { CustomAuth } from './Login'

export const NavBar = () => {
    const user = useSelector((state: CustomAuth) => state.auth);
    const dispatch = useDispatch<AppDispatch>()
    return (
        <div className='float-end flex gap-x-8'>
            {user.user && <Button variant="destructive" onClick={() => dispatch(logOut())} className='capitalize'>log out</Button>}
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <ModeToggle />
            </ThemeProvider>
        </div>
    )
}
