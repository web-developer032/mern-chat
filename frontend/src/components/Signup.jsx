import { Button, FormControl, FormLabel, Input, VStack, useToast } from "@chakra-ui/react";
import UserServices from "@/services/User";

function Signup() {
    const toast = useToast();

    const handleSignup = async (e) => {
        e.preventDefault();

        let name = e.target.name.value;
        let email = e.target.email.value;
        let password = e.target.password.value;
        let profile = e.target.profile.files[0];

        const userData = new FormData();
        userData.append("name", name);
        userData.append("email", email);
        userData.append("password", password);
        userData.append("profile", profile);

        const data = await UserServices.signupUser(userData);

        if (data.status) {
            toast({
                title: "Signup Successfull",
                status: "success",
                duration: 3000,
                position: "top-right",
                isClosable: true,
            });
        } else {
            toast({
                title: data.message,
                status: "error",
                duration: 3000,
                position: "top-right",
                isClosable: true,
            });
        }

        console.log("USER CREATED: ", data);
    };

    return (
        <form onSubmit={handleSignup}>
            <VStack spacing={"15px"}>
                <FormControl isRequired>
                    <FormLabel htmlFor="name">Enter Your Name:</FormLabel>
                    <Input placeholder="Name" type="text" name="name" id="name" />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="email">Enter Your Email:</FormLabel>
                    <Input placeholder="Email" type="email" name="email" id="email" />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="password">Enter Your Password:</FormLabel>
                    <Input placeholder="Password" type="password" name="password" id="password" />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="profile">Upload Your Profile Picture:</FormLabel>
                    {/* <Input
                        type="file"
                        name="profile"
                        multiple={false}
                        accept="image/*"
                        id="profile"
                    /> */}
                    <input
                        type="file"
                        name="profile"
                        id="profile"
                        multiple={false}
                        accept="image/*"
                    />
                </FormControl>

                <Button w={"100%"} colorScheme="orange" type="submit">
                    Signup
                </Button>
            </VStack>
        </form>
    );
}

export default Signup;
