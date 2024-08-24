// InstanceDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './CourseInstanceDetails.css'; 

const InstanceDetails = () => {
    const { year, semester, id } = useParams();
    const [instance, setInstance] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`/api/instances/${year}/${semester}/${id}`)
            .then(response => setInstance(response.data))
            .catch(() => setError('Failed to fetch instance details.'));
    }, [year, semester, id]);

    return (
        <div className="instance-details">
            {error && <p className="error">{error}</p>}
            {instance ? (
                <div>
                    <h2>{instance.courseTitle}</h2>
                    <p><strong>Year:</strong> {instance.year}</p>
                    <p><strong>Semester:</strong> {instance.semester}</p>
                    <Link to="/instances" className="btn">Back to List</Link>
                </div>
            ) : <p>Loading...</p>}
        </div>
    );
};

export default InstanceDetails;
