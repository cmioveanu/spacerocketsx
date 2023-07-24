import React from 'react';
import { Box, Flex, Text, Icon, Spacer, Link } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { useSpaceXPaginatedQuery } from "../utils/use-space-x";
import Error from "./error";
import LoadMoreButton from "./load-more-button";
import Breadcrumbs from "./breadcrumbs";

const PAGE_SIZE = 5;

export default function History() {

    const { data, error, isValidating, setSize } = useSpaceXPaginatedQuery(
        "history",
        {
            query: { upcoming: false },
            options: {
                limit: PAGE_SIZE,
            },
        }
    );

    const launches = data?.map((page) => page.docs).flat() || [];

    return (
        <Box>
            <Breadcrumbs
                items={[{ label: "Home", to: "/" }, { label: "History" }]}
            />

            <Box>
                {error && <Error />}
                {launches.map((launch, index) => (
                    <TimelineItem
                        key={launch.id}
                        date={launch.event_date_utc}
                        title={launch.title}
                        description={launch.details}
                        index={index}
                        newsUrl={launch.links?.article}
                    />
                ))}
            </Box>

            <LoadMoreButton
                loadMore={() => setSize((size) => size + 1)}
                data={data}
                pageSize={PAGE_SIZE}
                isLoadingMore={isValidating}
            />
        </Box>
    );
};

function TimelineItem({ date, title, description, index, newsUrl }) {
    return (
        <Flex alignItems="baseline" justifyContent="center">
            <Flex flexBasis="50%" justifyContent="flex-end" >
                {
                    index % 2 === 0
                        ? <TimelineContent date={date} title={title} description={description} newsUrl={newsUrl} />
                        : null
                }
            </Flex>
            <Box flexBasis="50%" justifyContent="flex-start" >
                {
                    index % 2 !== 0
                        ? <TimelineContent date={date} title={title} description={description} newsUrl={newsUrl} />
                        : null
                }
            </Box>

        </Flex>
    );
};

function TimelineContent({ title, description, date, newsUrl }) {
    return (
        <Box
            as={Link} href={newsUrl}
            target="_blank"
            rel='noreferrer'
            display="block"
            maxWidth="400px"
            mt={10}
            bg="white"
            boxShadow="md"
            borderWidth="1px"
            rounded="lg">
            <Flex flexBasis="20%" alignItems="center" p={5}>
                <Icon as={CalendarIcon} boxSize={6} color="gray.600" />
                <Text ml={3} fontWeight="bold">{new Date(date).toDateString()}</Text>
            </Flex>
            <Box p={5}>
                <Text
                    fontSize="2xl"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    mb={2}>
                    {title}
                </Text>
                <Text noOfLines={5}>{description}</Text>
            </Box>
        </Box>
    );
};

