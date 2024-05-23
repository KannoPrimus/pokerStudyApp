import { Flex, Text, useTheme } from "@aws-amplify/ui-react";

export function Footer() {
    const { tokens } = useTheme();

    return (
        <Flex justifyContent="center" padding={tokens.space.small}>
            <Text>&copy; All Rights Reserved</Text>
        </Flex>
    );
}