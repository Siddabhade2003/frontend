import React, { useState } from 'react';
import axios from 'axios';

const CreateCourseInstance = () => {
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [courseId, setCourseId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/instances', { year, semester, courseId })
            .then(() => {
                // Redirect or show a success message
            })
            .catch(error => {
                console.error('There was an error creating the course instance!', error);
            });
    };

    return (
        <div>
            <h2>Create Course Instance</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Year:
                    <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
                </label>
                <label>
                    Semester:
                    <input type="number" value={semester} onChange={(e) => setSemester(e.target.value)} />
                </label>
                <label>
                    Course ID:
                    <input type="number" value={courseId} onChange={(e) => setCourseId(e.target.value)} />
                </label>
                <button type="submit">Create Instance</button>
            </form>
        </div>
    );
};

export default CreateCourseInstance;
