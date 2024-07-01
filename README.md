# Go Game Score Calculation API

This is a web API that calculates the maximum number of draws that could have occurred in a series of Go games played by three friends, given their points.

## Setup

1. Clone the repository:

    - git clone https://github.com/SuDy0906/Gogame.git
    - cd go-game-score-calculation

2. Install dependencies:

    npm install

3. Start the server:

    node app.js
  

The server will start running on `http://localhost:3000`.

## API Documentation

### Endpoint

`GET /:p1/:p2/:p3`

- `p1`, `p2`, `p3` are the points of the three players.
- Points must be in non-decreasing order (i.e., `p1 <= p2 <= p3`).

### Input Constraints

- The scores must be integers within the range 0 to 30.

### Output

- Returns a JSON object with the maximum number of draws that could have happened.
- If the scores are not consistent with any valid set of games and results, returns -1.

### Example

Request: `GET /3/4/5`

Response:

```json
{
  "max_draws": 6
}
