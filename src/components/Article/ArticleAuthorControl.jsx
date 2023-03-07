import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteArticle } from "./ArticleServices";

export default function ArticleAuthorControl(props) {
  const navigate = useNavigate();
  const [author, setAuthor] = useState({});
  const [slug, setSlug] = useState(null);

  const handleDelete = () => {
    deleteArticle(slug).then((res) => {
      navigate("/");
    });
  };

  useEffect(() => {
    setAuthor(props.author);
    setSlug(props.slug);
  }, [props.favorited]);

  return (
    <div className="article-meta">
      <Link to={`/${author?.username}`}>
        <img src={author?.image} alt={author?.image} />
      </Link>
      <div className="info">
        <Link to={`/${author?.username}`} className="author">
          {author?.username}
        </Link>
        <span className="date">
          {new Date(props?.createdAt).toLocaleDateString()}
        </span>
      </div>
      <span className="ng-scope">
        <Link
          to={`/editor/${slug}`}
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="ion-edit"></i> Edit Article
        </Link>
        &nbsp;&nbsp;
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleDelete}
        >
          <i className="ion-trash-a"></i> Delete Article
        </button>
      </span>
    </div>
  );
}
