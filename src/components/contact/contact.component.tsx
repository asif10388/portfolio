"use client"

import React from "react"
import "./contact.styles.scss"

const Contact = () => {
  return (
    <div className="text-black" id="contact">
      <section className="relative sm:rounded-lg contact-body">
        <div className="container px-4 lg:px-24 py-24 md:mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col w-full md:w-1/2 mb-12">
              <h2 className="sm:text-4xl text-2xl mb-4">
                Open to opportunities
              </h2>
              <p className="lg:w-3/4 text-gray-700 text-xs leading-relaxed text-base mb-5">
                I'm currently exploring new challenges as a Product Engineer.
                If you're building something interesting and need a developer who
                cares about user experience and technical excellence, let's connect.
              </p>
              <div className="my-auto pt-4 border-t border-gray-200">
                <p className="text-gray-600 mb-2">Get in touch:</p>
                <a
                  href="mailto:asif.khan10388@gmail.com"
                  className="sm:text-3xl text-lg text-primary hover:text-secondary transition-colors duration-200"
                >
                  asif.khan10388@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
