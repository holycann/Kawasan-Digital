export default function OurStoryTimeline() {
    return (
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
                                            Today, we&apos;re still that same team who loves building things, just a bit bigger. We focus on creating simple, effective solutions that actually work for our clients.
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
    );
} 