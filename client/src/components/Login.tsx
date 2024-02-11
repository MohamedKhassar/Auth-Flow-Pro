import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { TabsContent } from "./ui/tabs";
import { Input } from "./ui/input";
import { useState } from "react";
import { Eye, EyeOff, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./store/slices/AuthSlice";
import { AppDispatch } from "./store/store";
export interface CustomAuth {
    auth: {
        isAuthenticated: boolean;
        user: null; // Define your user object type
        status: 'idle' | 'loading' | 'success' | 'error';
        error: string | null;
    };
}

export default function Login() {

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: CustomAuth) => state.auth);
    const [showPassword, setShowPassword] = useState(true)
    console.log(user)
    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(loginUser(credentials));
    };
    return (
        <TabsContent value="login">
            <Card>
                <CardHeader>
                    <div className="flex justify-center my-4">
                        <User size={42} />
                    </div>
                    <CardTitle className="text-center text-2xl capitalize">welcome back</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="Email">Email <b className="text-red-600">*</b></Label>
                        <Input id="Email" placeholder="PedroDuarte@gmail.com" onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password <b className="text-red-600">*</b></Label>
                        <div className="flex gap-x-2">
                            <Input id="password" placeholder={showPassword ? "*************" : "Your password"} type={showPassword ? "password" : "text"} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                            <Button variant={"secondary"} size={"icon"} onClick={() => setShowPassword(!showPassword)} >
                                {showPassword ? <Eye size={18} /> :
                                    <EyeOff size={18} />}
                            </Button>
                        </div>
                        <div className="flex gap-x-2 text-red-600">
                            {
                                user.error && user.error
                            }
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button className="capitalize" variant={"secondary"} onClick={handleSubmit} >login</Button>
                </CardFooter>
            </Card>
        </TabsContent>
    )
}
