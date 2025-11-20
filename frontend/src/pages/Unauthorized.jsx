import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#ffe6e6",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "120px",
          fontWeight: "900",
          color: "#e60000",
          margin: "0",
        }}
      >
        401
      </h1>

      <h2
        style={{
          fontSize: "32px",
          fontWeight: "600",
          color: "#b30000",
          marginTop: "10px",
        }}
      >
        Unauthorized Access
      </h2>

      <p
        style={{
          fontSize: "18px",
          color: "#cc0000",
          marginTop: "10px",
          maxWidth: "400px",
        }}
      >
        You are not allowed to view this page or perform this action.
      </p>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          gap: "20px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "12px 28px",
            borderRadius: "10px",
            backgroundColor: "#ffcccc",
            color: "#800000",
            fontWeight: "600",
            cursor: "pointer",
            border: "none",
          }}
        >
          ← Go Back
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            padding: "12px 28px",
            borderRadius: "10px",
            backgroundColor: "#ff1a1a",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            border: "none",
          }}
        >
          🏠 Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
