import React, {useEffect} from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';

function HomePage() {
    const dispatch = useDispatch();

    const books = useSelector((store) => store.books);
  
    useEffect(() => {
      dispatch({ type: 'FETCH_BOOKS' });
    }, []);
  
    return (
      <div>
        <h2>Currently Reading</h2>
        {books.map((book) => (
         <p>{book.title}, by {book.author}</p>
        ))}
      </div>
    );
}

// this allows us to use <App /> in index.js
export default HomePage;


// function HomePage() {
//     const user = useSelector((store) => store.user);
//     return (
//       <div className="container">
//         <h2>Welcome, {user.username}!</h2>
//         <p>Your ID is: {user.id}</p>
//         <LogOutButton className="btn" />
//       </div>
//     );
//   }