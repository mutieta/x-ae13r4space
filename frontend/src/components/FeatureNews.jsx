import React, { useEffect, useState } from "react";
import { TiArrowRightThick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";  // <-- import useNavigate
import Articles from "./Articles";

function FeatureNews() {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [thumbnailArticles, setThumbnailArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // <-- initialize navigate

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("http://localhost:8000/api/articles");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rawData = await response.json();
        console.log("API response data:", rawData);

        let data = [];
        if (Array.isArray(rawData)) {
          data = rawData;
        } else if (rawData.data && Array.isArray(rawData.data)) {
          data = rawData.data;
        } else {
          throw new Error("Invalid API response format");
        }

        // Sort by published_at descending (newest first)
        data.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

        setFeaturedArticles(data.slice(0, 4));
        setThumbnailArticles(data.slice(4, 8));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading || featuredArticles.length === 0) {
    return (
      <section id="news-section" className="px-8 py-12 bg-white w-full">
        <div className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-bold text-gray-800">Featured News</h2>
          </div>
          <div className="flex items-center justify-center h-96">
            <div className="text-xl text-gray-600">
              {loading ? "Loading latest news..." : "No articles available"}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="news-section" className="px-8 py-12 bg-white w-full">
        <div className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-bold text-gray-800">Featured News</h2>
          </div>
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="text-xl text-red-600 mb-2">Failed to load news</div>
              <div className="text-gray-600">{error}</div>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news-section" className="px-8 py-12 bg-white w-full">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-4xl font-bold text-gray-800">Featured News</h2>
          <div className="flex items-center space-x-2">
            <a
              href="/more-news"
              className="text-black-600 font-bold hover:underline"
            >
              More NASA News
            </a>
            <span className="w-6 h-6 flex items-center justify-center border-4 border-red-500 text-red-500 rounded-full text-sm">
              <TiArrowRightThick />
            </span>
          </div>
        </div>

        {/* Main Articles Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Feature */}
          <div className="w-full md:col-span-6">
            {featuredArticles[0] && (
              <div
                onClick={() => navigate(`/articles/${featuredArticles[0].id}`)}
                className="relative bg-cover bg-center overflow-hidden h-96 cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundImage: `url(${featuredArticles[0].thumbnail})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl text-white font-bold mb-4 leading-tight">
                    {featuredArticles[0].title}
                  </h3>
                </div>
              </div>
            )}
          </div>

          {/* Secondary Feature */}
          <div className="w-full md:col-span-3">
            {featuredArticles[1] && (
              <div
                onClick={() => navigate(`/articles/${featuredArticles[1].id}`)}
                className="relative bg-cover bg-center overflow-hidden h-96 cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundImage: `url(${featuredArticles[1].thumbnail})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col justify-end">
                  <h3 className="text-xl text-white font-bold mb-4 leading-tight">
                    {featuredArticles[1].title}
                  </h3>
                </div>
              </div>
            )}
          </div>

          {/* Mobile-only Third Article */}
          <div className="w-full md:hidden">
            {featuredArticles[2] && (
              <div
                onClick={() => navigate(`/articles/${featuredArticles[2].id}`)}
                className="relative bg-cover bg-center overflow-hidden h-96 cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundImage: `url(${featuredArticles[2].thumbnail})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl text-white font-bold mb-4 leading-tight">
                    {featuredArticles[2].title}
                  </h3>
                </div>
              </div>
            )}
          </div>

          {/* Desktop stacked articles */}
          <div className="w-full md:col-span-3 space-y-6">
            {featuredArticles[2] && (
              <div
                onClick={() => navigate(`/articles/${featuredArticles[2].id}`)}
                className="relative bg-cover bg-center overflow-hidden h-44 md:block hidden cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundImage: `url(${featuredArticles[2].thumbnail})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-end">
                  <h3 className="text-sm text-white font-bold leading-tight">
                    {featuredArticles[2].title}
                  </h3>
                </div>
              </div>
            )}

            {featuredArticles[3] && (
              <div
                onClick={() => navigate(`/articles/${featuredArticles[3].id}`)}
                className="relative bg-cover bg-center overflow-hidden h-44 md:block hidden cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundImage: `url(${featuredArticles[3].thumbnail})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-end">
                  <h3 className="text-sm text-white font-bold leading-tight">
                    {featuredArticles[3].title}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Articles Row */}
        <div className="hidden md:flex justify-between mt-8 gap-4">
          {thumbnailArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => navigate(`/articles/${article.id}`)}
              className="flex items-start flex-1 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <div
                className="w-20 h-16 bg-cover bg-center rounded mr-3 flex-shrink-0"
                style={{ backgroundImage: `url(${article.thumbnail})` }}
              ></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
                  {article.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureNews;
