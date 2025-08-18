"use client";

import { motion } from "motion/react";
import { Spotlight } from "@/components/ui/spotlight";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Introduction",
      content: `At Kawasan Digital, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services. Please read this Privacy Policy carefully to understand our practices regarding your personal data.`,
    },
    {
      title: "Information We Collect",
      content: `We may collect several types of information from and about users of our website and services, including:
      
- Personal Information: Name, email address, phone number, company name, and other contact details you provide when filling out forms on our website or communicating with us.
- Technical Information: IP address, browser type and version, operating system, device information, and other technology identifiers on the devices you use to access our website.
- Usage Information: Information about how you use our website, products, and services, including pages visited, time spent on pages, and other analytical data.
- Marketing and Communications Information: Your preferences in receiving marketing communications from us and your communication preferences.`,
    },
    {
      title: "How We Use Your Information",
      content: `We use the information we collect for various purposes, including:

- To provide and maintain our services
- To notify you about changes to our services
- To allow you to participate in interactive features of our website
- To provide customer support
- To gather analysis or valuable information so that we can improve our services
- To monitor the usage of our services
- To detect, prevent and address technical issues
- To provide you with news, special offers, and general information about other goods, services, and events which we offer`,
    },
    {
      title: "Data Security",
      content: `We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, accessed, altered, or disclosed in an unauthorized way. We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know. They will only process your personal data on our instructions, and they are subject to a duty of confidentiality.`,
    },
    {
      title: "Cookies and Tracking Technologies",
      content: `We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.`,
    },
    {
      title: "Third-Party Services",
      content: `Our website may contain links to third-party websites or services that are not owned or controlled by Kawasan Digital. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.`,
    },
    {
      title: "Your Data Protection Rights",
      content: `Depending on your location, you may have certain rights regarding your personal data, including:

- The right to access, update, or delete the information we have on you
- The right of rectification
- The right to object
- The right of restriction
- The right to data portability
- The right to withdraw consent`,
    },
    {
      title: "Changes to This Privacy Policy",
      content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.`,
    },
    {
      title: "Contact Us",
      content: `If you have any questions about this Privacy Policy, please contact us at privacy@kawasandigital.id or through the contact information provided on our website.`,
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 font-heading"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Last Updated: June 15, 2024
          </motion.p>
        </div>

        <Spotlight className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            {sections.map((section, idx) => (
              <motion.div
                key={section.title}
                className="mb-10 last:mb-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {section.title}
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {section.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Spotlight>
      </div>
    </section>
  );
} 