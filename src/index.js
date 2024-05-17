import { PokerHandProvider } from './components/PokerHandContext/PokerHandContext';
import { Authenticator } from "@aws-amplify/ui-react";
import './index.css';
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

// Asegúrate de que el elemento root exista en tu archivo index.html
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');


ReactDOM.render(
    <StrictMode>

            <Authenticator.Provider>
                <PokerHandProvider>
                <App />
                </PokerHandProvider>
            </Authenticator.Provider>

    </StrictMode>,
    rootElement
);
