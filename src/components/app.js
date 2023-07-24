import { useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import Launches from "./launches";
import Launch from "./launch";
import Home from "./home";
import LaunchPads from "./launch-pads";
import LaunchPad from "./launch-pad";
import Favourites from "./favourites";
import History from "./history";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <NavBar dispatch={dispatch} />
      <Favourites state={state} dispatch={dispatch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<Launches state={state} dispatch={dispatch} />} />
        <Route path="/launches/:launchId" element={<Launch state={state} dispatch={dispatch} />} />
        <Route path="/launch-pads" element={<LaunchPads state={state} dispatch={dispatch} />} />
        <Route path="/launch-pads/:launchPadId" element={<LaunchPad state={state} dispatch={dispatch} />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>

  );
}

function NavBar({ dispatch }) {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
      position="relative"
      zIndex="11"
    >
      <Text
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="lg"
      >
        SPACE ROCKETS X
      </Text>

      <Button onClick={() => dispatch({ type: "toggleFavourites" })}
        bg="yellow.500"
        color="white"
        _hover={{ color: "gray.800" }}>
        <StarIcon mr="3" />
        Favourites
      </Button>
    </Flex >
  );
}

const localStorageState = localStorage.getItem("state");
const initialState = localStorageState !== null ? JSON.parse(localStorageState) : {
  favouritesOpen: true,

  launches: [],
  launchPads: []
}

function reducer(state, action) {
  const newState = { ...state };

  if (action.type === "toggleFavourites") {
    newState.favouritesOpen = !newState.favouritesOpen;
  }
  else if (action.type === "closeFavourites") {
    newState.favouritesOpen = false;
  }
  else if (action.type === "addLaunchToFavs") {
    newState.launches = [...newState.launches, action.payload];
  }
  else if (action.type === "removeLaunchFromFavs") {
    const launches = newState.launches.filter(launch => launch.id !== action.payload.id);
    newState.launches = launches;
  }
  else if (action.type === "addLaunchPadToFavs") {
    newState.launchPads = [...newState.launchPads, action.payload];
  }
  else if (action.type === "removeLaunchPadFromFavs") {
    const launchPads = newState.launchPads.filter(launchPad => launchPad.id !== action.payload.id);
    newState.launchPads = launchPads;
  }

  localStorage.setItem("state", JSON.stringify(newState));
  return newState;
};