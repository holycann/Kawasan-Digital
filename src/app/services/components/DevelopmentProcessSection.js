export default function DevelopmentProcessSection() {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Development Process</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Our structured approach ensures quality, efficiency, and success for every project
                    </p>
                </div>

                <div className="relative max-w-3xl mx-auto">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 via-purple-600 to-indigo-600"></div>

                    <div className="space-y-16">
                        <div className="relative">
                            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">1</span>
                            </div>
                            <div className="ml-12 relative">
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                    <h3 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">Discovery & Planning</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        We begin by understanding your business goals, user needs, and project requirements to create a comprehensive roadmap for success.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">2</span>
                            </div>
                            <div className="mr-12 ml-auto text-right relative">
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                    <h3 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">Design & Development</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Our designers and developers work collaboratively to bring your project to life, focusing on both aesthetics and functionality.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">3</span>
                            </div>
                            <div className="ml-12 relative">
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                    <h3 className="text-xl font-bold mb-3 text-indigo-600 dark:text-indigo-400">Testing & Refinement</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        We rigorously test your solution across multiple devices and scenarios to ensure it&apos;s robust, secure, and user-friendly.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">4</span>
                            </div>
                            <div className="mr-12 ml-auto text-right relative">
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                    <h3 className="text-xl font-bold mb-3 text-green-600 dark:text-green-400">Launch & Support</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        We don&apos;t just deliver and disappear. We provide ongoing support, maintenance, and optimization to ensure long-term success.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 