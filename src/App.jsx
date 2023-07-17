import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import NewContact from './NewContact';
import ContactDetails from './ContactDetails';
import EditContacts from './editContacts';
function App() {
  return (
    <div className="App">
      <Routes>
        {/* <h1>d</h1> */}
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/newContact" element={<NewContact></NewContact>}></Route>
        <Route
          path="/ContactDetails/:id"
          element={<ContactDetails></ContactDetails>}
        ></Route>
        <Route
          path="/EditContacts/:id"
          element={<EditContacts></EditContacts>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App
