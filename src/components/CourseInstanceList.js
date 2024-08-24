// InstanceList.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles
import 'bootstrap/dist/css/bootstrap.min.css';

const InstanceList = () => {
    const [instances, setInstances] = useState([]);
    const [error, setError] = useState(null);
    const [year, setYear] = useState(2024); // Default year
    const [semester, setSemester] = useState(1); // Default semester

    const fetchInstances = useCallback(() => {
        axios.get(`/api/instances/${year}/${semester}`)
            .then(response => setInstances(response.data))
            .catch(() => setError('Failed to fetch course instances.'));
    }, [year, semester]);

    useEffect(() => {
        fetchInstances();
    }, [fetchInstances]);

    const handleDelete = (year, semester, id) => {
        axios.delete(`/api/instances/${year}/${semester}/${id}`)
            .then(() => {
                fetchInstances(); // Refetch after deletion
                toast.success('Course instance deleted successfully!');
            })
            .catch(() => {
                toast.error('Failed to delete course instance.');
                setError('Failed to delete course instance.');
            });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Course Instances</h2>
            <Link to="/create-instance" className="btn btn-primary mb-3">Create New Instance</Link>

            <div className="mb-3">
                <label htmlFor="year" className="form-label">Year:</label>
                <input
                    type="number"
                    id="year"
                    className="form-control"
                    value={year}
                    onChange={e => setYear(parseInt(e.target.value))}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="semester" className="form-label">Semester:</label>
                <input
                    type="number"
                    id="semester"
                    className="form-control"
                    value={semester}
                    onChange={e => setSemester(parseInt(e.target.value))}
                />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Course Title</th>
                        <th>Year</th>
                        <th>Semester</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {instances.map(instance => (
                        <tr key={instance.id}>
                            <td>{instance.courseTitle}</td> {/* Display course title */}
                            <td>{instance.year}</td>
                            <td>{instance.semester}</td>
                            <td>
                                <Link to={`/instances/${instance.year}/${instance.semester}/${instance.id}`} className="btn btn-info btn-sm me-2">View</Link>
                                <button onClick={() => handleDelete(instance.year, instance.semester, instance.id)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InstanceList;
