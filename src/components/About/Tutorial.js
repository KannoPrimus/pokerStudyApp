import React, { useState } from 'react';
import Joyride from 'react-joyride';

const Tutorial = () => {
    const [run, setRun] = useState(false);

    const steps = [
        {
            target: '.switch',
            content: 'Puedes cambiar de modo para repasar las manos que registraste en modo entrenamiento.',
        },
        {
            target: '.my-second-step',
            content: 'Esta es la segunda parte del tutorial.',
        },
        // Agrega más pasos según sea necesario
    ];

    const handleJoyrideCallback = (data) => {
        const { status } = data;
        if (status === 'finished' || status === 'skipped') {
            setRun(false);
        }
    };

    return (
        <div>
            <button onClick={() => setRun(true)}>Iniciar Tutorial</button>
            <Joyride
                steps={steps}
                run={run}
                continuous={true}
                scrollToFirstStep={true}
                showProgress={true}
                showSkipButton={true}
                callback={handleJoyrideCallback}
            />
        </div>
    );
};

export default Tutorial;
