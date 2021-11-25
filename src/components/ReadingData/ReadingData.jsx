import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';

function ReadingData() {
    const dispatch = useDispatch();
    const books = useSelector((store) => store.books);
    const progress = useSelector((store) => store.progress);

    // Gets all reading sessions and books from the logged in user on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_BOOKS' });
        dispatch({ type: 'FETCH_PROGRESS' });
    }, []);

    //Gets just the completed books of the user
    let completedBooks = books.filter(book => book.rating > 0);

    //Gets the total hours the user has logged
    let totalHours = 0;
    for (let i = 0; i < progress.length; i++) {
        totalHours += Number(progress[i].duration)
    };

    //Gets pages read for each reading session of the user
    let pagesRead = [progress[0].page];
    for (let i = 1; i < progress.length; i++) {
        if (progress[i].book_id === progress[i - 1].book_id) {
            pagesRead.push(Number(progress[i].page) - Number(progress[i - 1].page))
        } else {
            pagesRead.push(Number(progress[i].page))
        }
    };

    //Calculates reading speed for reading session of the user
    let readingSpeed = [];
    for (let i = 0; i < pagesRead.length; i++) {
        readingSpeed.push(pagesRead[i] / Number(progress[i].duration))
    };

    //Calculates users average reading speed
    const average = (array) => array.reduce((a, b) => a + b) / array.length;
    console.log(average(readingSpeed));

    //Keeps calculations to four digits  
    function precise(x) {
        return Number.parseFloat(x).toPrecision(4);
    }

    // Calculates total hours read by user for each day
    let result = {};
    for(let entry of progress){
        let date = entry.date?.split('T')[0];
        let matched = false;

        //if the date is already in result, do this
        for(let key in result){
            if(key === date){
                result[date] = result[date] + Number(entry.duration);
                // let the rest of the loop know that 
                matched = true;
            }
        }
        //if the date is not in result, make a new entry
        if(!matched) {
            result[date] = Number(entry.duration)
        }
    };

    //Data setup for bar chart
    const labels = Object.keys(result);
    const data = labels.map(date => result[date]);
    // for (let i = 0; i < progress.length; i++) {
    //     labels.push(progress[i].date.split('T')[0])
    //     data.push(Number(progress[i].duration))
    // };

    console.log('labels', labels);
    console.log('Progress', progress);
    console.log('pages read', pagesRead);
    console.log('reading speed', readingSpeed);
    return (
        <>
            <div className="chart">
                <Line
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: 'Hours Read For Each Day',
                                data: data,
                                backgroundColor: 'pink',
                                borderColor: 'magenta',
                                borderWidth: 2,
                                lineTension: 0
                            }
                        ]
                    }}
                    width={400}
                    height={600}
                    options={{
                        cubicInterpolationMode: 'monotone',
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
                <h3>READING SPEED: {precise(average(readingSpeed))} Pages per Hour</h3>
            </div>
        </>
    )
}

export default ReadingData;