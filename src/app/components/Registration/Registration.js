"use client"
import React from 'react'
import { GoogleButton } from '../Auth/Google/GoogleButton'


const Registration = ({Page}) => {
  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* Left column container with background*/}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img 
             height= "auto"
             width={"100%"}
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
               alt="Logo"
            />
          </div>
          {/* Right column container with form */}
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <form>
              {/* Email input */}
                {Page}
              {/* Divider */}
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                  OR
                </p>
              </div>
              {/* Social login buttons */}
              <GoogleButton />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Registration