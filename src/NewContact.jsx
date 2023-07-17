import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const CONTACTS_LIST_API = "http://localhost:3000/contacts";
export default function NewContact() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState({ success: "", error: "" });
  const addContactHandler = async () => {
    try {
      await axios.post(CONTACTS_LIST_API, { name, number });
    } catch (error) {
      setStatus({
        error: "There is a problem. Plz try again",
        success: "",
      });
      console.log(error);
    }
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if ((number.trim(), name.trim())) {
      addContactHandler();
      setName("");
      setNumber("");
      setStatus({
        error: "",
        success: "contact saved",
      });
      setTimeout(() => {
        setStatus({ success: "" });
      }, 3000);
    } else
      setStatus({
        error: "Name and number cannot be empty.",
        success: "",
      });
    setTimeout(() => {
      setStatus({ error: "" });
    }, 3000);
  };
  return (
    <div className="container">
      <div className="title">
        <h2>Add new Contact</h2>
        <Link to="/" className="btn-back">
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
        <button
          className="btn-link"
          type="submit"
          style={{ border: "none", marginBottom: "10px" }}
        >
          add
        </button>
      </form>
      {status.success && <p className="successText">{status.success}</p>}
      {status.error && <p className="errorText">{status.error}</p>}
    </div>
  );
}
