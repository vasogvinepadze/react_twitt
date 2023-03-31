import React, { useEffect, useState } from "react";
import TwitterPost from "./TwitterPost";
import { RotatingLines } from "react-loader-spinner";

const url = "https://jsonplaceholder.typicode.com/posts";

const TwitterNewsFeed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [posts, setPosts] = useState([]);

  // const fetchPosts = async () => {
  //   const fetchData = await fetch("https://jsonplaceholder.typicode.com/posts");
  //   const data = await fetchData.json();
  //   console.log(data);
  //   setPosts(data);
  // };

  useEffect(() => {
    fetch(url)
      .then((resp) => {
        if (resp.status >= 200 && resp.status <= 299) {
          return resp.json();
        } else {
          setIsError(true);
          setIsLoading(false);
          setPosts(resp.status);
        }
      })
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isLoading) {
    return (
      <div className="news-feed">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="news-feed">
        <h1>{`Error: ${posts}`}</h1>
      </div>
    );
  }

  return (
    posts &&
    posts.map((post) => {
      return <TwitterPost key={post.id} postId={post.id} />;
    })
  );
};

export default TwitterNewsFeed;
