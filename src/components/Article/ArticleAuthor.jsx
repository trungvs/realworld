import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileFollowButton from "../Profile/ProfileFollowButton";
import ArticleFavorites from "./ArticleFavorites";

export default function ArticleAuthor(props) {
  const [author, setAuthor] = useState({});
  const [favorited, setFavorited] = useState(props.favorited);
  const [favoritesCount, setFavoritesCount] = useState(null);
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    setAuthor(props.author);
    setFavorited(props.favorited);
    setFavoritesCount(props.favoritesCount);
    setSlug(props.slug);
  }, []);

  useEffect(() => {
    console.log("fav", favorited)
  }, [favorited])

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
      <ProfileFollowButton
        username={author?.username}
        following={author?.following}
      />
      &nbsp;&nbsp;
      <ArticleFavorites
        favorited={favorited}
        favoritesCount={props.favoritesCount}
        slug={props.slug}
        handleClickButton={() => props.handleClickButton()}
      />
    </div>
  );
}
