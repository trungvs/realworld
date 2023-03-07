import React, { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../contexts/user_context";
import { useNavigate, useParams } from "react-router-dom";
import { favoriteArticle, unFavoriteArticle } from "./ArticleServices";

export default function ArticleFavorites(props) {
  const { isLogin } = useUserContext();
  const navigate = useNavigate();
  const params = useParams()
  const [slug, setSlug] = useState(props.slug);
  const [favorited, setFavorited] = useState(props.favorited);
  const favoritedRef = useRef()
  const [favoritesCount, setFavoritesCount] = useState(props.favoritesCount);

  const handleClickButton = () => {
    if (isLogin) {
      if (favorited) {
        unFavoriteArticle(props.slug).then((res) => {
          setFavorited(res.data.article.favorited);
          favoritedRef.current = res.data.article.favorited
          setFavoritesCount(res.data.article.favoritesCount);
        });
      } else {
        favoriteArticle(props.slug).then((res) => {
          setFavorited(res.data.article.favorited);
          favoritedRef.current = res.data.article.favorited
          setFavoritesCount(res.data.article.favoritesCount);
        });
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    console.log("slug", params.slug)
    setFavorited(favorited)
    setFavoritesCount(favoritesCount)
    favoritedRef.current = favorited
  }, [favoritedRef.current]);

  return (
    <button
      className={
        favoritedRef.current ? "btn btn-sm btn-primary" : "btn btn-sm btn-outline-primary"
      }
      onClick={handleClickButton}
    >
      <i className="ion-heart"></i>
      &nbsp; {favoritedRef.current ? "Unfavorite Post" : "Favorite Post"}{" "}
      <span className="counter">({favoritesCount})</span>
    </button>
  );
}
