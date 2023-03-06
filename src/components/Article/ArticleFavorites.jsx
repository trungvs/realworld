import React, { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/user_context";
import { useNavigate } from "react-router-dom";
import { favoriteArticle, unFavoriteArticle } from "./ArticleServices";

export default function ArticleFavorites(props) {
  const { isLogin } = useUserContext();
  const navigate = useNavigate();
  const [slug, setSlug] = useState(props.slug);
  const [favorited, setFavorited] = useState(props.favorited);
  const [favoritesCount, setFavoritesCount] = useState(props.favoritesCount);

  useEffect(() => {
    setFavorited(props.favorited);
    setFavoritesCount(props.favoritesCount);
    setSlug(props.slug);
  }, [props.favorited]);

  const handleClickButton = () => {
    if (isLogin) {
      if (favorited) {
        unFavoriteArticle(props.slug).then((res) => {
          setFavorited(res.data.article.favorited);
          setFavoritesCount(res.data.article.favoritesCount);
        });
      } else {
        favoriteArticle(props.slug).then((res) => {
          setFavorited(res.data.article.favorited);
          setFavoritesCount(res.data.article.favoritesCount);
        });
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    console.log(isLogin, "l");
  }, []);

  return (
    <button
      className={
        favorited ? "btn btn-sm btn-primary" : "btn btn-sm btn-outline-primary"
      }
      onClick={handleClickButton}
    >
      <i className="ion-heart"></i>
      &nbsp; {favorited ? "Unfavorite Post" : "Favorite Post"}{" "}
      <span className="counter">({favoritesCount})</span>
    </button>
  );
}
