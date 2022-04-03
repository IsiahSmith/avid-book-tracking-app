const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Gets goal from the logged in user
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "goal" WHERE "user_id" = $1;`;
    pool.query(queryText, [req.user.id])
      .then(result => {
        res.send(result.rows); //result.rows contains the users goal
      })
      .catch(err => {
        console.log('Error getting goal', err);
        res.sendStatus(500)
      })
  }); //End GET