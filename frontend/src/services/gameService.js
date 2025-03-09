const API_BASE_URL = process.env.REACT_APP_API_URL;

export const createGame = async (gameData) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/games`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                ...data
            };
        }

        return data;
    } catch (error) {
        throw error;
    }
};