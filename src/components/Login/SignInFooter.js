import { Flex, Link, useAuthenticator, useTheme } from "@aws-amplify/ui-react";

export function SignInFooter() {
    const { toForgotPassword  } = useAuthenticator();
    const { tokens } = useTheme();


    const handleClick = () => {
        console.log("Link clicked");
        if (toForgotPassword ) {
            toForgotPassword ();
        } else {
            console.error("toResetPassword is not defined");
        }
    };

    return (
        <Flex justifyContent="center" padding={`0 0 ${tokens.space.medium}`}>
            <Link onClick={handleClick}>Resetea tu password</Link>
        </Flex>
    );
}