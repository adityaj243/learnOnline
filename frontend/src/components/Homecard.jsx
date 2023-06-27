import React from "react";
import { useHistory } from "react-router-dom";
import "../styles.css";

function Homecard(props) {
  const history = useHistory();
  const url =
    "/course/" +
    props.usersName +
    "/" +
    props.nameOfCourse +
    "/founder/" +
    props.founder;
  return (
    <div className="card">
      <div className="image">
        <img src="/pictures/courseicon.png" alt="user" />
      </div>
      <hr />
      <div className="title">
        <h1>{props.nameOfCourse}</h1>
      </div>
      {/* <div class="des">
        <p className="description">
          You can Add Desccription You can Add Desccription You can Add
          Desccription
        </p>
        <p className="courseFounder">{"~" + props.founder}</p>
      </div> */}
      <button
        onClick={() => {
          localStorage.setItem("coursename", props.nameOfCourse);
          localStorage.setItem("foundername", props.founder);
          history.push(url);
        }}
      >
        View Course
      </button>
    </div>
  );
}

export default Homecard;
