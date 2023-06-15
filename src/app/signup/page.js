"use client";
import React from "react";

import { Sign_Up } from "../components/Auth/MailLogin/Sign_Up";
import Registration from "../components/Registration/Registration";

const Signup = () => {
  return (
    <Registration Page={<Sign_Up/>}/>
  )
}

export default Signup;