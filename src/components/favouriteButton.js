
import {
    Tooltip,
    IconButton
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export default function FavouriteButton({ data, state, dispatch, favType }) {
    let alreadyInFavs = false;

    if (favType === "Launch") {
        alreadyInFavs = state.launches.some(launch => launch.id === data.id);
    }
    else if (favType === "LaunchPad") {
        alreadyInFavs = state.launchPads.some(launchPad => launchPad.id === data.id);
    }

    const tooltipText = alreadyInFavs ? "Remove from favourites" : "Add to favourites";
    const starIconColor = alreadyInFavs ? "yellow.500" : "#718096b8";

    const addToFavsOrRemove = (event) => {
        event.preventDefault();

        if (alreadyInFavs) {
            const type = "remove" + favType + "FromFavs";
            dispatch({ type, payload: data });
        }
        else {
            const type = "add" + favType + "ToFavs";
            dispatch({ type, payload: data });
        }
    }

    return (
        <Tooltip
            hasArrow
            label={tooltipText}
            bg='gray.800'
            borderRadius="md"
            p="3"
            placement="right"
        >
            <IconButton aria-label={tooltipText}
                icon={<StarIcon w="100%" h="100%" />}
                variant="ghost"
                w="12"
                h="12"
                color={starIconColor}
                _hover={{ bg: "none", color: "gray.800" }}
                onClick={addToFavsOrRemove} />
        </Tooltip>
    )
}