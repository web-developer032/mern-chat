import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import Login from "@/components/Login";
import Signup from "@/components/Signup";

function Home() {
    return (
        <Container maxW={"xl"} centerContent>
            <Box
                textAlign={"center"}
                d="flex"
                justifyContent={"center"}
                bg={"white"}
                py={4}
                w={"100%"}
                m="40px 0 15px 0"
                borderRadius={"lg"}
                borderWidth={"1px"}
            >
                <Text fontSize={"2xl"}>Personal Chat App</Text>
            </Box>

            <Box bg={"white"} p={4} w={"100%"} borderRadius={"lg"} borderWidth={"1px"}>
                <Tabs variant={"soft-rounded"} colorScheme="orange">
                    <TabList mb={"1em"}>
                        <Tab width={"100%"}>Login</Tab>
                        <Tab width={"100%"}>Signup</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
}

export default Home;
