import React, { useEffect, useState } from "react";
import "../styles.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UpdateCard from "./UpdateCard";
import UpdateNav from "./UpdateNav";

function Update() {
  const history = useHistory();
  // const location = useLocation();
  const username = localStorage.getItem("username");
  const backObj = {
    username: username,
  };
  const url = "http://localhost:8000/update/" + username;
  // const url = "http://localhost:8000" + location.pathname;
  // const username = location.pathname.slice(8);
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
    const response = await axios.post(url, backObj);
    setCourses(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    isLogged();
    getUser();
    // eslint-disable-next-line
  }, []);

  function showCourses(single, index) {
    return (
      <UpdateCard
        key={index}
        nameOfCourse={single.courseName}
        myUser={username}
      />
    );
  }

  return (
    <div className="homeDiv">
      <div>
        <UpdateNav username={username} />
      </div>

      <div className="updateVideoList">
        {courses && courses.map(showCourses)}
      </div>
    </div>
  );
}

export default Update;
