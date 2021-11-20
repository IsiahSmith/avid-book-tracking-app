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

    const labels = [];
    const data = [];
    for (let i=0; i<progress.length; i++) {
        labels.push(progress[i].title)
        data.push(progress[i].duration)
    }


    return (
    <div className="chart">
        <Bar 
            data={{
                labels: labels,
                datasets: [
                    {
                        label: 'HOURS READ FOR EACH BOOK',
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
    )
}

export default ReadingData;