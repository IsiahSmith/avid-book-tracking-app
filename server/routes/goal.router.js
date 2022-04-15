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

  // Adds user's goal to database
router.post('/', (req, res) => {
    const queryText = `
      INSERT INTO "goal" ("user_id", "current", "total")
      VALUES ($1, $2, $3);
    `;
    pool.query(queryText, [req.user.id, req.body.current, req.body.total])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.log('Error POSTing goal', err);
        res.sendStatus(500)
      })
  }); //End POST

  // Updates the user goal in the database
router.put('/goal/:id', (req, res) => {
    const id = req.params.id;
    const queryText = `
      UPDATE "goal"
      SET "current" = $1
      WHERE "id" = $2;
    `;
    pool.query(queryText, [req.body.current, id])
      .then(result => {
        console.log('result is', result);
        res.sendStatus(200);
      })
      .catch(err => {
        console.log('Error updating goal', err);
        res.sendStatus(500)
      })
  }); //End PUT

  module.exports = router;