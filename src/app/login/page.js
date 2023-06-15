"use client";
import React from "react";
import { Log_In } from "../components/Auth/MailLogin/Log_In";
import Registration from "../components/Registration/Registration";

const Login = () => {
  return (
    <Registration Page={<Log_In/>}/>
  )
}

export default Login