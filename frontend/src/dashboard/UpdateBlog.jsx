import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const [oldBlogImage, setOldBlogImage] = useState("");
  const [loading, setLoading] = useState(false);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBlogImagePreview(reader.result);
        setBlogImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
          }
        );
        setTitle(data?.title || "");
        setCategory(data?.category || "");
        setAbout(data?.about || "");
        setOldBlogImage(data?.blogImage?.url || "");
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch blog data.");
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    if (blogImage) {
      formData.append("blogImage", blogImage);
    }

    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message || "Blog updated successfully!");
      navigateTo("/");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(
        error.response?.data?.message || "Failed to update the blog."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-12 p-4">
      <section className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">UPDATE BLOG</h3>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Category</label>
            <select
              className="w-full p-2 border rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
            >
              <option value="">Select Category</option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="BLOG MAIN TITLE"
            className="w-full p-2 mb-4 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
          <div className="mb-4">
            <label className="block mb-2 font-semibold">BLOG IMAGE</label>
            <img
              src={
                blogImagePreview || (oldBlogImage ? `${oldBlogImage}?${Date.now()}` : "/imgPL.webp")
              }
              alt="Blog Preview"
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <input
              type="file"
              className="w-full p-2 border rounded-md"
              onChange={changePhotoHandler}
              disabled={loading}
            />
          </div>
          <textarea
            rows="6"
            className="w-full p-2 mb-4 border rounded-md"
            placeholder="Write something about your blog"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className={`w-full p-3 text-white rounded-md ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
            disabled={loading}
          >
            {loading ? "UPDATING..." : "UPDATE"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default UpdateBlog;

