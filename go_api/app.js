const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Go Game Score Calculation API');
});

function calculateMaxDraws(p1, p2, p3) {
    const totalPoints = p1 + p2 + p3;
  
    if (totalPoints % 2 !== 0) {
        return -1;
    }
    
    if (p3 > totalGames * 2) {
        return -1;
    }

    const maxDraws = (p1+p2+ Math.min(p3, (p1+p2)))/2;

    if (maxDraws < 0) {
        return -1;
    }

    return maxDraws;
}

app.get('/:p1/:p2/:p3', (req, res) => {
    const p1 = parseInt(req.params.p1);
    const p2 = parseInt(req.params.p2);
    const p3 = parseInt(req.params.p3);

    if (isNaN(p1) || isNaN(p2) || isNaN(p3) || p1 < 0 || p2 < 0 || p3 < 0 || p1 > 30 || p2 > 30 || p3 > 30) {
        return res.json({ max_draws: -1 });
    }

    const maxDraws = calculateMaxDraws(p1, p2, p3);
    res.json({ max_draws: maxDraws });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
