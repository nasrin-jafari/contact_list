import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
const CONTACTS_LIST_API = "http://localhost:3000/contacts";
import axios from "axios";

export default function ContactDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState([]);
  const { name, number } = contactInfo;
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${CONTACTS_LIST_API}/${id}`);
        setIsLoading(false);
        setContactInfo(res.data);
      } catch (error) {
        setIsLoading(false);
        setError("contact not found...plx try again");
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container">
      {isLoading && <div>is loading...</div>}
      {error ? (
        <div className="errorText">{error}</div>
      ) : (
        <>
          <h1 className="contactInfo--title">contact info </h1>
          <div className="contactInfo-Warpper">
            <h1>name : </h1>
            <h2>{name}</h2>
          </div>
          <div className="contactInfo-Warpper">
            <h2>number : </h2>
            <h2>{number}</h2>
          </div>
          <Link to="/" className="btn-back">
            back to contact list
          </Link>
        </>
      )}
    </div>
  );
}
