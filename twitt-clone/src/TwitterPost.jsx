import React, { useState, useEffect } from "react";
import {
  MdFavorite,
  MdOutlineHeartBroken,
  MdModeComment,
} from "react-icons/md";
import "./twitterPost.css";

const TwitterPost = (porps) => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState(null);
  const { postId } = porps;
  const [like, setLike] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [mark, setMark] = useState(false);
  const [raiting, setRaiting] = useState(false);

  const getPost = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await res.json();
    return data;
  };
  const getComment = async (id) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${id}`
    );
    const data = await res.json();
    return data;
  };
  const getPhoto = async (id) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?id=${id}`
    );
    const data = await res.json();
    return data;
  };
  const getUser = async (id) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users?id=${id}`
    );
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const fetchFullPost = async (id) => {
      const newPost = await getPost(id);
      const newPhoto = await getPhoto(newPost.id);
      const newUser = await getUser(newPost.userId);
      const newComment = await getComment(newPost.id);
      setPost(newPost);
      setUser(newUser);
      setPhoto(newPhoto);
      setComment(newComment);
    };
    fetchFullPost(postId);
  }, []);

  const toggleLike = () => setLike(!like);
  const toggleComment = () => setIsComment(!isComment);
  const toggleDot = () => setMark(!mark);
  const toggleReport = () => setRaiting(!raiting);
  const userInfo = user && user[0];

  return (
    post &&
    user &&
    comment &&
    photo && (
      <div className="twitt-post">
        <div className="profile-pic">
          {userInfo.name && userInfo.name.charAt(0).toUpperCase()}
        </div>
        <div className="user-info">
          <h3 className="username">{userInfo.name && userInfo.name}</h3>

          <h3 className="userlogin">
            @{userInfo.username && userInfo.username}
          </h3>
          <div className="btnOne">
            <button onClick={toggleDot} className="dot">
              ...
            </button>
            {mark && (
              <div className="btn">
                <button onClick={toggleReport}>
                  {raiting ? "Raiting" : "Unraiting"}
                </button>
                <button>Report</button>
              </div>
            )}
          </div>
        </div>
        <div className="profile-wrapper">
          <div className="userinfo-wrapper">
            <p className="user-text">{post.title}</p>
          </div>
        </div>

        <div className="post-content">
          <p className="post-text">{post.body}</p>
          <img src={photo[0].url} alt="" className="post-img" />

          <div className="btns">
            <button onClick={toggleComment}>
              <MdModeComment />
            </button>
            <button className="heart-btn" onClick={toggleLike}>
              {like ? <MdFavorite /> : <MdOutlineHeartBroken />}
            </button>
          </div>

          {isComment &&
            comment.map((com) => {
              return (
                <div key={com.id} className="comment">
                  <p>{com.name}</p>
                  <p>{com.email}</p>
                  <p>{com.body}</p>
                </div>
              );
            })}
        </div>
      </div>
    )
  );
};

export default TwitterPost;
