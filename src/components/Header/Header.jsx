import React from "react";
import { Link } from "react-router-dom"
import { useUserContext } from "../../contexts/user_context"

export default function Header() {

    const { isLogin, userInfo  } = useUserContext()

    return (
        <>
        {/* <head> */}
            {/* <meta charset="utf-8" /> */}
            <title>Conduit</title>

            <link
            href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
            rel="stylesheet"
            type="text/css"
            />
            <link
            href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
            rel="stylesheet"
            type="text/css"
            />
            <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        {/* </head> */}
        {/* <body> */}
            <nav className="navbar navbar-light">
            <div className="container">
                <Link className="navbar-brand" to="/">conduit</Link>
                <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <Link className="nav-link active" to="/">Home</Link>
                </li>
                {
                    isLogin
                    ? <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/editor"> <i className="ion-compose"></i>&nbsp;New Article </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/settings"> <i className="ion-gear-a"></i>&nbsp;Settings </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={ `/` + userInfo?.username}>
                                <img src={userInfo?.image} className="user-pic" alt={userInfo?.username} />
                                {userInfo?.username}
                            </Link>
                        </li>
                    </>
                    : <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Sign in</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Sign up</Link>
                        </li>
                    </>
                }
                </ul>
            </div>
            </nav>
        {/* </body> */}
        </>
    )
}