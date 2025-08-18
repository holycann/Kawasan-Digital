"use client";

import { motion } from "motion/react";
import { Spotlight } from "@/components/ui/spotlight";

export default function TermsOfServicePage() {
  const sections = [
    {
      title: "Introduction",
      content: `Welcome to Kawasan Digital. These Terms of Service ("Terms") govern your use of our website, products, and services. By accessing or using our website and services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access our services.`,
    },
    {
      title: "Use of Our Services",
      content: `You may use our services only as permitted by law and according to these Terms. We may suspend or stop providing our services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.`,
    },
    {
      title: "Intellectual Property",
      content: `The content, features, and functionality of our website, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive property of Kawasan Digital and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.

You may not modify, reproduce, distribute, create derivative works or adaptations of, publicly display or in any way exploit any of our content in whole or in part except as expressly authorized by us. If you print, copy, modify, download, or otherwise use or provide any other person with access to any part of our website in breach of the Terms, your right to use our website will cease immediately.`,
    },
    {
      title: "User Accounts",
      content: `When you create an account with us, you must provide accurate, complete, and up-to-date information. You are responsible for safeguarding the password that you use to access our services and for any activities or actions under your password.

You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.`,
    },
    {
      title: "User Content",
      content: `Our services may allow you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material. You retain any rights that you may have in such content.

By posting content on our website, you grant us a non-exclusive, royalty-free, worldwide, sublicensable, and transferable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content in any media formats and through any media channels.`,
    },
    {
      title: "Limitation of Liability",
      content: `To the maximum extent permitted by applicable law, in no event shall Kawasan Digital, its affiliates, agents, directors, employees, suppliers, or licensors be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses, arising out of or relating to the use of, or inability to use, our services.`,
    },
    {
      title: "Indemnification",
      content: `You agree to defend, indemnify, and hold harmless Kawasan Digital and its licensee and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from your use of and access to our services.`,
    },
    {
      title: "Governing Law",
      content: `These Terms shall be governed and construed in accordance with the laws of Indonesia, without regard to its conflict of law provisions.`,
    },
    {
      title: "Changes to Terms",
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

By continuing to access or use our services after those revisions become effective, you agree to be bound by the revised terms.`,
    },
    {
      title: "Contact Us",
      content: `If you have any questions about these Terms, please contact us at legal@kawasandigital.id or through the contact information provided on our website.`,
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
            Terms of Service
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
                    <p key={i} className="mb-4 text-gray-700 dark:text-gray-300">
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