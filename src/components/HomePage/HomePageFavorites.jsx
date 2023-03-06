import React, { useEffect, useState } from "react";
import { favoriteArticle, unFavoriteArticle } from "../Article/ArticleServices";
import { useUserContext } from "../../contexts/user_context";
import { useNavigate } from "react-router-dom";

export default function HomePageFavorites(props) {
  const { isLogin, userInfo } = useUserContext();
  const navigate = useNavigate();
  const [favorited, setFavorited] = useState(props.favorited);
  const [favoritesCount, setFavoritesCount] = useState(props.favoritesCount);

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

  useEffect(() => {}, [favoritesCount]);

  return (
    <button
      className={
        favorited
          ? "btn btn-primary btn-sm pull-xs-right"
          : "btn btn-outline-primary btn-sm pull-xs-right"
      }
      onClick={handleClickButton}
    >
      <i className="ion-heart"></i> {favoritesCount}
    </button>
  );
}
