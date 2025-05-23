import React from "react";
import {
	Container,
	Flex,
	Text,
	HStack,
	Button,
	useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsPlusSquare } from "react-icons/bs";
import { LuMoon, LuSun } from "react-icons/lu";
const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<>
			<Container maxW={"1140px"} px={4}>
				<Flex
					h={16}
					alignItems={"center"}
					justifyContent={"space-between"}
					flexDir={{ base: "column", sm: "row" }}>
					<Text
						bgGradient={"linear(to-r, cyan.400, blue.500)"}
						bgClip="text"
						fontSize={{ base: "22", sm: "28" }}
						fontWeight="bold"
						textTransform={"uppercase"}
						textAlign={"center"}>
						<Link to={"/"}>Product Store 🛒</Link>
					</Text>
					<HStack spacing={2} alignItems={"center"}>
						<Link to={"/create"}>
							<Button>
								<BsPlusSquare fontSize={20} />
							</Button>
						</Link>

						<Button onClick={toggleColorMode}>
							{colorMode === "light" ? <LuMoon /> : <LuSun />}
						</Button>
					</HStack>
				</Flex>
			</Container>
		</>
	);
};

export default Navbar;
