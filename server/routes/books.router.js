const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// Gets all books from the logged in user
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "book" WHERE "user_id" = $1;`;
  pool.query(queryText, [req.user.id])
  .then(result => {
    res.send(result.rows); //result.rows contains all the user's books
  })
  .catch(err => {
    console.log('Error getting books', err);
    res.sendStatus(500)
  })
}); //End GET

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
