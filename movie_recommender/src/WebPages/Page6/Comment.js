import React, { useEffect, useState } from "react";
import style from "../Styles/comment.module.css";
import { FaLocationArrow } from "react-icons/fa6";
const Comment = ({ movieId, movieTitle }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const storedComments =
      JSON.parse(localStorage.getItem(`comments_${movieId}`)) || [];

    const updatedComments = storedComments.map((comment) => ({
      ...comment,
      replies: comment.replies || [],
    }));

    setComments(updatedComments);
    localStorage.setItem(
      `comments_${movieId}`,
      JSON.stringify(updatedComments)
    );
  }, [movieId]);

  const saveComment = () => {
    if (!newComment.trim() || !userName.trim()) {
      return;
    }

    const commentObj = {
      id: Date.now(),
      name: userName,
      text: newComment,
      date: new Date().toLocaleString(),
      replies: [],
    };

    const updatedComments = [...comments, commentObj];
    setComments(updatedComments);
    localStorage.setItem(
      `comments_${movieId}`,
      JSON.stringify(updatedComments)
    );

    setNewComment("");
    setUserName("");
  };

  const deleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
    localStorage.setItem(
      `comments_${movieId}`,
      JSON.stringify(updatedComments)
    );
  };

  const addReply = (commentId) => {
    if (!replyText.trim()) return;

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: Date.now(),
              text: replyText,
              date: new Date().toLocaleString(),
            },
          ],
        };
      }
      return comment;
    });

    setComments(updatedComments);
    localStorage.setItem(
      `comments_${movieId}`,
      JSON.stringify(updatedComments)
    );
    setReplyingTo(null);
    setReplyText("");
  };

  return (
    <div className={`${style.commentsSection} `}>
      <div className={style.heading}>
        Comments for {movieTitle}
      </div>

      <div
        className={style.commentInputContainer}
        style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column" }}
      >
        <input
          type="text"
          color="white"
          placeholder="Stay Anonymous"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className={style.commentInputname}
        />
        <div style={{display:"flex",width:"98%"}}>
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className={style.commentInput}
        />
        <button
          onClick={saveComment}
          className={style.commentButton}
        >
        <FaLocationArrow />

        </button>
        </div>
       
      </div>

      <div
        className={style.commentsList}
        style={{ maxHeight: "200px", overflowY: "auto" }}
      >
        {comments.length === 0 ? (
          <p style={{textAlign: "center",color:"aliceblue" }}>
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "5px",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  color:"#ff79c6",
                }}
              >
                {comment.name}
              </div>
              <div
                style={{ marginTop: "5px", color:"#ddd"  }}
              >
                {comment.text}
              </div>
              <div
                style={{
                  fontSize: "0.8em",
                  color:"#bbb" ,
                  marginTop: "10px",
                }}
              >
                {comment.date}
              </div>
              {/* <button
                onClick={() => deleteComment(comment.id)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "3px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button> */}
              <button
                onClick={() => setReplyingTo(comment.id)}
                style={{
                  marginTop: "10px",
                  backgroundColor: "blue",
                  color: "white",
                  borderRadius: "3px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Reply
              </button>
              {replyingTo === comment.id && (
                <div style={{ marginTop: "10px",display:"flex",width:"100%" }}>
                  <textarea
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className={style.commentInput}
                  />
                  <button
                    onClick={() => addReply(comment.id)}
                    className={style.commentButton}
                  
                  >
                   <FaLocationArrow />

                  </button>
                </div>
              )}
              {comment.replies.length > 0 && (
                <div
                  style={{
                    marginTop: "10px",
                    paddingLeft: "20px",
                    borderLeft: "2px solid #ccc",
                  }}
                >
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      style={{
                        marginTop: "5px",
                        backgroundColor: "#555" ,
                        padding: "10px",
                        borderRadius: "5px",
                      }}
                    >
                      <div style={{ color:"#ddd" }}>
                        {reply.text}
                      </div>
                      <div
                        style={{
                          fontSize: "0.8em",
                          color:"#bbb" ,
                        }}
                      >
                        {reply.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comment;

