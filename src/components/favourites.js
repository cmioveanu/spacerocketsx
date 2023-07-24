import {
    Box,
    Heading,
} from "@chakra-ui/react";
import { useRef } from "react";
import FavouriteLaunch from "./favouriteLaunch";
import FavouriteLaunchPad from "./favouriteLaunchPad";

export default function Favourites({ state, dispatch }) {
    const transform = state.favouritesOpen ? "translateX(0)" : "translateX(100%)";

    return (
        <Box
            w="400px"
            position="fixed"
            top="0"
            bottom="0"
            right="0"
            transform={transform}
            transition="transform 0.5s"
            p="5"
            bg="gray.300"
            zIndex="10"
            boxShadow="lg"
            borderColor="gray.200"
            borderWidth="1px"
            overflowY="scroll"
            css={{
                "&::-webkit-scrollbar": {
                    display: "none"
                },
                "msOverflowStyle": "none",
                "scrollbarWidth": "none"
            }}
        >

            <Box
            >
                <Heading color="gray.800" textAlign="center" mt="90px" mb="30" w="100%">
                    Favourites
                </Heading>

                <Box>
                    <Heading as="h3" size="lg" mb="5" mt="10">
                        Launches ({state.launches.length})
                    </Heading>

                    {state.launches.map(launch => <FavouriteLaunch launch={launch} key={launch.id} state={state} dispatch={dispatch} />)}
                </Box>

                <Box>
                    <Heading as="h3" size="lg" mb="5" mt="10">
                        Launch Pads ({state.launchPads.length})
                    </Heading>

                    {state.launchPads.map(launchPad => <FavouriteLaunchPad launchPad={launchPad} key={launchPad.id} state={state} dispatch={dispatch} />)}
                </Box>
            </Box>
        </Box >
    )
};

