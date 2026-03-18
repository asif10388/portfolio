import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faLinkedin,
  faGithub,
  faDribbble,
} from "@fortawesome/free-brands-svg-icons"
import "./footer.styles.scss"

const Footer = () => (
  <footer className="px-5 lg:px-24 py-5 footer-body">
    <div className="container mx-auto flex md:items-center lg:items-start md:flex-row md:flex-no-wrap flex-wrap flex-col">
      <div className="flex-grow flex flex-wrap md:pr-20 md:text-left order-first">
        <div className="md:w-1/2 w-full flex items-center mb-5 mb:mb-0">
          <h2 className="font-bold text-lg mr-3">Asif Khan</h2>
          <nav className="list-none ml-auto md:ml-0">
            <ul className="flex">
              <li className="mr-3">
                <a
                  href="https://drive.google.com/uc?export=download&id=12gRq1ImPrJ5SYwhkAfzShc5eNc6exuVA"
                  className="text-gray-600"
                >
                  <p>Download Resume</p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="md:w-1/2 w-full flex flex-col items-center md:items-end">
          <nav className="list-none flex justify-start mb-2 sm:mb-0">
            <ul className="flex nav-links">
              <li className="mr-12">
                <a
                  href="https://dribbble.com/asif10388"
                  className="text-gray-600 mr-3"
                  target="_new"
                  rel="noopener noreferrer"
                  aria-label="Dribble"
                >
                  <FontAwesomeIcon icon={faDribbble} size="2x" />
                </a>
              </li>
              <li className="mr-12">
                <a
                  href="https://github.com/asif10388"
                  className="text-gray-600 mr-3"
                  target="_new"
                  rel="noopener noreferrer"
                  aria-label="Github"
                >
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
              </li>
              <li className="mr-12">
                <a
                  href="https://www.linkedin.com/in/asif10388/"
                  className="text-gray-600 mr-3"
                  target="_new"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/asif10388"
                  className="text-gray-600"
                  target="_new"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <div className="container mx-auto py-4 flex flex-wrap flex-col sm:flex-row text-center md:text-left">
      <p className="text-gray-600 text-xs">
        ©{new Date().getFullYear()} asifkhan — All Rights Reserved
      </p>
    </div>
  </footer>
)

export default Footer
