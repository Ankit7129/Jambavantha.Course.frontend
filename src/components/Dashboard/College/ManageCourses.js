import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './ManageCourses.css'; // Optional: import CSS for styling

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/college/courses');
      setCourses(response.data);
    } catch (error) {
      setError('Error fetching courses, please try again.');
    }
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/college/courses/${courseId}`);
      setCourses(courses.filter((course) => course._id !== courseId)); // Update the course list
    } catch (error) {
      setError('Error deleting course, please try again.');
    }
  };

  return (
    <div className="manage-courses-container">
      <h2>Manage Your Courses</h2>

      {/* Description for the page */}
      <p className="page-description">
        This page allows you to view, manage, and edit the courses you have added to the system. 
        You can review course details such as the name, description, price, and duration, and perform actions like editing 
        or deleting courses. 
      </p>

      {error && <p className="error-message">{error}</p>}

      <ul className="course-list">
        {courses.map((course) => (
          <li key={course._id} className="course-item">
            <h3>{course.courseName}</h3>
            <p>{course.description}</p>
            <p>Price: ${course.price}</p>
            <p>Duration: {course.duration}</p>
            {/* Display remarks safely */}
            <p>
              <strong>Remarks:</strong> 
              {Array.isArray(course.remarks) && course.remarks.length > 0
                ? course.remarks.join(', ')
                : 'No remarks available'}
            </p>
            <button onClick={() => handleDelete(course._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCourses;
