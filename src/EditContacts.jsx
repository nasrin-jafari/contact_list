import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
const CONTACTS_LIST_API = "http://localhost:3000/contacts";
import axios from "axios";
export default function EditContact() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const navigateTo = useNavigate();
  const [error, setError] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    const fetchData = async () => {
      try {
        const response = await axios.get(`${CONTACTS_LIST_API}/${id}`);
        const { name, number } = response.data;
        setName(name);
        setNumber(number);
      } catch (e) {
        setError("data not found. Plz try leter");
        console.log(e);
      }
    };
    fetchData();
  }, []);
  const editFormHandler = async (e) => {
    e.preventDefault();
    if (name.trim() && number.trim()) {
      try {
        await axios.put(`${CONTACTS_LIST_API}/${id}`, { name, number });
        navigateTo("/");
      } catch (e) {
        setError("There is a problem. Please try leter.");
        console.log(e);
      }
    } else {
      setError("feilds connot be empty");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div className="container">
      <div className="title">
        <h1>Edit Contact</h1>
        <Link to="/" className="btn-back">
          Back to Home
        </Link>
      </div>
      <form onSubmit={editFormHandler}>
        <input
          type="text"
          value={name}
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          ref={inputRef}
        />
        <input
          type="text"
          value={number}
          defaultValue={number}
          onChange={(e) => setNumber(e.target.value)}
          className="input"
        />
        <button
          className="btn-link"
          type="submit"
          style={{ border: "none", marginBottom: "20px" }}
        >
          edit
        </button>
      </form>
      {error && <p className="errorText">{error}</p>}
    </div>
  );
}