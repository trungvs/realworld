import React, { useEffect, useState } from "react";
import { followUser, unFollowUser } from "./ProfileServices";

export default function ProfileFollowButton(props) {
  const [following, setFollowing] = useState(props.following);

  const handleClick = () => {
    if (following) {
      unFollowUser(props?.username).then((res) => {
        setFollowing(res.data.profile.following);
      });
    } else {
      followUser(props?.username).then((res) => {
        setFollowing(res.data.profile.following);
      });
    }
  };

  useEffect(() => {
    setFollowing(following);
    console.log(props.following);
  }, []);


  return (
    <button
      className={
        following
          ? "btn btn-sm btn-secondary action-btn"
          : "btn btn-sm btn-outline-secondary action-btn"
      }
      onClick={handleClick}
    >
      <i className="ion-plus-round"></i>
      &nbsp; {following ? "Unfollow" : "Follow"} {props?.username}
    </button>
  );
}
