import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createArticle, updateArticle } from "../Article/ArticleServices";
import { getArticle } from "../Article/ArticleServices"

export default function Editor() {
  const formRef = useRef([]);
  const navigate = useNavigate();
  const params = useParams()
  const [errorMessage, setErrorMessage] = useState(null)
  const [inProgress, setInProgress] = useState(false)
  const [tagList, setTagList] = useState([])

  const handleChange = (e, field) => {
    formRef.current[field].value = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInProgress(true)
    if (params.slug) {
      updateArticle(params.slug, {
        article: {
          title: formRef.current["title"].value,
          description: formRef.current["description"].value,
          body: formRef.current["body"].value,
          tagList: tagList
        }
      })
        .then((res) => {
          // formRef.current["title"].value = ""
          // formRef.current["description"].value = ""
          // formRef.current["body"].value = ""
          // formRef.current["tagList"].value = ""
          navigate(`/article/${res.data.article.slug}`);
        }).catch(err => {
          setErrorMessage(Object.keys(err.response.data.errors) + " " + Object.values(err.response.data.errors))
          setInProgress(false)
        });
    } else {
      createArticle({
        article: {
          title: formRef.current["title"].value,
          description: formRef.current["description"].value,
          body: formRef.current["body"].value,
          tagList: tagList,
        },
      }).then((res) => {
        // formRef.current["title"].value = ""
        // formRef.current["description"].value = ""
        // formRef.current["body"].value = ""
        // formRef.current["tagList"].value = ""
        navigate(`/article/${res.data.article.slug}`);
      }).catch(err => {
        setErrorMessage(Object.keys(err.response.data.errors) + " " + Object.values(err.response.data.errors))
        setInProgress(false)
      });
    }
  };

  const handleDeleteTag = (value) => {
    setTagList(tagList.filter(tag => tag !== value))
  }

  useEffect(() => {
    if (params.slug) {
      getArticle(params.slug)
        .then(res => {
          console.log(res.data)
          const article = res.data.article
          formRef.current["title"].value = article.title
          formRef.current["description"].value = article.description
          formRef.current["body"].value = article.body
          // formRef.current["tagList"].value = article.tagList
          setTagList(article.tagList)
        })
    } else {
      formRef.current["title"].value = ""
      formRef.current["description"].value = ""
      formRef.current["body"].value = ""
      formRef.current["tagList"].value = ""
    }
  }, [params.slug])
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {
              errorMessage !== null && (
                <ul className="error-messages">
                  <li>{errorMessage || ""}</li>
                </ul>
              )
            }
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    ref={(el) => (formRef.current["title"] = el)}
                    onChange={(e) => handleChange(e, "title")}
                    disabled={inProgress}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    ref={(el) => (formRef.current["description"] = el)}
                    onChange={(e) => handleChange(e, "description")}
                    disabled={inProgress}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    ref={(el) => (formRef.current["body"] = el)}
                    onChange={(e) => handleChange(e, "body")}
                    disabled={inProgress}
                    spellCheck="false"
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags (press ENTER to save tag)"
                    ref={(el) => (formRef.current["tagList"] = el)}
                    onChange={(e) => handleChange(e, "tagList")}
                    disabled={inProgress}
                    onKeyPress={e => {
                      if (e.key === "Enter") {
                        if (e.target.value.length !== 0) {
                          setTagList([
                            ...tagList,
                            e.target.value
                          ])
                          formRef.current["tagList"].value = ""
                        }
                        console.log(formRef.current["tagList"].value)
                      }
                    }}
                  />
                  <div className="tag-list"></div>
                </fieldset>
                {/* {
                  params.slug && ( */}
                <div className="tag-list">
                  {
                    tagList.length !== 0 && tagList.map((item, index) => (
                      <span className="tag-default tag-pill ng-binding ng-scope" key={index} >
                        <i className="ion-close-round" onClick={() => handleDeleteTag(item)}></i> {item}
                      </span>
                    ))
                  }
                </div>
                {/* )
                } */}
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  disabled={inProgress}
                  onClick={handleSubmit}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>


          </div>
        </div>
      </div>
    </div>
  );
}
