// CreateCourse.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './CreateCourse.css'; 

const CreateCourse = () => {
    const [course, setCourse] = useState({ title: '', courseCode: '', description: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/courses', course)
            .then(() => {
                toast.success('Course created successfully!');
                navigate('/');
            })
            .catch(() => {
                toast.error('Failed to create course.');
                setError('Failed to create course.');
            });
    };

    return (
        <div className="create-course">
            <h2>Create New Course</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={course.title} onChange={handleChange} required />
                </div>
                <div>
                    <label>Course Code:</label>
                    <input type="text" name="courseCode" value={course.courseCode} onChange={handleChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={course.description} onChange={handleChange} required></textarea>
                </div>
                <button type="submit">Create Course</button>
            </form>
        </div>
    );
};

export default CreateCourse;
