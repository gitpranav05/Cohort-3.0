import React, { useEffect, useState } from "react";


export function useFetch(url) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function getDetails() {
      setLoading(true);
      const resp = await fetch(url);
      const data = await resp.json();
      setData(data );
      setLoading(false);
    }
    getDetails();
  }, [url]);
  
  return {
    data,
    loading
  };
}

// function usePostTitle() {
//   const [post, setPost] = useState({});
  

//   useEffect(() => {
//     async function getPosts() {
//       const resp = await fetch("https://jsonplaceholder.typicode.com/posts/1");
//       const json = await resp.json();
//       setPost(json);
//     }

//     getPosts();
//   }, []);

//   return post.title;
// }