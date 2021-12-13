import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Listar } from "../actions/actionTaks";

import Taks from "../components/Taks";
import { loginSincrono } from "../actions/actionLogin";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { AuthRouter } from "./AuthRouter";
import {  getAuth,onAuthStateChanged } from "firebase/auth";
import Loading from "../components/Loading";


export default function AppRouter() {

  const auth = getAuth();
  const [checking, setChecking] = useState(true)
  const [isLooggedIn, setsIsLoogedIn] = useState(false)
  const dispatch = useDispatch()

    useEffect(() => {
        onAuthStateChanged(auth, async(user) => {
            if (user?.uid) {
                dispatch(loginSincrono(user.uid, user.displayName))
                setsIsLoogedIn(true)
                dispatch(Listar(user.uid))
                console.log(user.uid)
            } else {
                setsIsLoogedIn(false)
            }
            setChecking(false)
        })
    }, [dispatch, setChecking])

    if (checking) {
        return <Loading />
    }


    return (
         <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated ={isLooggedIn}
                    />
                    <PrivateRoute
                        exact
                        path="/"
                        component={Taks}
                        isAuthenticated ={isLooggedIn}
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
  );
}