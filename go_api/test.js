const assert = require('assert');
const http = require('http');
const { URL } = require('url');
const app = require('./app'); // Assuming app.js is in the same directory

// Helper function to make HTTP GET requests
function makeRequest(path, callback) {
    const url = new URL(path, 'http://localhost:3001');
    http.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            callback(null, res, data);
        });
    }).on('error', (err) => {
        callback(err);
    });
}

// Test case: Basic Valid Input
function testBasicValidInput() {
    return new Promise((resolve, reject) => {
        makeRequest('/0/0/0', (err, res, body) => {
            if (err) reject(err);
            assert.strictEqual(res.statusCode, 200);
            const result = JSON.parse(body);
            assert.strictEqual(result.max_draws, 0);
            console.log('Test case 1 passed');
            resolve();
        });
    });
}

// Test case: Simple Valid Input with Draws
function testSimpleValidInputWithDraws() {
    return new Promise((resolve, reject) => {
        makeRequest('/1/1/2', (err, res, body) => {
            if (err) reject(err);
            assert.strictEqual(res.statusCode, 200);
            const result = JSON.parse(body);
            assert.strictEqual(result.max_draws, 2);
            console.log('Test case 2 passed');
            resolve();
        });
    });
}

// Test case: Valid Input with Draws
function testValidInputWithDraws() {
    return new Promise((resolve, reject) => {
        makeRequest('/3/4/5', (err, res, body) => {
            if (err) reject(err);
            assert.strictEqual(res.statusCode, 200);
            const result = JSON.parse(body);
            assert.strictEqual(result.max_draws, 6);
            console.log('Test case 3 passed');
            resolve();
        });
    });
}

// Test case: No Possible Valid Game Configuration
function testNoValidGameConfiguration() {
    return new Promise((resolve, reject) => {
        makeRequest('/3/3/3', (err, res, body) => {
            if (err) reject(err);
            assert.strictEqual(res.statusCode, 200);
            const result = JSON.parse(body);
            assert.strictEqual(result.max_draws, -1);
            console.log('Test case 4 passed');
            resolve();
        });
    });
}

// Test case: Input Out of Range (Should return -1)
function testInputOutOfRange() {
    return new Promise((resolve, reject) => {
        makeRequest('/-1/10/20', (err, res, body) => {
            if (err) reject(err);
            assert.strictEqual(res.statusCode, 200);
            const result = JSON.parse(body);
            assert.strictEqual(result.max_draws, -1);
            console.log('Test case 5 passed');
            resolve();
        });
    });
}

// Start server for testing
const server = http.createServer(app);
server.listen(3001, async () => {
    console.log('Server is running for testing on port 3001');
    
    try {
        // Run test cases sequentially
        await testBasicValidInput();
        await testSimpleValidInputWithDraws();
        await testValidInputWithDraws();
        await testNoValidGameConfiguration();
        await testInputOutOfRange();

        // Add more test cases as needed...

    } catch (error) {
        console.error('Error during test:', error);
    } finally {
        // Close server after tests complete
        server.close();
    }
});
