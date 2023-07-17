import React from "react";
import { Link } from "react-router-dom";
import ContactList from "./component/ContactList";
import "./App.css"

export default function Home() {
  return (
    <div className="container">
      <div className="home__header">
        <h1>contact list</h1>
        <Link className="btn-link" to="/newContact">
          add
        </Link>
      </div>
      <div className="contactlist">
        <ContactList></ContactList>
      </div>
    </div>
  );
}
