import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';

function ReadingData() {
    const dispatch = useDispatch();
    const books = useSelector((store) => store.books);
    const progress = useSelector((store) => store.progress);

    // Gets all reading sessions and books from the logged in user on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_BOOKS' });
        dispatch({ type: 'FETCH_PROGRESS' });
    }, []);

    //Gets just completed books
    let completedBooks = books.filter(book => book.rating > 0);

    //Gets the total hours the user has logged
    let totalHours = 0;
    for (let i = 0; i < progress.length; i++) {
        totalHours += Number(progress[i].duration)
    };


    let pagesRead = [progress[0].page];
    for (let i = 1; i < progress.length; i++) {
        if (progress[i].book_id === progress[i - 1].book_id) {
            pagesRead.push(Number(progress[i].page) - Number(progress[i - 1].page))
        } else {
            pagesRead.push(Number(progress[i].page))
        }
    };

    //Data setup for bar chart
    const labels = [];
    const data = [];
    for (let i = 0; i < progress.length; i++) {
        labels.push(progress[i].date.split('T')[0])
        data.push(Number(progress[i].duration))
    };


    console.log('pages read', pagesRead);
    return (
        <>
            <div className="chart">
                <Bar
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: 'HOURS READ FOR EACH DAY',
                                data: data,
                                backgroundColor: 'pink',
                                borderColor: 'magenta',
                                borderWidth: 2,
                            }
                        ]
                    }}
                    width={400}
                    height={600}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />
            </div>
            <div>
                <h3>TOTAL HOURS READ: {totalHours}</h3>
                <h3>TOTAL BOOKS READ: {completedBooks.length}</h3>
            </div>
        </>
    )
}

export default ReadingData;