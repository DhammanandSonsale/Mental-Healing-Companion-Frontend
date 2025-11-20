import React from 'react'
import Navbar from './Pages/Navbar.jsx'
import Home from "./Pages/Main/Home.jsx";
import Resources from "./Pages/Resources/Resources.jsx";
import Footer from "./Pages/Footer.jsx";
import About from "./Pages/About/About.jsx";
import Contact from './Pages/Contact/Contact.jsx';
import DailyHealingCompanion from './Pages/Tasks/DailyHealingCompanion.jsx';
import Que from './Pages/Questionaire/Que.jsx';  
import Login from './Pages/User/Login.jsx';
import UserDashboard from './Pages/Profile/Dashboard.jsx';
import { Route, Routes } from 'react-router-dom';
import './index.css';
import NotFound from './Pages/NotFound.jsx';


function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dailyhealing" element={<DailyHealingCompanion />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/questionaire" element={<Que />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App