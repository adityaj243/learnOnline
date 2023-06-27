import React, { useEffect, useState } from "react";
import "../styles.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Homecard from "./Homecard";
import Navbar from "./Navbar";

function Home() {
  const history = useHistory();
  const username = localStorage.getItem("username");
  const url = "http://localhost:8000/home/" + username;
  const [courses, setCourses] = useState([]);
  async function isLogged() { 
    const logginObj = {
      urlUsername: username,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/islogged",
        logginObj,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      if (!response.data.auth) {
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getUser = async function () {
    const response = await axios.get(url);
    setCourses(response.data);
  };
  useEffect(() => {
    isLogged();
    getUser();
    // eslint-disable-next-line
  }, []);

  function showCourses(single, index) {
    return (
      <Homecard
        key={index}
        nameOfCourse={single.courseName}
        usersName={username}
        founder={single.username}
      />
    );
  }

  return (
    <div className="homeDiv">
      <div>
        <Navbar username={username} />
      </div>
      {/* <div className="homeUpperDiv">
        <button className="homeButton">Contacts</button>
        <button className="homeButton">About</button>
        <button className="homeButton">Logout</button>
      </div> */}

      <div className="homeCoursesArea">
        {courses && courses.map(showCourses)}
      </div>

      {/* <div className="homeLowerDiv">
        <div className="homeCopyRight">
          <p>Copyrights©️2023</p>
          <p>~Aditya Joshi</p>
        </div>
        <button
          className="homeLowerButton"
          onClick={() => {
            history.push("/insert/" + username);
          }}
        >
          INSERT A COURSE
        </button>
      </div> */}
    </div>
  );
}

export default Home;
