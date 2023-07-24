import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";

function Login() {
    const handleLogin = async (e) => {
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;
    };
    return (
        <form onSubmit={handleLogin}>
            <VStack spacing={"15px"}>
                <FormControl isRequired>
                    <FormLabel htmlFor="email">Enter Your Email:</FormLabel>
                    <Input placeholder="Email" type="email" name="email" id="email" />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="password">Enter Your Password:</FormLabel>
                    <Input placeholder="Password" type="password" name="email" id="password" />
                </FormControl>

                <Button w={"100%"} colorScheme="orange" type="submit">
                    Login
                </Button>
            </VStack>
        </form>
    );
}

export default Login;
