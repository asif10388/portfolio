"use client"

import React from "react"
import CustomButton from "../custom-button/custom-button.component"
import "./work.styles.scss"

const workData = [
  {
    caption: "E-Commerce Platform",
    alt: "A full-featured e-commerce platform with payment integration, inventory management, and analytics dashboard.",
    url: "https://example.com",
    image: "https://res.cloudinary.com/asif10388/image/upload/v1633000000/work-images/project1.jpg",
  },
  {
    caption: "Corporate Website",
    alt: "Professional corporate website with CMS integration, multi-language support, and lead generation forms.",
    url: "https://example.com",
    image: "https://res.cloudinary.com/asif10388/image/upload/v1633000001/work-images/project2.jpg",
  },
  {
    caption: "SaaS Dashboard",
    alt: "Modern SaaS analytics dashboard with real-time data visualization, user management, and reporting tools.",
    url: "https://example.com",
    image: "https://res.cloudinary.com/asif10388/image/upload/v1633000002/work-images/project3.jpg",
  },
]

const Work = () => {
  return (
    <section className="work-body" id="works">
      <div className="container px-4 lg:px-24 py-12 mx-auto">
        <div className="flex flex-col justify-center py-6 mb-12">
          <h2 className="font-bold text-4xl mb-2 sm:mb-0">Featured Projects</h2>
          <div className="flex mt-4">
            <div className="w-4/5 md:w-1/5 h-1 rounded-full line inline-flex"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workData.map((work, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">
                    {work.caption}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {work.alt}
                  </p>
                </div>

                <div className="mt-auto">
                  <a href={work.url} target="_blank" rel="noopener noreferrer">
                    <CustomButton isPrimary >View Project</CustomButton>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
