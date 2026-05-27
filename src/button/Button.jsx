import { useState } from "react";
import "./Button.css";

export default function Button() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      setLoading(false);
    //   alert("Task Complete!");
    },6000);
  };

  return (
    <div className="container">
      <button
        className={`btn ${loading ? "loading" : ""}`}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner"></span>
            Loading..
          </>
        ) : (
          "Submit"
        )}
      </button>
     
    </div>
  );
}