const API_BASE_URL = process.env.REACT_APP_API_URL;

export const createGame = async (gameData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/games`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData)
        });

        if (!response.ok) {
            throw new Error('Failed to create game');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};