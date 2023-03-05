import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "../../contexts/user_context";
import { getProfile, followUser, unFollowUser } from "./ProfileServices";
import ProfileArticles from "./ProfileArticles";
import ProfileFollowButton from "./ProfileFollowButton";

export default function Profile() {
  const [userData, setUserData] = useState({});
  const { isLogin, userInfo } = useUserContext();
  const params = useParams();

  useEffect(() => {
    getProfile(params.username).then((res) => {
      setUserData(res.data.profile);
    });
  }, [params.username]);
  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={userData?.image} className="user-img" />
              <h4>{userData?.username}</h4>
              {userData?.bio && <p>{userData?.bio}</p>}
              {userInfo?.username === userData?.username && (
                <Link
                  to="/settings"
                  className="btn btn-sm btn-outline-secondary action-btn"
                >
                  <i className="ion-gear-a"></i>
                  Edit Profile Settings
                </Link>
              )}

              {userData?.username &&
                userInfo?.username !== userData?.username && (
                  <ProfileFollowButton
                    username={userData?.username}
                    following={userData?.following}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      <ProfileArticles username={params.username} />
    </div>
  );
}
