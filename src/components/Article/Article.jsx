import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArticleAuthor from "./ArticleAuthor";
import ArticleComment from "./ArticleComment";
import ArticleAuthorControl from "./ArticleAuthorControl";
import { favoriteArticle, getArticle, unFavoriteArticle } from "./ArticleServices";
import { useUserContext } from "../../contexts/user_context";

export default function Article() {
  const params = useParams();
  const navigate = useNavigate()
  const { isLogin, userInfo, handleSetLogin } = useUserContext();
  const [articleData, setArticleData] = useState(null);
  const [favorited, setFavorited] = useState(null)
  const [favoritesCount, setFavoritesCount] = useState(null);


  const handleClickButton = () => {
    // if (isLogin) {
    //   if (favorited) {
    //     unFavoriteArticle(articleData?.slug).then((res) => {
    //       setFavorited(res.data.article.favorited);
    //       setFavoritesCount(res.data.article.favoritesCount);
    //     });
    //   } else {
    //     favoriteArticle(articleData?.slug).then((res) => {
    //       setFavorited(res.data.article.favorited);
    //       setFavoritesCount(res.data.article.favoritesCount);
    //     });
    //   }
    // } else {
    //   navigate("/login");
    // }
    setFavorited(!favorited)
  };

  useEffect(() => {
    getArticle(params.slug).then((res) => {
      setArticleData(res.data.article);
      setFavorited(res.data.article.favorited)
      setFavoritesCount(res.data.article.favoritesCount)
    });
  }, []);

  return (
    <div className="article-page">
      {articleData ? (
        <>
          <div className="banner">
            <div className="container">
              <h1>{articleData?.title}</h1>

              {articleData?.author?.username === userInfo?.username ? (
                <ArticleAuthorControl
                  author={articleData?.author}
                  createdAt={articleData?.createdAt}
                  slug={articleData?.slug}
                />
              ) : (
                <ArticleAuthor
                  author={articleData?.author}
                  favorited={favorited}
                  favoritesCount={articleData?.favoritesCount}
                  createdAt={articleData?.createdAt}
                  slug={articleData?.slug}
                  handleClickButton={() => handleClickButton()}
                />
              )}
            </div>
          </div>

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <p>{articleData?.description}</p>
                <p>{articleData?.body}</p>

                <ul className="tag-list">
                  {
                    articleData?.tagList
                    && articleData.tagList.map((item, index) => (
                      <li className="tag-default tag-pill tag-outline ng-binding ng-scope" key={index
                      }>{item}</li>
                    ))
                  }
                </ul>
              </div>
            </div>

            <hr />

            <div className="article-actions">
              {articleData?.author?.username === userInfo?.username ? (
                <ArticleAuthorControl
                  author={articleData?.author}
                  createdAt={articleData?.createdAt}
                  slug={articleData?.slug}
                />
              ) : (
                <ArticleAuthor
                  author={articleData?.author}
                  favorited={favorited}
                  favoritesCount={articleData?.favoritesCount}
                  createdAt={articleData?.createdAt}
                  slug={articleData?.slug}
                />
              )}
            </div>

            <ArticleComment slug={articleData.slug} />
          </div>
        </>
      ) : (
        <div className="container page">
          <div className="article-preview">Loading...</div>
        </div>
      )}
    </div>
  );
}
