import {
    Box,
    Image,
    Badge,
    Flex,
    Text
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { format as timeAgo } from "timeago.js";
import { formatDate } from "../utils/format-date";
import FavouriteButton from "./favouriteButton";

export default function FavouriteLaunch({ launch, state, dispatch }) {
    return (
        <Box
            as={Link}
            to={`/launches/${launch.id}`}
            boxShadow="md"
            rounded="lg"
            bgColor="white"
            display="block"
            p="5"
            mb="5"
            position="relative"
        >

            <Box position="absolute" right="-4" top="-4">
                <FavouriteButton data={launch} state={state} dispatch={dispatch} favType="Launch" />
            </Box>

            <Image
                src={launch.links.flickr.original[0] ?? launch.links.patch.small}
                alt={`${launch.name} launch`}
                height="100px"
                width="auto"
                mb="3"
            />

            <Box
                mb="3"
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
            >
                {launch.name}
            </Box>


            <Box>
                <Box d="flex" alignItems="baseline" mb="1">
                    {launch.success ? (
                        <Badge px="2" variant="solid" colorScheme="green">
                            Successful
                        </Badge>
                    ) : (
                        <Badge px="2" variant="solid" colorScheme="red">
                            Failed
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
                        {launch.rocket?.name} &bull; {launch.launchpad?.name}
                    </Box>
                </Box>

                <Flex>
                    <Text fontSize="sm">{formatDate(launch.date_utc)} </Text>
                    <Text color="gray.500" ml="2" fontSize="sm">
                        {timeAgo(launch.date_utc)}
                    </Text>
                </Flex>
            </Box>
        </Box>
    )
}