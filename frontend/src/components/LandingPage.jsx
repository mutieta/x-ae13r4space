import React from "react";
import { useNavigate } from "react-router-dom";
import EarthInfoCenter from "./EarthInfoCenter";
import Explore from "./Explore";
import ImageNasa from "./ImageNasa";
import ImageOfTheDay from "./ImageOfTheDay";
import Science from "./Science";
import VideoHighlight from "./VideoHighlight";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FeatureNews from "./FeatureNews";
import { GoogleLogin } from "@react-oauth/google";


function LandingPage() {
  const navigate = useNavigate();
  
  return (
    <>
      <Navbar />
      <section
        className="relative w-full h-screen bg-black flex items-center justify-start px-8"
        style={{
          backgroundImage: `url(/image/54549847993-8be70b978d-o.webp)`, // Correct file path to the image
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-xl text-shadow-lg/30 pl-12 text-white ">
          {/* Title */}
          <h1 className="text-6xl font-bold mb-4 text-shadow-lg/30">Humans in Space</h1>
          {/* Description */}
          <p className="text-lg mb-6 text-shadow-lg/30">
            X-Æ13R4Space is a space adventure that will take users to explore
            beyond comic travel, back and forth through the timeline. Take a
            moment to explore and enjoy the sensation.
          </p>
          {/* Call-to-Action Button */}
          <button
            className="px-6 py-3 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 focus:outline-none"
            onClick={() => navigate('/news')}
          >
            Invention & Technology
          </button>
        </div>
      </section>
      <FeatureNews />
      <Science />
      <VideoHighlight />
      <EarthInfoCenter />
      <ImageOfTheDay />
      <ImageNasa />
      <Explore />
      <Footer />

    </>
  );
}

export default LandingPage;
