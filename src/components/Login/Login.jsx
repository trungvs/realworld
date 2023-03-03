import React, { useState, useRef, Dispatch } from "react";
import { useNavigate } from "react-router-dom"
import { userLogin } from "./LoginServices"
import { useUserContext } from "../../contexts/user_context"

export default function Login() {

    const { handleSetLogin } = useUserContext()
    const navigate = useNavigate()

    const openError = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const data = useRef({
        email: "",
        password: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        userLogin({
            user: data.current
        })
        .then(res => {
            handleSetLogin(res.data.user)
            navigate("/")
        })
        .catch(err => {
            setErrorMessage(Object.keys(err.response.data.errors) + " " + Object.values(err.response.data.errors))
        })
        console.log(data.current)
    }

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                <div className="col-md-6 offset-md-3 col-xs-12">
                    <h1 className="text-xs-center">Sign in</h1>
                    <p className="text-xs-center">
                    <a href="/">Need an account?</a>
                    </p>
                    {
                        errorMessage !== null && (
                            <ul className="error-messages">
                                <li>{errorMessage || ""}</li>
                            </ul>
                        )
                    }

                    <form onSubmit={handleSubmit}>
                    <fieldset className="form-group">
                        <input className="form-control form-control-lg" type="text" placeholder="Email" onChange={(e) => data.current.email = e.target.value} />
                    </fieldset>
                    <fieldset className="form-group">
                        <input className="form-control form-control-lg" type="password" placeholder="Password" onChange={(e) => data.current.password = e.target.value}/>
                    </fieldset>
                    <button className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}