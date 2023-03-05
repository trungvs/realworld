import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticlesGlobal } from "../Article/ArticleServices";
import HomePageFavorites from "../HomePage/HomePageFavorites";

export default function ProfileArticles({ username }) {
  const [currentTab, setCurrentTab] = useState("myArticles");
  const [listArticles, setListArticles] = useState(null);
  const [articlesCount, setAriticlesCount] = useState(null);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangeTab = (tab) => {
    setListArticles(null);
    setCurrentTab(tab);
    setOffset(0);
    setCurrentPage(1);
    setAriticlesCount(null);
  };

  const handleChangePage = (newPage) => {
    setListArticles(null);
    setOffset((newPage - 1) * 5);
    setCurrentPage(newPage);
  };

  useEffect(() => {
    getArticlesGlobal(
      currentTab === "myArticles"
        ? {
            author: username,
            limit: 5,
            offset: offset,
          }
        : {
            favorited: username,
            limit: 5,
            offset: offset,
          }
    ).then((res) => {
      setListArticles(res.data.articles);
      if (res.data.articlesCount > 5) {
        let pageArray = [];
        for (let i = 1; i <= Math.ceil(res.data.articlesCount / 5); i++) {
          pageArray.push(i);
        }
        setAriticlesCount(pageArray);
      }
    });
  }, [currentTab, currentPage]);

  useEffect(() => {
    setAriticlesCount(null);
    setListArticles(null);
    setCurrentTab("myArticles");
    getArticlesGlobal(
      currentTab === "myArticles"
        ? {
            author: username,
            limit: 5,
            offset: offset,
          }
        : {
            favorited: username,
            limit: 5,
            offset: offset,
          }
    ).then((res) => {
      setListArticles(res.data.articles);
      if (res.data.articlesCount > 5) {
        let pageArray = [];
        for (let i = 1; i <= Math.ceil(res.data.articlesCount / 5); i++) {
          pageArray.push(i);
        }
        setAriticlesCount(pageArray);
      }
    });
  }, [username]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-10 offset-md-1">
          <div className="articles-toggle">
            <ul className="nav nav-pills outline-active">
              <li className="nav-item">
                <a
                  className={
                    currentTab === "myArticles" ? "nav-link active" : "nav-link"
                  }
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    handleChangeTab("myArticles");
                  }}
                >
                  My Articles
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    currentTab === "myFavorited"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    handleChangeTab("myFavorited");
                  }}
                >
                  Favorited Articles
                </a>
              </li>
            </ul>
          </div>

          {listArticles && listArticles?.length === 0 ? (
            <div className="article-preview">No articles are here... yet.</div>
          ) : listArticles === null ? (
            <div className="article-preview">Loading...</div>
          ) : (
            listArticles &&
            listArticles.map((article) => (
              <div className="article-preview" key={article?.slug}>
                <div className="article-meta">
                  <Link to={`/${article?.author?.username}`}>
                    <img src={article?.author?.image} />
                  </Link>
                  <div className="info">
                    <Link
                      to={`/${article?.author?.username}`}
                      className="author"
                    >
                      {article?.author?.username}
                    </Link>
                    <span className="date">
                      {new Date(article?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <HomePageFavorites
                    favorited={article?.favorited}
                    favoritesCount={article?.favoritesCount}
                    slug={article?.slug}
                  />
                </div>
                <Link to={`/article/${article?.slug}`} className="preview-link">
                  <h1>{article?.title}</h1>
                  <p>{article?.description}</p>
                  <span>Read more...</span>
                  <ul className="tag-list">
                    {article?.tagList.map((tag, index) => (
                      <li
                        className="tag-default tag-pill tag-outline ng-binding ng-scope"
                        key={index}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </Link>
              </div>
            ))
          )}

          <ul className="pagination">
            {articlesCount &&
              articlesCount.map((page, index) => (
                <li
                  className={
                    currentPage === page
                      ? "page-item ng-scope active"
                      : "page-item ng-scope"
                  }
                  onClick={() => handleChangePage(page)}
                  key={index}
                >
                  <a
                    href="#"
                    className="page-link ng-binding"
                    onClick={(e) => e.preventDefault()}
                  >
                    {page}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
