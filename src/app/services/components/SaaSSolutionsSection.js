import { FaCloudArrowUp, FaCode, FaCloudscale, FaArrowRight } from "react-icons/fa6";

export default function SaaSSolutionsSection() {
    return (
        <section className="py-16 bg-white dark:bg-black">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <div className="mb-6 inline-block p-4 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                                <FaCloudArrowUp size={32} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">SaaS Solutions</h2>
                            <div className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-400">
                                    We develop scalable, cloud-based software solutions that automate processes and drive business growth. Our SaaS applications are designed to boost efficiency, reduce costs, and provide valuable insights.
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    With a focus on security, scalability, and user experience, our SaaS solutions help businesses transform how they operate and deliver value to their customers.
                                </p>

                                <div className="mt-8">
                                    <h3 className="font-bold text-xl mb-4">What We Provide:</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3">
                                            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-full text-indigo-600 dark:text-indigo-400">
                                                <FaCloudscale size={20} />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">Custom SaaS Platform Development</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-full text-indigo-600 dark:text-indigo-400">
                                                <FaCode size={20} />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">API Development & Integration</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-full text-indigo-600 dark:text-indigo-400">
                                                <FaCloudArrowUp size={20} />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">Data Analytics & Reporting</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-full text-indigo-600 dark:text-indigo-400">
                                                <FaArrowRight size={20} />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">Subscription & Billing Management</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="relative h-96 bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-900/40 dark:to-indigo-900/10 rounded-2xl overflow-hidden shadow-lg">
                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    <div className="grid grid-cols-2 gap-4 w-full max-w-[500px]">
                                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center justify-center aspect-square">
                                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-3">
                                                <FaCloudscale className="text-indigo-600 dark:text-indigo-400" size={24} />
                                            </div>
                                            <h4 className="text-sm font-medium">Cloud Storage</h4>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center justify-center aspect-square">
                                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                                                <FaCloudArrowUp className="text-blue-600 dark:text-blue-400" size={24} />
                                            </div>
                                            <h4 className="text-sm font-medium">Analytics</h4>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center justify-center aspect-square">
                                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-3">
                                                <FaCode className="text-purple-600 dark:text-purple-400" size={24} />
                                            </div>
                                            <h4 className="text-sm font-medium">API Access</h4>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center justify-center aspect-square">
                                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
                                                <FaArrowRight className="text-green-600 dark:text-green-400" size={24} />
                                            </div>
                                            <h4 className="text-sm font-medium">Subscription</h4>
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