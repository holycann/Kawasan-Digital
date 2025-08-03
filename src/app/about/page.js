import { FaRocket, FaUsers, FaLightbulb, FaTrophy } from "react-icons/fa6";
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black z-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Our Journey to Digital Excellence
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Discover the story, values, and people that make Kawasan Digital your trusted partner for digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Our Journey
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                A simple story of helping businesses go digital
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block"></div>

              {/* Timeline Items */}
              <div className="space-y-12">
                {/* 2019 - Foundation */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/2 md:pr-8 text-right">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-end gap-3 mb-4">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">2019</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">The Beginning</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Started with just 3 people who loved building websites. We noticed local businesses struggling with their online presence, so we decided to help them out.
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 md:pl-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl text-white text-center">
                      <div className="text-4xl font-bold mb-2">3</div>
                      <div className="text-lg">Team Members</div>
                      <div className="text-sm opacity-90">Passionate Developers</div>
                    </div>
                  </div>
                </div>

                {/* 2021 - Growth */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                  <div className="w-full md:w-1/2 md:pl-8 text-left">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">2021</span>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">Growing Together</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        As our clients grew, so did we. We learned new technologies, expanded our services, and built lasting relationships with businesses who trusted us.
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 md:pr-8">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-2xl text-white text-center">
                      <div className="text-4xl font-bold mb-2">15+</div>
                      <div className="text-lg">Projects Delivered</div>
                      <div className="text-sm opacity-90">Happy Clients</div>
                    </div>
                  </div>
                </div>

                {/* 2023 - Innovation */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/2 md:pr-8 text-right">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-end gap-3 mb-4">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">2023</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">Learning & Improving</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        We kept learning new technologies and improving our skills. Started working on more complex projects and helping businesses with their digital transformation.
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 md:pl-8">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-2xl text-white text-center">
                      <div className="text-4xl font-bold mb-2">8+</div>
                      <div className="text-lg">Team Members</div>
                      <div className="text-sm opacity-90">Skilled Developers</div>
                    </div>
                  </div>
                </div>

                {/* 2025 - Today */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                  <div className="w-full md:w-1/2 md:pl-8 text-left">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">2025</span>
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">Still Growing</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Today, we're still that same team who loves building things, just a bit bigger. We focus on creating simple, effective solutions that actually work for our clients.
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 md:pr-8">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-2xl text-white text-center">
                      <div className="text-4xl font-bold mb-2">15+</div>
                      <div className="text-lg">Team Members</div>
                      <div className="text-sm opacity-90">Still Learning</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center border border-gray-100 dark:border-gray-700">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">35+</div>
                <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center border border-gray-100 dark:border-gray-700">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">25+</div>
                <div className="text-gray-600 dark:text-gray-400">Happy Clients</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center border border-gray-100 dark:border-gray-700">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">6</div>
                <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center border border-gray-100 dark:border-gray-700">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">24/7</div>
                <div className="text-gray-600 dark:text-gray-400">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Core Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The principles that guide our work and relationships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mb-4">
                <FaRocket size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We constantly explore new technologies and approaches to deliver cutting-edge solutions.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="inline-block p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full mb-4">
                <FaUsers size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We believe in working closely with our clients, treating their challenges as our own.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="inline-block p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mb-4">
                <FaLightbulb size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We strive for perfection in every line of code, pixel of design, and interaction with clients.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="inline-block p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full mb-4">
                <FaTrophy size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Integrity</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We conduct business with honesty, transparency, and a strong ethical foundation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership section */}
      <section id="leadership" className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Background Elements - Simplified for performance */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Our Team
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100">
                Meet Our Leadership
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                The talented individuals who drive our mission forward with passion and expertise
              </p>
            </div>

            {/* Team Members */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Siro Sanjaya */}
              <div className="group relative">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        Siro Sanjaya
                      </h3>
                      <p className="text-blue-400 font-semibold">CEO & Founder</p>
                    </div>
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-blue-500/30">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                        alt="Siro Sanjaya"
                        fill
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(150, 150))}`}
                        loading="lazy"
                        sizes="64px"
                      />
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Visionary entrepreneur with a passion for digital transformation, Siro leads Kawasan Digital with strategic insights and innovative thinking.
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      <a href="https://www.instagram.com/sersanjaya22" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a href="https://www.linkedin.com/in/siro-sanjaya-10583336a/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Leadership</div>
                      <div className="text-lg font-bold text-blue-400">Strategic Vision</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Muhamad Ramadhan */}
              <div className="group relative">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                        Muhamad Ramadhan
                      </h3>
                      <p className="text-purple-400 font-semibold">CTO</p>
                    </div>
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-purple-500/30">
                      <Image
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                        alt="Muhamad Ramadhan"
                        fill
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(150, 150))}`}
                        loading="lazy"
                        sizes="64px"
                      />
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    As our tech genius, Muhamad ensures we stay ahead of the technological curve with cutting-edge solutions and innovative approaches.
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      <a href="https://www.instagram.com/ehhramaa_" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-purple-500 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a href="https://www.linkedin.com/in/muhamad-ramadhan-bb6289237" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Expertise</div>
                      <div className="text-lg font-bold text-purple-400">Tech Lead</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maulana Firdaus */}
              <div className="group relative">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-green-500/30 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                        Maulana Firdaus
                      </h3>
                      <p className="text-green-400 font-semibold">Marketing Director</p>
                    </div>
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-green-500/30">
                      <Image
                        src="https://i0.wp.com/wartawirausaha.com/wp-content/uploads/2020/10/13-Aturan-Sukses-Menjual-Dari-Salesman-Terhebat-di-Dunia.jpg?w=640&ssl=1"
                        alt="Maulana Firdaus"
                        fill
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(150, 150))}`}
                        loading="lazy"
                        sizes="64px"
                      />
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    As our Marketing Director, Maulana drives our strategic brand positioning and leads our marketing initiatives to showcase our digital innovation and expertise.
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      <a href="https://www.instagram.com/maulnfrdaus/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-green-500 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a href="https://www.linkedin.com/in/maulana-firdaus-10583336a/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Specialty</div>
                      <div className="text-lg font-bold text-green-400">Marketing</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join the hundreds of businesses we&apos;ve helped transform through innovative digital solutions.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}

// Shimmer effect for placeholder
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f0f0f0" offset="20%" />
      <stop stop-color="#e0e0e0" offset="50%" />
      <stop stop-color="#f0f0f0" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f0f0f0" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str); 
