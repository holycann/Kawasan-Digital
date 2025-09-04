"use client";

import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import Image from "next/image";
import { ScrollRevealSection } from "../../components/ui/scroll-reveal";

const Spotlight = dynamic(() => import('../../components/ui/spotlight').then((mod) => mod.Spotlight), {
    loading: () => <div className="w-full h-full bg-transparent"></div>,
    ssr: false,
});

const Sparkles = dynamic(() => import('../../components/ui/sparkles').then((mod) => mod.Sparkles), {
    loading: () => <div className="w-full h-full bg-gray-100 dark:bg-gray-900"></div>,
    ssr: false,
});

// Technology data with logos and colors
const technologies = [
    {
        name: "Next.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        color: "from-gray-800 to-gray-900",
        bgColor: "bg-gray-100 dark:bg-gray-800",
        textColor: "text-gray-800 dark:text-gray-200"
    },
    {
        name: "React",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        textColor: "text-blue-600 dark:text-blue-400"
    },
    {
        name: "React Native",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        color: "from-blue-600 to-purple-600",
        bgColor: "bg-purple-100 dark:bg-purple-900/30",
        textColor: "text-purple-600 dark:text-purple-400"
    },
    {
        name: "JavaScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        color: "from-yellow-400 to-orange-500",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
        textColor: "text-yellow-600 dark:text-yellow-400"
    },
    {
        name: "TypeScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        color: "from-blue-600 to-blue-700",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        textColor: "text-blue-600 dark:text-blue-400"
    },
    {
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        color: "from-green-500 to-green-600",
        bgColor: "bg-green-100 dark:bg-green-900/30",
        textColor: "text-green-600 dark:text-green-400"
    },
    {
        name: "Laravel",
        logo: "https://icon.icepanel.io/Technology/svg/Laravel.svg",
        color: "from-red-500 to-red-600",
        bgColor: "bg-red-100 dark:bg-red-900/30",
        textColor: "text-red-600 dark:text-red-400"
    },
    {
        name: "PHP",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-100 dark:bg-purple-900/30",
        textColor: "text-purple-600 dark:text-purple-400"
    },
    {
        name: "Java",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-100 dark:bg-orange-900/30",
        textColor: "text-orange-600 dark:text-orange-400"
    },
    {
        name: "Python",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        textColor: "text-blue-600 dark:text-blue-400"
    },
    {
        name: "CSS3",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        textColor: "text-blue-600 dark:text-blue-400"
    },
    {
        name: "HTML5",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        color: "from-orange-500 to-orange-600",
        bgColor: "bg-orange-100 dark:bg-orange-900/30",
        textColor: "text-orange-600 dark:text-orange-400"
    },
    {
        name: "Tailwind CSS",
        logo: "https://icon.icepanel.io/Technology/svg/Tailwind-CSS.svg",
        color: "from-cyan-400 to-blue-500",
        bgColor: "bg-cyan-100 dark:bg-cyan-900/30",
        textColor: "text-cyan-600 dark:text-cyan-400"
    },
    {
        name: "PostgreSQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        textColor: "text-blue-600 dark:text-blue-400"
    },
    {
        name: "MySQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        textColor: "text-blue-600 dark:text-blue-400"
    },
    {
        name: "Docker",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        textColor: "text-blue-600 dark:text-blue-400"
    },
    {
        name: "Git",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        color: "from-orange-500 to-orange-600",
        bgColor: "bg-orange-100 dark:bg-orange-900/30",
        textColor: "text-orange-600 dark:text-orange-400"
    },
    {
        name: "AWS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        color: "from-orange-500 to-orange-600",
        bgColor: "bg-orange-100 dark:bg-orange-900/30",
        textColor: "text-orange-600 dark:text-orange-400"
    },
    {
        name: "Supabase",
        logo: "https://images.seeklogo.com/logo-png/43/2/supabase-logo-png_seeklogo-435677.png",
        color: "from-green-500 to-green-600",
        bgColor: "bg-green-100 dark:bg-green-900/30",
        textColor: "text-green-600 dark:text-green-400"
    },
    {
        name: "Vercel",
        logo: "https://assets.vercel.com/image/upload/q_auto/front/assets/design/vercel-triangle-black.svg",
        color: "from-gray-800 to-gray-900",
        bgColor: "bg-gray-100 dark:bg-gray-800",
        textColor: "text-gray-800 dark:text-gray-200"
    },
    {
        name: "Figma",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-100 dark:bg-purple-900/30",
        textColor: "text-purple-600 dark:text-purple-400"
    },
    {
        name: "Google Cloud",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        textColor: "text-blue-600 dark:text-blue-400"
    },
    {
        name: "WordPress",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        textColor: "text-blue-600 dark:text-blue-400"
    },
    {
        name: "Express.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        color: "from-gray-600 to-gray-700",
        bgColor: "bg-gray-100 dark:bg-gray-800",
        textColor: "text-gray-600 dark:text-gray-400"
    },
    {
        name: "MongoDB",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        color: "from-green-500 to-green-600",
        bgColor: "bg-green-100 dark:bg-green-900/30",
        textColor: "text-green-600 dark:text-green-400"
    },

    {
        name: "Golang",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        textColor: "text-blue-600 dark:text-blue-400"
    },
    {
        name: "CodeIgniter 4",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg",
        color: "from-red-500 to-red-600",
        bgColor: "bg-red-100 dark:bg-red-900/30",
        textColor: "text-red-600 dark:text-red-400"
    },
    {
        name: "Firebase",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        color: "from-orange-500 to-yellow-500",
        bgColor: "bg-orange-100 dark:bg-orange-900/30",
        textColor: "text-orange-600 dark:text-orange-400"
    },
    {
        name: "Vue.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
        color: "from-green-500 to-green-600",
        bgColor: "bg-green-100 dark:bg-green-900/30",
        textColor: "text-green-600 dark:text-green-400"
    },
    {
        name: "Bootstrap",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-100 dark:bg-purple-900/30",
        textColor: "text-purple-600 dark:text-purple-400"
    },
    {
        name: "Postman",
        logo: "https://icon.icepanel.io/Technology/svg/Postman.svg",
        color: "from-orange-500 to-orange-600",
        bgColor: "bg-orange-100 dark:bg-orange-900/30",
        textColor: "text-orange-600 dark:text-orange-400"
    }
];

// Kompononen reusable untuk menampilkan ikon teknologi
const TechIcon = ({ tech, index, size = 48, className = "" }) => (
    <motion.div
        key={tech.name}
        className={`aspect-square ${tech.bgColor} rounded-2xl flex items-center justify-center p-4 hover:shadow-lg transition-all hover:-translate-y-1 ${className}`}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewportOnce
    >
        <Image
            src={tech.logo}
            alt={tech.name}
            width={size}
            height={size}
            className={`w-${size/2} h-${size/2} object-contain`}
            onError={(e) => {
                e.target.style.display = 'none';
                const fallback = e.target.nextSibling;
                if (fallback) fallback.style.display = 'flex';
            }}
        />
        <div 
            className="w-12 h-12 flex items-center justify-center text-2xl font-bold text-gray-600 dark:text-gray-400" 
            style={{ display: 'none' }}
        >
            {tech.name.charAt(0)}
        </div>
    </motion.div>
);

// Kompononen reusable untuk daftar teknologi
const TechList = ({ technologies, title, description, items }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className={items.reverse ? "md:order-2" : ""}>
            <motion.span
                className={`inline-block px-4 py-1.5 text-xs md:text-sm font-medium uppercase tracking-wider ${items.labelColor} rounded-full mb-4`}
            >
                {title}
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
                {items.heading}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
                {description}
            </p>
            <div className="grid grid-cols-2 gap-4">
                {items.highlights.map((highlight, index) => (
                    <div 
                        key={index} 
                        className={`flex items-start gap-3 p-3 rounded-lg hover:bg-${highlight.hoverColor} dark:hover:bg-${highlight.hoverColor}/10 transition-colors`}
                    >
                        <div className={`p-2 rounded-lg bg-${highlight.bgColor} dark:bg-${highlight.bgColor}/30 text-${highlight.textColor}`}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold">{highlight.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{highlight.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className={`relative ${items.reverse ? "md:order-1" : ""}`}>
            <div className="grid grid-cols-3 gap-4">
                {technologies.slice(items.techSliceStart, items.techSliceEnd).map((tech, index) => (
                    <TechIcon key={tech.name} tech={tech} index={index} />
                ))}
                {items.additionalTechs && items.additionalTechs.map((techConfig, index) => (
                    <motion.div
                        key={techConfig.name}
                        className={`aspect-square ${techConfig.bgColor} rounded-2xl flex items-center justify-center p-4 hover:shadow-lg transition-all hover:-translate-y-1`}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: (index + 1) * 0.2 }}
                        viewportOnce
                    >
                        <Image
                            src={techConfig.logo}
                            alt={techConfig.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-contain"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                const fallback = e.target.nextSibling;
                                if (fallback) fallback.style.display = 'flex';
                            }}
                        />
                        <div 
                            className="w-12 h-12 flex items-center justify-center text-2xl font-bold text-gray-600 dark:text-gray-400" 
                            style={{ display: 'none' }}
                        >
                            {techConfig.name.charAt(0)}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
);

export default function TechStackSection() {
    // Definisikan konfigurasi untuk setiap bagian teknologi
    const scrollItems = [
        <TechList 
            key="frontend"
            technologies={technologies}
            title="Frontend Technologies"
            description="We use cutting-edge frontend technologies to create responsive, fast, and user-friendly web applications that deliver exceptional user experiences."
            items={{
                labelColor: "text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30",
                heading: "Modern Web Development Stack",
                techSliceStart: 0,
                techSliceEnd: 6,
                highlights: [
                    { 
                        title: "React & Next.js", 
                        subtitle: "Modern frameworks", 
                        hoverColor: "blue-50", 
                        bgColor: "blue-100", 
                        textColor: "blue-600 dark:text-blue-400" 
                    },
                    { 
                        title: "TypeScript", 
                        subtitle: "Type safety", 
                        hoverColor: "purple-50", 
                        bgColor: "purple-100", 
                        textColor: "purple-600 dark:text-purple-400" 
                    },
                    { 
                        title: "Tailwind CSS", 
                        subtitle: "Utility-first CSS", 
                        hoverColor: "green-50", 
                        bgColor: "green-100", 
                        textColor: "green-600 dark:text-green-400" 
                    },
                    { 
                        title: "Mobile Apps", 
                        subtitle: "React Native", 
                        hoverColor: "amber-50", 
                        bgColor: "amber-100", 
                        textColor: "amber-600 dark:text-amber-400" 
                    }
                ]
            }}
        />,
        <TechList 
            key="backend"
            technologies={technologies}
            title="Backend Technologies"
            description="Our backend stack ensures scalability, security, and performance for your applications with modern server-side technologies."
            items={{
                labelColor: "text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30",
                heading: "Robust Server-Side Solutions",
                reverse: true,
                techSliceStart: 6,
                techSliceEnd: 8,
                additionalTechs: [
                    {
                        name: "Node.js",
                        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
                        bgColor: "bg-green-100 dark:bg-green-900/30",
                    },
                    {
                        name: "Golang",
                        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
                        bgColor: "bg-blue-100 dark:bg-blue-900/30",
                    }
                ],
                highlights: [
                    { 
                        title: "Node.js", 
                        subtitle: "JavaScript runtime", 
                        hoverColor: "blue-50", 
                        bgColor: "blue-100", 
                        textColor: "blue-600 dark:text-blue-400" 
                    },
                    { 
                        title: "Golang", 
                        subtitle: "High performance", 
                        hoverColor: "purple-50", 
                        bgColor: "purple-100", 
                        textColor: "purple-600 dark:text-purple-400" 
                    },
                    { 
                        title: "Laravel", 
                        subtitle: "PHP framework", 
                        hoverColor: "green-50", 
                        bgColor: "green-100", 
                        textColor: "green-600 dark:text-green-400" 
                    },
                    { 
                        title: "Express.js", 
                        subtitle: "Web framework", 
                        hoverColor: "amber-50", 
                        bgColor: "amber-100", 
                        textColor: "amber-600 dark:text-amber-400" 
                    }
                ]
            }}
        />,
        <TechList 
            key="tools"
            technologies={technologies}
            title="Tools & Infrastructure"
            description="We use industry-standard tools and infrastructure to ensure reliable, scalable, and maintainable applications."
            items={{
                labelColor: "text-indigo-700 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30",
                heading: "Professional Development Tools",
                techSliceStart: 12,
                highlights: [
                    { 
                        title: "Git & GitHub", 
                        subtitle: "Version control", 
                        hoverColor: "blue-50", 
                        bgColor: "blue-100", 
                        textColor: "blue-600 dark:text-blue-400" 
                    },
                    { 
                        title: "Docker", 
                        subtitle: "Containerization", 
                        hoverColor: "purple-50", 
                        bgColor: "purple-100", 
                        textColor: "purple-600 dark:text-purple-400" 
                    },
                    { 
                        title: "AWS", 
                        subtitle: "Cloud infrastructure", 
                        hoverColor: "green-50", 
                        bgColor: "green-100", 
                        textColor: "green-600 dark:text-green-400" 
                    },
                    { 
                        title: "Databases", 
                        subtitle: "PostgreSQL & MySQL", 
                        hoverColor: "amber-50", 
                        bgColor: "amber-100", 
                        textColor: "amber-600 dark:text-amber-400" 
                    }
                ]
            }}
        />
    ];

    return (
        <section id="tech-stack" className="py-20 relative">
            <Spotlight
                className="max-w-7xl mx-auto px-4 md:px-6 py-4 relative z-10"
                fill="rgba(59, 130, 246, 0.15)"
            >
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewportOnce
                    >
                        <span className="inline-block px-4 py-1.5 mb-4 text-xs md:text-sm font-medium uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                            Our Tech Stack
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewportOnce
                        className="text-3xl md:text-4xl font-bold mb-6 font-heading"
                    >
                        Technologies We Master
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewportOnce
                        className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg"
                    >
                        We leverage cutting-edge technologies to build robust, scalable, and innovative digital solutions
                    </motion.p>
                </div>
            </Spotlight>

            <ScrollRevealSection items={scrollItems} />

            {/* Technology Grid */}
            <div className="container mx-auto px-4 md:px-6 mt-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewportOnce
                    className="text-center mb-12"
                >
                    <h3 className="text-2xl font-bold mb-4">Complete Technology Stack</h3>
                    <p className="text-gray-600 dark:text-gray-400">Explore all the technologies we use in our projects</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            className={`group relative p-6 rounded-2xl ${tech.bgColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-2`}
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            viewportOnce
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                                    <Image
                                        src={tech.logo}
                                        alt={tech.name}
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            const fallback = e.target.nextSibling;
                                            if (fallback) fallback.style.display = 'flex';
                                        }}
                                    />
                                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform duration-300" style={{ display: 'none' }}>
                                        {tech.name.charAt(0)}
                                    </div>
                                </div>
                                <h4 className={`font-semibold text-sm ${tech.textColor}`}>
                                    {tech.name}
                                </h4>
                            </div>

                            {/* Gradient overlay on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
} 