import React from "react";

const Output = ({ output }) => (
  <div
    style={{
      marginTop: "20px",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      backgroundColor: "#f9f9f9",
      whiteSpace: "pre-wrap",
    }}
  >
    <strong style={{ color: "black" }}>Вывод:</strong>
    <pre style={{ color: "black" }}>{output}</pre>
  </div>
);

export default Output;
