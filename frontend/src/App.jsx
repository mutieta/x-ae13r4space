import React from 'react';
import { Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import NewsPage from './components/NewsPage';
import Subscribe from "./components/LetterBox";
import Asteroids from './components/Asteroids';
import PeopleOfNasa from './components/PeopleOfNasa';
import ApodDetail from './components/ApodDetail';
import Apod from './components/Apod';
import SpaceXmission from './components/SpaceXmission';
import MissionSummarize from './components/MissionSummarize';
import AuthenticatorLogin from './components/AuthenticatorLogin';
import AuthenticatorSignUp from './components/AuthenticatorSignUp';
import ExploreNav from './components/ExploreNav';
import Articles from './components/Articles';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/Asteroids" element={<Asteroids />} />
        <Route path="/PeopleOfNasa" element={<PeopleOfNasa />} />
        <Route path="/ApodDetail" element={<ApodDetail />} />
        <Route path="/Apod" element={<Apod />} />
        <Route path="/ExploreNav" element={<ExploreNav />} />
        <Route path="/SpaceXmission" element={<SpaceXmission />} />
        <Route path="/MissionSummarize/:id" element={<MissionSummarize />} />
        <Route path="/AuthenticatorSignUp" element={<AuthenticatorSignUp />} />
        <Route path="/AuthenticatorLogin" element={<AuthenticatorLogin />} />
        <Route path="/Articles" element={<Articles />} />
        <Route path="/Articles/:id" element={<Articles />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
