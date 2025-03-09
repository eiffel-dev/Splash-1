const request = require('supertest');
const express = require('express');
const { setRoutes } = require('../routes');
const { connect, closeDatabase, clearDatabase } = require('./testDb');

describe('Game Controller', () => {
    let app;

    beforeAll(async () => {
        await connect();
        app = express();
        app.use(express.json());
        setRoutes(app);
    });

    afterAll(async () => {
        await closeDatabase();
    });

    beforeEach(async () => {
        await clearDatabase();
    });

    const testGame = {
        title: "Test Game",
        date: "2025-03-10",
        location: "Test Location",
        teams: [
            {
                color: 'white',
                players: [
                    { name: 'Player 1', capsNumber: 1 },
                    { name: 'Player 2', capsNumber: 2 }
                ]
            },
            {
                color: 'blue',
                players: [
                    { name: 'Player 3', capsNumber: 1 },
                    { name: 'Player 4', capsNumber: 2 }
                ]
            }
        ],
        notes: "Test notes"
    };

    describe('POST /api/games', () => {
        it('should create game without location', async () => {
            const gameWithoutLocation = {
                title: "Test Game",
                date: "2025-03-10",
                teams: [
                    { color: 'white', name: 'White', players: [] },
                    { color: 'blue', name: 'Blue', players: [] }
                ]
            };

            const response = await request(app)
                .post('/api/games')
                .send(gameWithoutLocation);

            expect(response.status).toBe(201);
            expect(response.body.location).toBe('');
        });

        it('should create a new game', async () => {
            const response = await request(app)
                .post('/api/games')
                .send(testGame);

            expect(response.status).toBe(201);
            expect(response.body.title).toBe(testGame.title);
            expect(response.body._id).toBeDefined();
        });

        it('should validate required fields', async () => {
            const response = await request(app)
                .post('/api/games')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Validation Error');
        });

        it('should validate player cap numbers', async () => {
            const invalidGame = {
                ...testGame,
                teams: [
                    {
                        color: 'white',
                        players: [{ name: 'Invalid Player', capsNumber: 16 }]
                    },
                    {
                        color: 'blue',
                        players: []
                    }
                ]
            };

            const response = await request(app)
                .post('/api/games')
                .send(invalidGame);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Validation Error');
        });

        it('should validate team colors', async () => {
            const invalidGame = {
                ...testGame,
                teams: [
                    {
                        color: 'red',
                        players: []
                    }
                ]
            };

            const response = await request(app)
                .post('/api/games')
                .send(invalidGame);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Validation Error');
        });

        it('should create game with date and time', async () => {
            const gameData = {
                title: "Test Game",
                date: "2025-03-09T14:30",
                teams: [
                    { color: 'white', name: 'White', players: [] },
                    { color: 'blue', name: 'Blue', players: [] }
                ]
            };

            const response = await request(app)
                .post('/api/games')
                .send(gameData);

            expect(response.status).toBe(201);
            expect(new Date(response.body.date)).toEqual(new Date(gameData.date));
        });

        it('should handle game creation with next hour date', async () => {
            const nextHour = new Date();
            nextHour.setHours(nextHour.getHours() + 1);
            nextHour.setMinutes(0);
            nextHour.setSeconds(0);
            nextHour.setMilliseconds(0);

            const gameData = {
                title: "Test Game",
                date: nextHour.toISOString(),
                teams: [
                    { color: 'white', name: 'White', players: [] },
                    { color: 'blue', name: 'Blue', players: [] }
                ]
            };

            const response = await request(app)
                .post('/api/games')
                .send(gameData);

            expect(response.status).toBe(201);
            expect(new Date(response.body.date)).toEqual(nextHour);
        });
    });

    describe('GET /api/games', () => {
        it('should return all games', async () => {
            await request(app).post('/api/games').send(testGame);
            
            const response = await request(app).get('/api/games');
            
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toBe(1);
        });
    });

    describe('GET /api/games/:id', () => {
        it('should return a specific game', async () => {
            const createResponse = await request(app)
                .post('/api/games')
                .send(testGame);
            
            const response = await request(app)
                .get(`/api/games/${createResponse.body._id}`);
            
            expect(response.status).toBe(200);
            expect(response.body.title).toBe(testGame.title);
        });

        it('should return 404 for non-existent game', async () => {
            const response = await request(app)
                .get('/api/games/642e8b4e1b0f3c9876543210');
            
            expect(response.status).toBe(404);
        });
    });

    describe('PUT /api/games/:id', () => {
        it('should update an existing game', async () => {
            const createResponse = await request(app)
                .post('/api/games')
                .send(testGame);
            
            const response = await request(app)
                .put(`/api/games/${createResponse.body._id}`)
                .send({ title: "Updated Game" });
            
            expect(response.status).toBe(200);
            expect(response.body.title).toBe("Updated Game");
        });

        it('should update players in a team', async () => {
            const createResponse = await request(app)
                .post('/api/games')
                .send(testGame);
            
            const updatedPlayers = [
                { name: 'New Player', capsNumber: 5 }
            ];

            const response = await request(app)
                .put(`/api/games/${createResponse.body._id}`)
                .send({
                    teams: [
                        { color: 'white', players: updatedPlayers },
                        { color: 'blue', players: [] }
                    ]
                });
            
            expect(response.status).toBe(200);
            expect(response.body.teams[0].players).toHaveLength(1);
            expect(response.body.teams[0].players[0].name).toBe('New Player');
        });
    });

    describe('DELETE /api/games/:id', () => {
        it('should delete an existing game', async () => {
            const createResponse = await request(app)
                .post('/api/games')
                .send(testGame);
            
            const response = await request(app)
                .delete(`/api/games/${createResponse.body._id}`);
            
            expect(response.status).toBe(204);

            const getResponse = await request(app)
                .get(`/api/games/${createResponse.body._id}`);
            expect(getResponse.status).toBe(404);
        });
    });
});