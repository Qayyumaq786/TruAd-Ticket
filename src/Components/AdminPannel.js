import React, { useEffect, useState } from "react";
import "./admin.css";
import Items from "./Items";


function Invoices() {
  const [catagory, setCatagory] = useState("All");
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://truad-dashboard-backend.onrender.com/api/ticket/all")
      .then((data) => data.json())
      .then(({ tickets }) => {
        setData(tickets);
        setList(tickets);
      });
  }, [data]);

  const [headings, setHeading] = useState([
    { name: "All", isActive: true },
    { name: "In Progress", isActive: false },
    { name: "On Hold", isActive: false },
    { name: "Resolve", isActive: false },
  ]);

  function handleResolve(index) {
    const newArr = [...list];
    newArr[index].status = "Resolve";
    setList(newArr);
  }

  function handleActive(i) {
    const newHead = [...headings];
    newHead.forEach((e, ind) => {
      if (i === ind) {
        e.isActive = true;
      } else {
        e.isActive = false;
      }
    });
  }
  useEffect(() => {
    if (catagory === "All") {
      setList(data);
    } else {
      const d = [...data];
      const newArr = d.filter((e) => {
        return e.status === catagory;
      });
      setList(newArr);
    }
  }, [catagory, list]);

  return (
    <div
      style={{
        width: "100%",
        flexGrow: "1",
        backgroundColor: "#6c757d",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          backgroundColor: "#212529",
          margin: "10px",
          borderRadius: "7px",
          boxShadow: "rgba(0, 0, 0, 0.4) 0px 3px 8px",
          color: "white",
        }}
      >
        Tickets
      </h1>

      <div
        style={{
          display: "flex",
          margin: "10px",
          justifyContent: "space-between",
          backgroundColor: "#343a40",
          alignItems: "center",
          boxShadow: "rgba(0, 0, 0, 0.4) 0px 3px 8px",
          borderRadius: "7px",
        }}
      >
        <div className="ch1p">
          {headings.map((e, i) => {
            return (
              <div
                key={i}
                className="ch1"
                style={
                  e.isActive
                    ? { backgroundColor: "blue", color: "white" }
                    : { backgroundColor: "white" }
                }
                onClick={() => {
                  setCatagory(e.name);
                  handleActive(i);
                }}
              >
                <span>{e.name}</span>
              </div>
            );
          })}
        </div>
        <div style={{ width: "49%" }}>
          <div className="ch2">
            <input className="inputCapture" type="text" />
            <button>
              <span>search</span>
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          margin: "10px",
          justifyContent: "space-between",
          backgroundColor: "#343a40",
          alignItems: "center",
          boxShadow: "rgba(0, 0, 0, 0.4) 0px 3px 8px",
          borderRadius: "7px",
        }}
      >
        <div style={{ width: "100%", margin: "10px" }}>
          {list.map((e, i) => {
            return <Items data={e} handleResolve={handleResolve} ind={i} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Invoices;
