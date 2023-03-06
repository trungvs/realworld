import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { updateCurrentUser } from "../User/UserServices";
import { useUserContext } from "../../contexts/user_context";

export default function Settings() {
  //   const [userData, setUserData] = useState({});
  const { isLogin, userInfo, handleSetLogin } = useUserContext();
  const [inProgress, setInProgress] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const userData = useRef({});
  const navigate = useNavigate();

  const handleChange = (e, name) => {
    userData.current = {
      ...userData.current,
      [name]: e.target.value,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInProgress(true)
    if (!(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(userData.current.image)) {
      setErrorMessage("The type of img link is not correct")
      setInProgress(false)
    } else if (!(/\S+@\S+\.\S+/).test(userData.current.email)) {
      setErrorMessage("The type of email is not correct")
      setInProgress(false)
    } else {
      updateCurrentUser({
        user: userData.current,
      }).then((res) => {
        handleSetLogin(res.data.user);
        navigate(`/${res.data.user.username}`);
      });
    }
  };

  const handleLogout = () => {
    handleSetLogin({});
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  useEffect(() => {
    if (isLogin) {
      userData.current = userInfo;
    } else {
      navigate("/");
    }
  }, [isLogin]);
  return (
    <div className="settings-page">
      {isLogin && (
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

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
                      className="form-control"
                      type="text"
                      placeholder="URL of profile picture"
                      defaultValue={userInfo?.image}
                      onChange={(e) => handleChange(e, "image")}
                      disabled={inProgress}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      defaultValue={userInfo?.username}
                      onChange={(e) => handleChange(e, "username")}
                      disabled={inProgress}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows="8"
                      placeholder="Short bio about you"
                      defaultValue={userInfo?.bio}
                      onChange={(e) => handleChange(e, "bio")}
                      disabled={inProgress}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      defaultValue={userInfo?.email}
                      onChange={(e) => handleChange(e, "email")}
                      disabled={inProgress}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => handleChange(e, "password")}
                      disabled={inProgress}
                      autoComplete="new-password"
                    />
                  </fieldset>
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary pull-xs-right"
                    disabled={inProgress}
                  >
                    Update Settings
                  </button>
                </fieldset>
              </form>
              <hr />
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
