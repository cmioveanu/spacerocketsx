import {
  Box,
  Badge,
  Text
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import FavouriteButton from "./favouriteButton";

export default function FavouriteLaunchPad({ launchPad, state, dispatch }) {
  return (
    <Box
      as={Link}
      to={`/launch-pads/${launchPad.id}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      bgColor="white"
      display="block"
      p="5"
      mb="5"
      position="relative"
    >
      <Box position="absolute" right="-4" top="-4">
        <FavouriteButton data={launchPad} state={state} dispatch={dispatch} favType="LaunchPad" />
      </Box>

      <Box>
        <Box
          mb="3"
          fontSize="2xl"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {launchPad.full_name}
        </Box>

        <Box d="flex" alignItems="baseline" mb="1">
          {launchPad.status === "active" ? (
            <Badge px="2" variant="solid" colorScheme="green">
              Active
            </Badge>
          ) : (
            <Badge px="2" variant="solid" colorScheme="red">
              Retired
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {launchPad.launch_attempts} attempted &bull;{" "}
            {launchPad.launch_successes} succeeded
          </Box>
        </Box>

        <Text color="gray.500" fontSize="sm">
          {launchPad.rockets.map((r) => r.name).join(", ")}
        </Text>
      </Box>
    </Box>
  )
}