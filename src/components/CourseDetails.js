// CourseDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './CourseDetails.css'; // Add your custom styles here

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`/api/courses/${id}`)
            .then(response => setCourse(response.data))
            .catch(() => setError('Failed to fetch course details.'));
    }, [id]);

    return (
        <div className="course-details">
            {error && <p className="error">{error}</p>}
            {course ? (
                <div>
                    <h2>{course.title}</h2>
                    <p><strong>Course Code:</strong> {course.courseCode}</p>
                    <p><strong>Description:</strong> {course.description}</p>
                    <Link to="/" className="btn">Back to List</Link>
                </div>
            ) : <p>Loading...</p>}
        </div>
    );
};

export default CourseDetails;
