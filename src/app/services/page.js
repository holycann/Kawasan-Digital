//
// Services
// Page

import { IconDeviceLaptop, IconWorld, IconCloud, IconCode, IconPalette, IconDeviceAnalytics, IconTargetArrow, IconCloudComputing } from "@tabler/icons-react";

export const metadata = {
    title: "Our Services - Kawasan Digital",
    description: "Explore our app development, website development, and SaaS services at Kawasan Digital.",
};

export default function ServicesPage() {
    return (
        <div className="pt-24">
            {/* Hero Section */}
            <section className="py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black z-0"></div>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            Our Digital Services
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                            We combine creativity, technology, and strategy to build digital solutions that drive success for our clients.
                        </p>
                    </div>
                </div>
            </section>

            {/* App Development Section */}
            <section className="py-16 bg-white dark:bg-black">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="w-full md:w-1/2">
                                <div className="mb-6 inline-block p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl">
                                    <IconDeviceLaptop size={32} />
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
                                                    <IconCode size={20} />
                                                </div>
                                                <span className="text-gray-700 dark:text-gray-300">Native iOS & Android Development</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full text-blue-600 dark:text-blue-400">
                                                    <IconCode size={20} />
                                                </div>
                                                <span className="text-gray-700 dark:text-gray-300">Cross-Platform Solutions (React Native, Flutter)</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full text-blue-600 dark:text-blue-400">
                                                    <IconPalette size={20} />
                                                </div>
                                                <span className="text-gray-700 dark:text-gray-300">UI/UX Design for Mobile</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full text-blue-600 dark:text-blue-400">
                                                    <IconDeviceAnalytics size={20} />
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
                                                            <IconDeviceLaptop className="text-blue-600 dark:text-blue-400" size={24} />
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

            {/* Website Development Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                            <div className="w-full md:w-1/2">
                                <div className="mb-6 inline-block p-4 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl">
                                    <IconWorld size={32} />
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
                                                    <IconCode size={20} />
                                                </div>
                                                <span className="text-gray-700 dark:text-gray-300">Responsive Website Design</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <div className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-full text-purple-600 dark:text-purple-400">
                                                    <IconCode size={20} />
                                                </div>
                                                <span className="text-gray-700 dark:text-gray-300">E-commerce Development</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <div className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-full text-purple-600 dark:text-purple-400">
                                                    <IconTargetArrow size={20} />
                                                </div>
                                                <span className="text-gray-700 dark:text-gray-300">SEO Optimization</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <div className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-full text-purple-600 dark:text-purple-400">
                                                    <IconDeviceAnalytics size={20} />
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

            {/* SaaS Section */}
            <section className="py-16 bg-white dark:bg-black">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="w-full md:w-1/2">
                                <div className="mb-6 inline-block p-4 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                                    <IconCloud size={32} />
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
                                                    <IconCloudComputing size={20} />
                                                </div>
                                                <span className="text-gray-700 dark:text-gray-300">Custom SaaS Platform Development</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-full text-indigo-600 dark:text-indigo-400">
                                                    <IconCode size={20} />
                                                </div>
                                                <span className="text-gray-700 dark:text-gray-300">API Development & Integration</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-full text-indigo-600 dark:text-indigo-400">
                                                    <IconDeviceAnalytics size={20} />
                                                </div>
                                                <span className="text-gray-700 dark:text-gray-300">Data Analytics & Reporting</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-full text-indigo-600 dark:text-indigo-400">
                                                    <IconTargetArrow size={20} />
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
                                                    <IconCloudComputing className="text-indigo-600 dark:text-indigo-400" size={24} />
                                                </div>
                                                <h4 className="text-sm font-medium">Cloud Storage</h4>
                                            </div>
                                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center justify-center aspect-square">
                                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                                                    <IconDeviceAnalytics className="text-blue-600 dark:text-blue-400" size={24} />
                                                </div>
                                                <h4 className="text-sm font-medium">Analytics</h4>
                                            </div>
                                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center justify-center aspect-square">
                                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-3">
                                                    <IconCode className="text-purple-600 dark:text-purple-400" size={24} />
                                                </div>
                                                <h4 className="text-sm font-medium">API Access</h4>
                                            </div>
                                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center justify-center aspect-square">
                                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
                                                    <IconTargetArrow className="text-green-600 dark:text-green-400" size={24} />
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

            {/* Process Section */}
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
                                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
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
                                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
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
                                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
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
                                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold">4</span>
                                </div>
                                <div className="mr-12 ml-auto text-right relative">
                                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                        <h3 className="text-xl font-bold mb-3 text-green-600 dark:text-green-400">Launch & Support</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            We don't just deliver and disappear. We provide ongoing support, maintenance, and optimization to ensure long-term success.
                                        </p>
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
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Discuss Your Project?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Contact us today to learn how our digital services can help your business grow and thrive.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:shadow-lg transform hover:scale-105 transition-all"
                    >
                        Get a Free Consultation
                    </a>
                </div>
            </section>
        </div>
    );
}
