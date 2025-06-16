import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LiaLinkedinIn } from "react-icons/lia";
import { TiSocialFacebook } from "react-icons/ti";
import { RiTwitterXLine } from "react-icons/ri";

function Articles() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Like & Comment states
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        let res, data;
        if (id) {
          res = await fetch(`http://localhost:8000/api/articles/${id}`);
          if (!res.ok) throw new Error(`Failed to fetch article ${id}`);
          data = await res.json();
          setArticle(data.data);
        } else {
          res = await fetch("http://localhost:8000/api/articles");
          if (!res.ok) throw new Error(`Failed to fetch articles`);
          data = await res.json();
          setArticles(data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-600">Error: {error}</div>;

  if (id && article) {
    return (
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 pr-4">
            <div className="text-sm mb-4">
              <p className="font-bold text-lg">{article.author?.name || "Unknown Author"}</p>
              <hr className="my-2" />
              <p className="text-gray-500">
                {new Date(article.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <hr className="my-2" />
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2"></h3>
              {article.category?.name && (
                <span className="text-black-600 text-sm">
                  {article.category.name}
                </span>
              )}
              <hr className="my-2" />
            </div>

            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-500" aria-label="Twitter">
                <RiTwitterXLine className="h-6 w-6 bg-blue-600 rounded-sm" />
              </a>
              <a href="#" className="text-white hover:text-blue-500" aria-label="Facebook">
                <TiSocialFacebook className="h-6 w-6 bg-blue-500 rounded-sm" />
              </a>
              <a href="#" className="text-white hover:text-blue-500" aria-label="LinkedIn">
                <LiaLinkedinIn className="h-6 w-6 bg-blue-400 rounded-sm" />
              </a>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="text-gray-500 text-xs mb-4">4 MIN READ</div>

            <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
            <div className="h-4" /> 

           {article.thumbnail && (
            <div className="mb-4">
              <img src={article.thumbnail} alt={article.title} className="rounded w-full" />
              <div className="h-4" /> {/* This adds vertical space below the image */}
            </div>
          )}

            <div
              className="prose max-w-none mb-6"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Like Button */}
            <div className="my-6">
              <button
                onClick={handleLike}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                👍 Like ({likes})
              </button>
            </div>

            {/* Comment Section */}
            <div className="my-6">
              <h3 className="text-lg font-semibold mb-2">Leave a Comment</h3>
              <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-2">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="border p-2 rounded w-full"
                  rows="3"
                  placeholder="Write your thoughts..."
                />
                <button
                  type="submit"
                  className="self-start bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Submit
                </button>
              </form>
              <div className="mt-4 space-y-2">
                {comments.map((c, i) => (
                  <div key={i} className="bg-gray-100 p-2 rounded">{c}</div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Article list view
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {articles.length === 0 ? (
        <div>No articles found.</div>
      ) : (
        <div className="grid gap-6">
          {articles.map((a) => (
            <div key={a.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{a.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(a.created_at).toLocaleDateString()}
              </p>
              <a href={`/articles/${a.id}`} className="text-blue-600 underline">
                Read more →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Articles;
