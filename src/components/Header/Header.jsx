import React from "react";

export default function Header() {


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
                <a className="navbar-brand" href="/">conduit</a>
                <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <a className="nav-link active" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/editor"> <i className="ion-compose"></i>&nbsp;New Article </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/settings"> <i className="ion-gear-a"></i>&nbsp;Settings </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/login">Sign in</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/register">Sign up</a>
                </li>
                </ul>
            </div>
            </nav>
        {/* </body> */}
        </>
    )
}