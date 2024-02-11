import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { TabsContent } from "./ui/tabs";
import { Input } from "./ui/input";
import { useState } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { CustomAuth } from "./Login";
import { AppDispatch } from "./store/store";
import { signUp } from "./store/slices/AuthSlice";

const SignUp = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '', username: '' });
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: CustomAuth) => state.auth);
    const [showPassword, setShowPassword] = useState(true)

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(signUp(credentials));
    };
    return (
        <TabsContent value="signUp">
            <Card>
                <CardHeader className="flex justify-center">
                    <div className="flex justify-center my-4">
                        <UserPlus size={42} />
                    </div>
                    <CardTitle className="text-center text-2xl capitalize ">create a new account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="Username">Username <b className="text-red-600">*</b></Label>
                        <Input id="Username" placeholder="Pedro_Duarte_26" onChange={(e) => { setCredentials({ ...credentials, username: e.target.value }) }} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="Email">Email <b className="text-red-600">*</b></Label>
                        <Input id="Email" placeholder="PedroDuarte@gmail.com" onChange={(e) => { setCredentials({ ...credentials, email: e.target.value }) }} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password <b className="text-red-600">*</b></Label>
                        <div className="flex gap-x-2">
                            <Input id="password" placeholder={showPassword ? "*************" : "Your password"} type={showPassword ? "password" : "text"} onChange={(e) => { setCredentials({ ...credentials, password: e.target.value }) }} />
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
                    <Button className="capitalize" variant={"secondary"} onClick={handleSubmit}>sign up</Button>
                </CardFooter>
            </Card>
        </TabsContent>
    )
}

export default SignUp
