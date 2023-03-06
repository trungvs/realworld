import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getArticlesGlobal,
  getTags,
  getArticlesFollow,
} from "../Article/ArticleServices";
import { useUserContext } from "../../contexts/user_context";
import HomePageFavorites from "./HomePageFavorites";

export default function HomePage() {
  const [listArticles, setListArticles] = useState(null);
  const [articlesCount, setAriticlesCount] = useState(null);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState(null);
  const [currentTab, setCurrentTab] = useState("global");

  const { isLogin, userInfo } = useUserContext();

  const handleChangePage = async (newPage) => {
    setListArticles(null);
    setOffset((newPage - 1) * 10);
    setCurrentPage(newPage);
  };

  const handleSelectTag = (e, tag) => {
    e.preventDefault();
    setListArticles(null);
    setAriticlesCount(null);
    setCurrentTab(null);
    setCurrentTag(tag);
    setCurrentPage(1);
    setOffset(0);
  };

  const handleChangeTab = (tab) => {
    setListArticles(null);
    setAriticlesCount(null);
    setCurrentTag(null);
    setCurrentTab(tab);
    setCurrentPage(1);
    setOffset(0);
  };

  const handleGetData = () => {
    getArticlesGlobal({
      limit: 10,
      offset: offset,
      tag: currentTag,
    })
      .then((res) => {
        setListArticles(res.data.articles);
        let pageArray = [];
        for (let i = 1; i <= Math.ceil(res.data.articlesCount / 10); i++) {
          pageArray.push(i);
        }
        setAriticlesCount(pageArray);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTags()
      .then((res) => {
        setTags(res.data.tags);
      })
      .catch((err) => console.log(err));

    // if (
    //   isLogin &&
    //   (currentTab === "global" || currentTab === "null") &&
    //   currentTag === null
    // ) {
    //   setCurrentTab("feed");
    // }
  }, [isLogin]);

  useEffect(() => {
    if (currentTab === "feed") {
      getArticlesFollow({
        limit: 10,
        offset: offset,
        tag: currentTag,
      })
        .then((res) => {
          setListArticles(res.data.articles);
          let pageArray = [];
          for (let i = 1; i <= Math.ceil(res.data.articlesCount / 10); i++) {
            pageArray.push(i);
          }
          setAriticlesCount(pageArray);
        })
        .catch((err) => console.log(err));
    } else {
      handleGetData();
    }
  }, [currentPage, currentTag, currentTab]);

  return (
    <div className="home-page">
      {!isLogin && (
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
      )}

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {isLogin && (
                  <li
                    className="nav-item"
                    onClick={() => handleChangeTab("feed")}
                  >
                    <Link
                      className={
                        currentTab === "feed" ? "nav-link active" : "nav-link"
                      }
                      to="#"
                    >
                      Your Feed
                    </Link>
                  </li>
                )}
                <li
                  className="nav-item"
                  onClick={() => handleChangeTab("global")}
                >
                  <Link
                    className={
                      currentTab === "global" ? "nav-link active" : "nav-link"
                    }
                    to="#"
                  >
                    Global Feed
                  </Link>
                </li>
                {currentTag !== null && (
                  <li className="nav-item">
                    <a className="nav-link active" href="/">
                      <i className="ion-pound"></i>
                      {currentTag}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {listArticles && listArticles?.length === 0 ? (
              <div className="article-preview">
                No articles are here... yet.
              </div>
            ) : listArticles === null ? (
              <div className="article-preview">Loading...</div>
            ) : (
              listArticles &&
              listArticles.map((article, index) => (
                <div className="article-preview" key={index}>
                  <div className="article-meta">
                    <Link to={`/${article?.author?.username}`}>
                      <img
                        src={article?.author?.image}
                        alt={article?.author?.username}
                      />
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
                  <Link
                    to={`/article/${article?.slug}`}
                    className="preview-link"
                  >
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

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                {tags?.length === 0 ? (
                  <div className="ng-hide">Loading tags...</div>
                ) : (
                  tags.map((tag, index) => (
                    <Link
                      to="#"
                      className="tag-pill tag-default ng-scope"
                      onClick={(e) => {
                        handleSelectTag(e, tag);
                      }}
                      key={index}
                    >
                      {tag}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
