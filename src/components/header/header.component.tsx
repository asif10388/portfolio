"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import "./header.styles.scss"

const Header = () => {
  const [navBar, setNavbar] = useState(false)

  const changeBackground = () => {
    if (window.scrollY >= 40) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", changeBackground)
    return () => window.removeEventListener("scroll", changeBackground)
  }, [])

  return (
    <header
      className={`${navBar ? "scroll-view" : ""} fixed left-0 right-0 z-50`}
    >
      <div className="container mx-auto flex flex-wrap px-2 py-6 md:px-24 flex-col md:flex-row items-center main-header">
        <Link href="/" className="flex font-bold items-center mb-4 md:mb-0">
          <span className="text-xl">Asif Khan</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center justify-center">
          <Link href="/" className="mr-5 p-2">
            Home
          </Link>
          <a href="/#works" className="mr-5 p-2">
            Projects
          </a>
          <a href="/#contact" className="mr-5 p-2">
            Let's Talk
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
