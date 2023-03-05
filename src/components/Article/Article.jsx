import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleAuthor from "./ArticleAuthor";
import ArticleComment from "./ArticleComment";
import ArticleAuthorControl from "./ArticleAuthorControl";
import { getArticle } from "./ArticleServices";
import { useUserContext } from "../../contexts/user_context";

export default function Article() {
  const params = useParams();
  const { isLogin, userInfo } = useUserContext();
  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    getArticle(params.slug).then((res) => {
      setArticleData(res.data.article);
    });
  }, []);

  return (
    <div class="article-page">
      {articleData ? (
        <>
          <div class="banner">
            <div class="container">
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
                  favorited={articleData?.favorited}
                  favoritesCount={articleData?.favoritesCount}
                  createdAt={articleData?.createdAt}
                  slug={articleData?.slug}
                />
              )}
            </div>
          </div>

          <div class="container page">
            <div class="row article-content">
              <div class="col-md-12">
                <p>{articleData?.description}</p>
                <p>{articleData?.body}</p>
              </div>
            </div>

            <hr />

            <div class="article-actions">
              {articleData?.author?.username === userInfo?.username ? (
                <ArticleAuthorControl
                  author={articleData?.author}
                  createdAt={articleData?.createdAt}
                  slug={articleData?.slug}
                />
              ) : (
                <ArticleAuthor
                  author={articleData?.author}
                  favorited={articleData?.favorited}
                  favoritesCount={articleData?.favoritesCount}
                  createdAt={articleData?.createdAt}
                  slug={articleData?.slug}
                />
              )}
            </div>

            <ArticleComment slug={articleData?.slug} />
          </div>
        </>
      ) : (
        <div class="container page">
          <div className="article-preview">Loading...</div>
        </div>
      )}
    </div>
  );
}
