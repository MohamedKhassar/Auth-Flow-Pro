import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { TabsContent } from "./ui/tabs";
import { Input } from "./ui/input";
const SignUp = () => {
    return (
        <TabsContent value="password">
            <Card>
                <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                        Change your password here. After saving, you'll be logged out.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="current">Current password</Label>
                        <Input id="current" type="password" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="new">New password</Label>
                        <Input id="new" type="password" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save password</Button>
                </CardFooter>
            </Card>
        </TabsContent>
    )
}

export default SignUp
