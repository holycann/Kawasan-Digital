import { FaRocket, FaUsers, FaLightbulb, FaTrophy } from "react-icons/fa6";

export default function OurValues() {
    return (
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
    );
} 