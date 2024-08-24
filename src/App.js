// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import CreateCourse from './components/CreateCourse';
import InstanceList from './components/CourseInstanceList';
import InstanceDetails from './components/CourseInstanceDetails';
import CreateInstance from './components/CreateInstance';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
    return (
        <Router>
            <div>
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<CourseList />} />
                    <Route path="/courses/:id" element={<CourseDetails />} />
                    <Route path="/create-course" element={<CreateCourse />} />
                    <Route path="/instances" element={<InstanceList />} />
                    <Route path="/instances/:year/:semester/:id" element={<InstanceDetails />} />
                    <Route path="/create-instance" element={<CreateInstance />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
