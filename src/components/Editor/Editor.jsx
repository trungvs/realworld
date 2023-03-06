import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../Article/ArticleServices";

export default function Editor() {
  const formRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, field) => {
    formRef.current[field].value = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createArticle({
      article: {
        title: formRef.current["title"].value,
        description: formRef.current["description"].value,
        body: formRef.current["body"].value,
        tagList: [formRef.current["tagList"].value],
      },
    }).then((res) => {
      // formRef.current["title"].value = ""
      // formRef.current["description"].value = ""
      // formRef.current["body"].value = ""
      // formRef.current["tagList"].value = ""
      navigate(`/article/${res.data.article.slug}`);
    });
  };
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    ref={(el) => (formRef.current["title"] = el)}
                    onChange={(e) => handleChange(e, "title")}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    ref={(el) => (formRef.current["description"] = el)}
                    onChange={(e) => handleChange(e, "description")}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    ref={(el) => (formRef.current["body"] = el)}
                    onChange={(e) => handleChange(e, "body")}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    ref={(el) => (formRef.current["tagList"] = el)}
                    onChange={(e) => handleChange(e, "tagList")}
                  />
                  <div className="tag-list"></div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="submit"
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
