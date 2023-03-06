import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileFollowButton from "../Profile/ProfileFollowButton";
import ArticleFavorites from "./ArticleFavorites";

export default function ArticleAuthor(props) {
  const [author, setAuthor] = useState({});
  const [favorited, setFavorited] = useState(null);
  const [favoritesCount, setFavoritesCount] = useState(null);
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    setAuthor(props.author);
    setFavorited(props.favorited);
    setFavoritesCount(props.favoritesCount);
    setSlug(props.slug);
  }, [props.favorited]);
  return (
    <div class="article-meta">
      <Link to={`/${author?.username}`}>
        <img src={author?.image} />
      </Link>
      <div class="info">
        <Link to={`/${author?.username}`} class="author">
          {author?.username}
        </Link>
        <span class="date">
          {new Date(props?.createdAt).toLocaleDateString()}
        </span>
      </div>
      <ProfileFollowButton
        username={author?.username}
        following={author?.following}
      />
      &nbsp;&nbsp;
      <ArticleFavorites
        favorited={props.favorited}
        favoritesCount={props.favoritesCount}
        slug={props.slug}
      />
    </div>
  );
}
