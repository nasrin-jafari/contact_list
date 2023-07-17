import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const CONTACTS_LIST_API = "http://localhost:3000/contacts";
export default function NewContact() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState({ success: "", error: "" });
  const [isLoading, setIsLoading] = useState(false);
  const addContactHandler = async () => {
    try {
      setIsLoading(true);
      await axios.post(CONTACTS_LIST_API, { name, number });
      setIsLoading(false);
      console.log("Contact added successfully!");
      setStatus({ error: "", success: "Contact added successfully." });
    } catch (error) {
      setIsLoading(false);
      setStatus({
        error: "There is a problem. Please try leter",
        success: "",
      });
      console.log("Error adding contact:", error);
    }
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if ((number.trim(), name.trim())) {
      addContactHandler();
      setName("");
      setNumber("");

      setStatus({
        error: "Phone number starts with 09 and must be 11 characters.",
        success: "",
      });
    } else
      setStatus({
        error: "Name field cannot be empty.",
        success: "",
      });
  };
  return (
    <div className="container">
      <div className="title">
        <h2>Add new Contact</h2>
        <Link to="/" className="btn-back" >
          Back to Home
        </Link>
      </div>
      <form onSubmit={formSubmitHandler}>
        <input
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Enter your Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="input"
        />
        <button className="btn-link" type="submit" style={{border : "none"}}>
          {isLoading ? "Adding..." : "Add"}
        </button>
      </form>
      {status.success && <p className="successText">{status.success}</p>}
      {status.error && <p className="errorText">{status.error}</p>}
    </div>
  );
}