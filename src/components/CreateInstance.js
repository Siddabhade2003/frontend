import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateInstance.css'; // Assuming you have custom styles here

const CreateInstance = () => {
    const [instance, setInstance] = useState({ courseId: '', year: '', semester: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInstance({ ...instance, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const courseInstanceData = {
            course: { id: instance.courseId }, // Wrapping courseId in a course object
            year: instance.year,
            semester: instance.semester
        };

        axios.post('/api/instances', courseInstanceData)
            .then(() => navigate('/instances'))
            .catch(() => setError('Failed to create instance. Please ensure the course ID is valid.'));
    };

    return (
        <div className="create-instance container mt-4">
            <h2>Create New Instance</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Course ID:</label>
                    <input
                        type="text"
                        name="courseId"
                        className="form-control"
                        value={instance.courseId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Year:</label>
                    <input
                        type="number"
                        name="year"
                        className="form-control"
                        value={instance.year}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Semester:</label>
                    <input
                        type="text"
                        name="semester"
                        className="form-control"
                        value={instance.semester}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Instance</button>
            </form>
        </div>
    );
};

export default CreateInstance;
