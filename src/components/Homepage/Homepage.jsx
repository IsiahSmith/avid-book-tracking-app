import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

//Material-UI imports
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DoneIcon from '@mui/icons-material/Done';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const books = useSelector((store) => store.books);
    const progress = useSelector((store) => store.progress);

    // Gets all reading sessions and books from the logged in user on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_BOOKS' });
        dispatch({ type: 'FETCH_PROGRESS' });
    }, []);

    // Filters out completed books to only contain books still being read
    let currentlyReading = books.filter(book => book.rating === null);

    // Filters out reading progress entries to only contain books still being read
    let progressForBook = progress.filter(session => session.rating === null);

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
                <h2>Books Currently Being Read</h2>
                <TableContainer component={Paper}>
                    {books.length > 0 ? <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>Page#</TableCell>
                                <TableCell>Last Read</TableCell>
                                <TableCell>%Complete</TableCell>
                                <TableCell>Edit Book Info</TableCell>
                                <TableCell>Update Reading Progress</TableCell>
                                <TableCell>Complete Book</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentlyReading.map((book) => {

                                //Filters to only get the most recent entry for each specific book
                                let bookSessions = progressForBook.filter(session => session.book_id === book.id);
                                let recentSession = bookSessions[0];

                                return (
                                    <TableRow key={book.id}>
                                        <TableCell>{book.title}</TableCell>
                                        <TableCell>{book.author}</TableCell>
                                        <TableCell>{recentSession ? recentSession.page : <span>---</span>}</TableCell>
                                        <TableCell>{recentSession ? recentSession.date.split('T')[0] : <span>---</span>}</TableCell>
                                        <TableCell>{recentSession ? (recentSession.page / recentSession.page_count * 100).toFixed(2) : <span>---</span>}</TableCell>
                                        <TableCell><Button variant='outlined' endIcon={<EditIcon />} onClick={() => history.push(`/edit/${book.id}`)}>EDIT</Button></TableCell>
                                        <TableCell><Button variant='outlined' endIcon={<UpgradeIcon />} onClick={() => history.push(`/update/${book.id}`)}>UPDATE</Button></TableCell>
                                        <TableCell><Button variant='outlined' endIcon={<DoneIcon />} onClick={() => history.push(`/complete/${book.id}`)}>COMPLETE</Button></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table> : <p> You're not tracking any books yet! Click 'ADD BOOK' to get started!</p>}
                </TableContainer>
                <Button
                    sx={{ m: 2 }}
                    variant='contained'
                    endIcon={<MenuBookIcon />}
                    onClick={() => history.push('/addbook')}>ADD BOOK</Button>
            </Grid>
        </>
    );
}

// this allows us to use <App /> in index.js
export default HomePage;