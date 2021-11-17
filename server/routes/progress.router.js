const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// // Gets all reading sessions from the logged in user
// router.get('/', (req, res) => {
//   const queryText = `
//   SELECT "book_id", "date", "duration", "page", "title", "author", "page_count" FROM "reading_session" 
//   JOIN "book" ON "book"."id" = "reading_session"."book_id"
//   WHERE "user_id" = $1;
//   `;
//   pool.query(queryText, [req.user.id])
//   .then(result => {
//     res.send(result.rows); //result.rows contains all the user's books
//   })
//   .catch(err => {
//     console.log('Error getting reading sessions', err);
//     res.sendStatus(500)
//   })
// }); //End GET

// // Adds reading progress to database
// router.post('/', (req, res) => {
//     const queryText = `
//     INSERT INTO "reading_session" ("book_id", "date", "duration", "page")
//     VALUES ($1, $2, $3, $4);
//     `;
//     console.log('!!!!', req.body);
//     pool.query(queryText, [req.body.book_id, req.body.date, req.body.duration, req.body.page])
//     .then(result => {
//       res.sendStatus(201);
//     })
//     .catch(err => {
//       console.log('Error POSTing reading progress', err);
//       res.sendStatus(500)
//     })
//   }); //End POST


  module.exports = router;