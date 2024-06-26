import React from "react";
import AlertDialog from "./Diloge";

export default function Items({ data, handleResolve, ind }) {
  const handleResolve1 = async () => {
    try {
      fetch(
        `https://truad-dashboard-backend.onrender.com/api/ticket/edit/${data._id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...data,
            status: "Resolve",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((data) => data.json())
        .then((el) => console.log(el));
    } catch (error) {
      console.log("error=>", error);
    }
  };
  return (
    <div className="InvoiceItemContainer">
      <div
        // className={data.status}
        className={
          data.status === "In Progress"
            ? "In-Progress"
            : data.status === "On Hold"
            ? "On-Hold"
            : "Resolve"
        }
        style={{
          height: "80%",
          marginLeft: "5px",
          borderRadius: "7px",
          width: "7%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span>{data.status}</span>
      </div>
      <div>
        <h6 style={{ margin: "0", padding: "0" }}>{data._id}</h6>
        <p style={{ margin: "0", padding: "0" }}>Last Update</p>
      </div>
      <div>
        <h6 style={{ margin: "0", padding: "0" }}>{data.supportTeam}</h6>
        <p style={{ margin: "0", padding: "0" }}>kuhgjuyf{data.emailId}</p>
      </div>
      <div>
        {/* <h6 style={{ margin: "0", padding: "0" }}>Rs. {data.ammount}</h6> */}
        <p style={{ margin: "0", padding: "0" }}>{data.subject}</p>
      </div>
      <div>
        {/* <h6 style={{ margin: "0", padding: "0" }}>Rs. {data.ammount}</h6> */}
        <button style={{ margin: "0", padding: "0" }}>View Image</button>
      </div>
      <div
        style={{
          height: "70%",
          marginRight: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <span className='patreview'>Pay</span>
         */}
        <button
          className="patreview"
          onClick={() => {
            handleResolve1();
          }}
          style={{
            visibility: data.status === "Resolve" ? "hidden" : "visible",
          }}
        >
          {" "}
          Mark Resolve
        </button>
        <button className="patreview">
          <AlertDialog data={data} />
        </button>
      </div>
    </div>
  );
}
