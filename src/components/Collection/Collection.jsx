import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Material-UI imports
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Collection() {
    const dispatch = useDispatch();
    const books = useSelector((store) => store.books);
    const progress = useSelector((store) => store.progress);

    // Gets all books from the logged in user on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_BOOKS' });
        dispatch({ type: 'FETCH_PROGRESS' });
    }, []);

    let completedBooks = books.filter(book => book.rating > 0);
    let progressForBook = progress.filter(session => session.rating > 0);

    return (
        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '30vh' }}
            >
                <h2>Collection</h2>
                <TableContainer component={Paper}>
                    {completedBooks.length > 0 ? <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Completion Time (hrs)</TableCell>
                                <TableCell>Completed On</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {completedBooks.map((book) => {

                                let completedBookSessions = progressForBook.filter(session => session.book_id === book.id);
                                let finalSession = completedBookSessions[completedBookSessions.length - 1];
                                let sum = 0;
                                for (let i = 0; i < completedBookSessions.length; i++) {
                                    sum += Number(completedBookSessions[i].duration)
                                }

                                return (
                                    <TableRow key={book.id}>
                                        <TableCell>{book.title}</TableCell>
                                        <TableCell>{book.author}</TableCell>
                                        <TableCell><Rating name="read-only" value={book.rating} readOnly /></TableCell>
                                        <TableCell>{sum}</TableCell>
                                        <TableCell>{finalSession?.date.split('T')[0]}</TableCell>
                                        <TableCell><Button variant='contained' onClick={() => dispatch({ type: "DELETE_BOOK", payload: book })}>DELETE</Button></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table> : <p>You haven't completed any books yet! Complete a book to see it added here.</p>}
                </TableContainer>
            </Grid>
        </>
    );
}

// this allows us to use <App /> in index.js
export default Collection;