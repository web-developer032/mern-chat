import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";

function Signup() {
    const handleSignup = (e) => {
        e.preventDefault();

        let name = e.target.name.value;
        let email = e.target.email.value;
        let password = e.target.password.value;
        let profilePicture = e.target.files[0];

        console.log(name, email, password, profilePicture);
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
                    <Input placeholder="Password" type="password" name="email" id="password" />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="profile">Upload Your Profile Picture:</FormLabel>
                    <Input
                        type="file"
                        name="profile"
                        multiple={false}
                        accept="image/*"
                        id="profile"
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
