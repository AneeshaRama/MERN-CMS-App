import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState({
    posts: [],
    categories: [],
  });

  const fetchAllPosts = async () => {
    try {
      await axios
        .get("/posts")
        .then((res) => setPost((prev) => ({ ...prev, posts: res.data.posts })));
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      await axios.get("/categories").then((res) => {
        setPost((prev) => ({ ...prev, categories: res.data.categories }));
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllPosts();
    fetchCategories();
  }, []);

  return (
    <PostContext.Provider value={[post, setPost]}>
      {children}
    </PostContext.Provider>
  );
};
