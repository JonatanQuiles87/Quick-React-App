import React, { useState } from 'react';
import { getCourseTerm, terms } from '../utilities/times';
import Course from './Course';


const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const [selected, setSelected] = useState([]);
  const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
  
  return (
    <>
      <TermSelector term={term} setTerm={setTerm} />
      <div className="course-list">
      { termCourses.map(course => <Course key={course.id} course={ course } selected={selected} setSelected={setSelected} />) }
      </div>
    </>
  );
};
Object.values(terms) // returns ["Fall", "Winter", "Spring"]

const TermSelector = ({term, setTerm}) => (
  <div className="btn-group">
  { 
    Object.values(terms)
      .map(value => <TermButton key={value} term={value} setTerm={setTerm} checked={value === term}  />)
  }
  </div>
);
const TermButton = ({term, setTerm, checked}) => (
  <>
    <input type="radio" id={term} className="btn-check" autoComplete="off" checked={checked} onChange={() => setTerm(term)}/>
    <label class="btn btn-success m-1 p-2" htmlFor={term}>
    { term }
    </label>
  </>
);

export default CourseList;