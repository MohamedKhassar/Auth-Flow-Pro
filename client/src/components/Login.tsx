import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { TabsContent } from "./ui/tabs";
import { Input } from "./ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
    const [showPassword, setShowPassword] = useState(true)
    return (
        <TabsContent value="login">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-2xl capitalize">welcome back 👋</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="Email">Email <b className="text-red-600">*</b></Label>
                        <Input id="Email" placeholder="PedroDuarte@gmail.com" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password <b className="text-red-600">*</b></Label>
                        <div className="flex gap-x-2">
                            <Input id="password" placeholder="*************" type={showPassword ? "password" : "text"} />
                            <Button variant={"secondary"} size={"icon"} onClick={() => setShowPassword(!showPassword)} >
                                {showPassword ? <Eye size={18} /> :
                                    <EyeOff size={18} />}
                            </Button>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button className="capitalize" variant={"secondary"} >login</Button>
                </CardFooter>
            </Card>
        </TabsContent>
    )
}
