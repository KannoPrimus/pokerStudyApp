import React from 'react';

const PokerHandMatrix = ({ hands }) => {
    const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

    const initializeMatrix = () => {
        let matrix = {};
        ranks.forEach(rank1 => {
            ranks.forEach(rank2 => {
                if (rank1 === rank2) {
                    matrix[`${rank1}${rank2}`] = false; // Pairs
                } else {
                    matrix[`${rank1}${rank2}s`] = false; // Suited
                    matrix[`${rank1}${rank2}o`] = false; // Offsuit
                }
            });
        });
        return matrix;
    };

    const updateMatrix = (matrix, hand) => {
        const card1 = hand[0][0];
        const card2 = hand[1][0];
        const suited = hand[0][1] === hand[1][1] ? 's' : 'o';
        const key = card1 === card2 ? `${card1}${card2}` : `${card1}${card2}${suited}`;
        matrix[key] = true;
    };

    const matrix = initializeMatrix();

    hands.forEach(handData => {
        updateMatrix(matrix, handData.myHand);
    });

    return (
        <table>
            <tbody>
            {ranks.map((rank1, i) => (
                <tr key={rank1}>
                    {ranks.map((rank2, j) => {
                        const key = rank1 === rank2 ? `${rank1}${rank2}` : `${rank1}${rank2}s`;
                        const offsuitKey = `${rank1}${rank2}o`;
                        const isSuited = matrix[key];
                        const isOffsuit = matrix[offsuitKey];
                        return (
                            <td
                                key={rank2}
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    backgroundColor: isSuited || isOffsuit ? 'green' : 'white',
                                    border: '1px solid black',
                                    textAlign: 'center'
                                }}
                            >
                                {rank1}{rank2}
                                {rank1 !== rank2 && (isSuited ? 's' : isOffsuit ? 'o' : '')}
                            </td>
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default PokerHandMatrix;
