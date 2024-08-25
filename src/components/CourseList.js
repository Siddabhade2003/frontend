// CourseList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/courses')
            .then(response => setCourses(response.data))
            .catch(() => setError('Failed to fetch courses.'));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`/api/courses/${id}`)
            .then(() => {
                setCourses(courses.filter(course => course.id !== id));
                toast.success('Course deleted successfully!');
            })
            .catch(() => {
                toast.error('Failed to delete course.');
                setError('Failed to delete course.');
            });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Course List</h2>
            <Link to="/create-course" className="btn btn-primary mb-3">Create New Course</Link>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Course Code</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.id}>
                            <td>{course.title}</td>
                            <td>{course.courseCode}</td>
                            <td>{course.description}</td>
                            <td>
                                <Link to={`/courses/${course.id}`} className="btn btn-info btn-sm me-2">View</Link>
                                <button onClick={() => handleDelete(course.id)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseList;
