import { Flex, Image, useTheme, View, Text } from "@aws-amplify/ui-react";
import logo from '../../assets/logoPSA_2.png';

export function Header() {
    const { tokens } = useTheme();

    return (
        <View as="header" backgroundColor={tokens.colors.background.primary}>
            <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
                padding={tokens.space.large}
                gap={tokens.space.medium}
            >
                <Image
                    height="250px"
                    alt="Poker Study App Logo"
                    src={logo}
                    padding={tokens.space.medium}
                />
                <Text
                    fontSize="3rem" // Agrandar el tamaño de la fuente
                    fontWeight={tokens.fontWeights.bold}
                    color={tokens.colors.font.primary}
                    style={{
                        textShadow: ' 0px 0px 5px rgba(0, 0, 0, 1)' // Sombra inset
                    }}
                >
                    Poker Crushers
                    <Text
                        fontStyle="italic"
                        fontSize="1.5rem" // Agrandar el tamaño de la fuente
                        fontWeight={tokens.fontWeights.bold}
                        color="#5AF8D7"
                        style={{
                            textShadow: ' 0px 0px 5px rgba(0, 0, 0, 1)' // Sombra inset
                        }}
                    >
                        Una herramienta simple pero poderosa
                    </Text>
                </Text>

            </Flex>
        </View>
    );
}
