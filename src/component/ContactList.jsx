import React, { useEffect, useState } from "react";
import "./../App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const CONTACTS_LIST_API = "http://localhost:3000/contacts";

export default function ContactList() {
  const [isLoading, setIsLoading] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(CONTACTS_LIST_API);
        setContactList(res.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("data is not found , plz try later...");
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);
  const linkToContactDetails = (id) => {
    navigate(`/ContactDetails/${id}`);
  };
  const contactDeleteHandler = async (id) => {
    try {
      await axios.delete(`${CONTACTS_LIST_API}/${id}`);
      const res = await axios.get(CONTACTS_LIST_API);
      setContactList(res.data);
    } catch (error) {
      setError("There is a problem , plz try later...");
      console.log(error);
    }
  };
  return (
    <div>
      {isLoading && <div>is loading...</div>}
      {error ? (
        <div className="errorText">{error}</div>
      ) : (
        <>
          {contactList.length === 0 && isLoading === false && (
            <div>no contact in here</div>
          )}
          {contactList.map(({ id, name }) => {
            return (
              <div className="contact-List" key={id}>
                <div className="contact-list__header">
                  <h4 onClick={() => linkToContactDetails(id)}>{name}</h4>
                </div>
                <div className="changes-btn">
                  <Link className="btn-link" to={`/`}>
                    edit
                  </Link>
                  <button
                    className="btn-delete"
                    onClick={() => contactDeleteHandler(id)}
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
