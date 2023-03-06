import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getAllComments,
  createComment,
  deleteComment,
} from "./ArticleServices";
import { useUserContext } from "../../contexts/user_context";

export default function ArticleComment({ slug }) {
  const params = useParams();
  const { isLogin, userInfo } = useUserContext();
  const [commentList, setCommentList] = useState(null);
  const [reload, setReload] = useState(false);
  const commentContent = useRef(null);

  const handleChange = (e) => {
    commentContent.current.value = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentContent !== null && commentContent.length !== 0) {
      createComment(params.slug, {
        comment: {
          body: commentContent.current.value,
        },
      }).then((res) => {
        if (res.data.comment.id) {
          commentContent.current.value = "";
          setReload(!reload);
        }
      });
    }
  };

  const handleDeleteComment = (id) => {
    deleteComment(params.slug, id).then((res) => {
      setReload(!reload);
    });
  };

  useEffect(() => {
    getAllComments(params.slug).then((res) => {
      setCommentList(res.data.comments);
    });
  }, [reload]);
  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        {isLogin && (
          <form className="card comment-form" onSubmit={handleSubmit}>
            <div className="card-block">
              <textarea
                className="form-control"
                placeholder="Write a comment..."
                rows="3"
                onChange={handleChange}
                ref={commentContent}
              ></textarea>
            </div>
            <div className="card-footer">
              <img src={userInfo?.image} className="comment-author-img" />
              <button type="submit" className="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
          </form>
        )}

        {commentList &&
          commentList
            .sort((a, b) => b.id - a.id)
            .map((comment) => (
              <div className="card" key={comment?.id}>
                <div className="card-block">
                  <p className="card-text">{comment?.body}</p>
                </div>
                <div className="card-footer">
                  <Link
                    to={`/${comment?.author?.username}`}
                    className="comment-author"
                  >
                    <img
                      src={comment?.author?.image}
                      className="comment-author-img"
                    />
                  </Link>
                  &nbsp;
                  <Link
                    to={`/${comment?.author?.username}`}
                    className="comment-author"
                  >
                    {comment?.author?.username}
                  </Link>
                  <span className="date-posted">
                    {new Date(comment?.createdAt).toLocaleDateString()}
                  </span>
                  {isLogin &&
                    userInfo?.username === comment?.author?.username && (
                      <span
                        className="mod-options"
                        onClick={() => handleDeleteComment(comment?.id)}
                      >
                        <i className="ion-trash-a"></i>
                      </span>
                    )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
