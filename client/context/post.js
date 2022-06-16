import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState({
    posts: [],
    categories: [],
  });

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
    fetchCategories();
  }, []);

  return (
    <PostContext.Provider value={[post, setPost]}>
      {children}
    </PostContext.Provider>
  );
};
