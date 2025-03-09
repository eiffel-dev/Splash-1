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
        teams: ["Team A", "Team B"],
        notes: "Test notes"
    };

    describe('POST /api/games', () => {
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