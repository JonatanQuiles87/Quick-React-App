import React from 'react';
import './App.css';
import CourseList from './components/CourseList';
import { addScheduleTimes } from './utilities/times';
import { useData } from './utilities/firebase.js';
import { QueryClient, QueryClientProvider, useQuery } from "react-query"; 
/*
const schedule = {
  "title": "CS Courses for 2018-2019",
  "courses": {
    "F101" : {
      "id" : "F101",
      "meets" : "MWF 11:00-11:50",
      "title" : "Computer Science: Concepts, Philosophy, and Connections"
    },
    "F110" : {
      "id" : "F110",
      "meets" : "MWF 10:00-10:50",
      "title" : "Intro Programming for non-majors"
    },
    "S313" : {
      "id" : "S313",
      "meets" : "TuTh 15:30-16:50",
      "title" : "Tangible Interaction Design and Learning"
    },
    "S314" : {
      "id" : "S314",
      "meets" : "TuTh 9:30-10:50",
      "title" : "Tech & Human Interaction"
    }
  }
};
*/

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

/*const fetchSchedule = async () => {
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';
  const response = await fetch(url); 
  if (!response.ok) throw response;
  return addScheduleTimes(await response.json());
};*/

const Main = () =>  {
  const [schedule, loading, error] = useData('/', addScheduleTimes);
  console.log(schedule,'´ciao')
  
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>

  return (
    <div className="container">
  
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } /> 
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);


export default App;
