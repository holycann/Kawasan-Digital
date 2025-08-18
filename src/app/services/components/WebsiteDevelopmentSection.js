import { FaGlobe, FaCode, FaArrowRight, FaCloudArrowUp } from "react-icons/fa6";

export default function WebsiteDevelopmentSection() {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <div className="mb-6 inline-block p-4 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl">
                                <FaGlobe size={32} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Website Development</h2>
                            <div className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-400">
                                    Our expert team creates responsive, fast-loading websites with modern designs that convert visitors into customers. We focus on user experience, accessibility, and performance to ensure your site stands out.
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    From simple landing pages to complex e-commerce platforms, we build websites that are not just beautiful but also functional and easy to maintain.
                                </p>

                                <div className="mt-8">
                                    <h3 className="font-bold text-xl mb-4">What We Provide:</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3">
                                            <div className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-full text-purple-600 dark:text-purple-400">
                                                <FaCode size={20} />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">Responsive Website Design</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-full text-purple-600 dark:text-purple-400">
                                                <FaCode size={20} />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">E-commerce Development</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-full text-purple-600 dark:text-purple-400">
                                                <FaArrowRight size={20} />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">SEO Optimization</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-full text-purple-600 dark:text-purple-400">
                                                <FaCloudArrowUp size={20} />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">Web Analytics & Performance</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="relative h-96 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/40 dark:to-purple-900/10 rounded-2xl overflow-hidden shadow-lg">
                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    <div className="relative w-full max-w-[500px] aspect-video bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
                                        <div className="absolute top-0 left-0 right-0 h-8 bg-gray-200 dark:bg-gray-700 flex items-center px-3 gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        </div>
                                        <div className="absolute top-8 bottom-0 left-0 right-0 bg-gradient-to-br from-purple-500 to-pink-600 p-4">
                                            <div className="h-full w-full bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                                <div className="text-center">
                                                    <h4 className="font-bold text-xl mb-1">Kawasan Digital</h4>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">www.kawasandigital.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 