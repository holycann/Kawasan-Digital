import { FaGlobe, FaCode, FaCloudArrowUp } from "react-icons/fa6";

export default function AppDevelopmentSection() {
    return (
        <section className="py-16 bg-white dark:bg-black">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <div className="mb-6 inline-block p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl">
                                <FaGlobe size={32} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">App Development</h2>
                            <div className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-400">
                                    We create powerful, user-friendly applications that drive your business forward. Our expert developers build native and cross-platform solutions that work seamlessly across all devices.
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    From concept to deployment, we handle every aspect of the app development process to deliver products that exceed expectations and engage your audience.
                                </p>

                                <div className="mt-8">
                                    <h3 className="font-bold text-xl mb-4">What We Provide:</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3">
                                            <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full text-blue-600 dark:text-blue-400">
                                                <FaCode size={20} />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">Native iOS & Android Development</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full text-blue-600 dark:text-blue-400">
                                                <FaCode size={20} />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">Cross-Platform Solutions (React Native, Flutter)</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full text-blue-600 dark:text-blue-400">
                                                <FaGlobe size={20} />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">UI/UX Design for Mobile</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full text-blue-600 dark:text-blue-400">
                                                <FaCloudArrowUp size={20} />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">App Analytics & Optimization</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="relative h-96 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-900/10 rounded-2xl overflow-hidden shadow-lg">
                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    <div className="relative w-full max-w-[280px] aspect-[9/16] bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
                                        <div className="absolute top-0 left-0 right-0 h-6 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                            <div className="w-16 h-1 bg-gray-400 dark:bg-gray-500 rounded"></div>
                                        </div>
                                        <div className="absolute top-6 bottom-0 left-0 right-0 bg-gradient-to-br from-blue-500 to-purple-600 p-4">
                                            <div className="h-full w-full bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                                        <FaGlobe className="text-blue-600 dark:text-blue-400" size={24} />
                                                    </div>
                                                    <h4 className="font-medium">Kawasan App</h4>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Mobile Experience</p>
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