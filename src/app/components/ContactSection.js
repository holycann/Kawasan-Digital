"use client";

import { motion, useAnimation } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { FaEnvelope, FaLocationDot, FaPaperPlane, FaWhatsapp, FaInstagram } from "react-icons/fa6";
import dynamic from 'next/dynamic';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import ReCAPTCHA from "react-google-recaptcha";

const Spotlight = dynamic(() => import('../../components/ui/spotlight').then((mod) => mod.Spotlight), {
  loading: () => <div className="w-full h-full bg-transparent"></div>,
  ssr: false,
});

const SparklesCore = dynamic(() => import('../../components/ui/sparkles').then((mod) => mod.SparklesCore), {
  loading: () => <div className="w-full h-full bg-gray-100 dark:bg-gray-900 animate-pulse"></div>,
  ssr: false,
});

export default function ContactSection() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const controls = useAnimation();

  useEffect(() => {
    // Initialize EmailJS with your user ID
    emailjs.init({ publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY });

    controls.start({
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    });
  }, [controls]);

  const onSubmit = async (data) => {
    // Verify reCAPTCHA first
    if (!recaptchaValue) {
      toast.error('Please complete the reCAPTCHA verification');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare email template data
      const templateParams = {
        time: new Date().toLocaleString(),
        name: data.name,
        email: data.email,
        phone: data.phone || 'Not provided',
        title: data.subject,
        message: data.message,
        'g-recaptcha-response': recaptchaValue
      };

      // Send email using EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, 
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, 
        templateParams
      );

      // Show success toast
      toast.success('Message sent successfully!', {
        description: 'We will get back to you soon.'
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      reset();
      setRecaptchaValue(null);

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      // Show error toast
      toast.error('Failed to send message', {
        description: 'Please try again later.'
      });
      console.error('Email send error:', error);
      setIsSubmitting(false);
    }
  };

  // Custom validation functions
  const validateEmail = (value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(value) || "Invalid email address";
  };

  const validatePhone = (value) => {
    // Optional phone validation: must be a number and at least 5 digits if provided
    if (!value) return true;
    const phoneRegex = /^\d{5,}$/;
    return phoneRegex.test(value.replace(/\s+/g, '')) || "Phone must be at least 5 digits";
  };

  const validateSubject = (value) => {
    // Must have at least one word (trim to remove extra spaces)
    return (value.trim().split(/\s+/).length >= 1) || "Subject must be at least one word";
  };

  const validateMessage = (value) => {
    // Must have at least two words (trim to remove extra spaces)
    return (value.trim().split(/\s+/).length >= 2) || "Message must be at least two words";
  };

  // New validation for name
  const validateName = (value) => {
    // Remove spaces and check if at least 2 letters remain
    const cleanName = value.replace(/\s+/g, '');
    return (cleanName.length >= 2) || "Name must be at least 2 letters long";
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background with gradient and sparkles */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900/50 dark:to-black z-0"></div>
      <div className="absolute inset-0 h-full w-full">
        <SparklesCore
          id="contactSparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#4f46e5"
        />
      </div>

      {/* 3D decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-3xl"
          animate={controls}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-gradient-to-tr from-purple-400/20 to-pink-500/20 blur-3xl"
          animate={{
            y: [0, 10, 0],
            transition: {
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0.5
            }
          }}
        />
      </div>

      <Spotlight
        className="max-w-7xl mx-auto px-4 md:px-6 relative z-10"
        fill="rgba(59, 130, 246, 0.15)"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs md:text-sm font-medium uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              Contact Us
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-4xl font-bold mb-6 font-heading"
          >
            Let&apos;s Start a Conversation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg"
          >
            Have a project in mind or need digital expertise? Our team is ready to help turn your vision into reality.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <motion.div
                className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-3 text-blue-600 dark:text-blue-400">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email Us</h3>
                    <p className="text-gray-600 dark:text-gray-400">support@kawasan.digital</p>
                    <a href="mailto:support@kawasan.digital" className="text-blue-600 dark:text-blue-400 text-sm mt-2 inline-flex items-center gap-1 hover:gap-2 transition-all">
                      Send an email
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3 text-green-600 dark:text-green-400">
                    <FaWhatsapp size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">WhatsApp</h3>
                    <p className="text-gray-600 dark:text-gray-400">+62 896 7844 9999</p>
                    <a href="https://wa.me/6289678449941" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 text-sm mt-2 inline-flex items-center gap-1 hover:gap-2 transition-all">
                      Chat with us
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-3 text-purple-600 dark:text-purple-400">
                    <FaInstagram size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Social Media</h3>
                    <p className="text-gray-600 dark:text-gray-400">@kawasandigitalid</p>
                    <a href="https://www.instagram.com/kawasandigitalid" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 text-sm mt-2 inline-flex items-center gap-1 hover:gap-2 transition-all">
                      Follow us
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 dark:bg-amber-900/30 rounded-full p-3 text-amber-600 dark:text-amber-400">
                    <FaLocationDot size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Visit Us</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Jl. Kawasan Teknologi No.88<br />
                      Bekasi, Indonesia
                    </p>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 text-sm mt-2 inline-flex items-center gap-1 hover:gap-2 transition-all">
                      Get directions
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-6 font-heading">Send us a message</h3>

              {isSubmitted ? (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5, times: [0, 0.8, 1] }}
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2 font-heading">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Thank you for reaching out. We&apos;ll get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Name
                      </label>
                      <div className="relative">
                        <input
                          id="name"
                          type="text"
                          className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700/50 backdrop-blur-sm transition-all`}
                          placeholder="Your name"
                          {...register("name", { required: "Name is required", validate: validateName })}
                        />
                        {errors.name && (
                          <motion.p
                            className="mt-1 text-sm text-red-500"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.name.message}
                          </motion.p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700/50 backdrop-blur-sm transition-all`}
                          placeholder="Your email"
                          {...register("email", {
                            required: "Email is required",
                            validate: validateEmail
                          })}
                        />
                        {errors.email && (
                          <motion.p
                            className="mt-1 text-sm text-red-500"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.email.message}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone (Optional)
                    </label>
                    <div className="relative">
                      <input
                        id="phone"
                        type="tel"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700/50 backdrop-blur-sm transition-all`}
                        placeholder="Your phone number"
                        {...register("phone", {
                          validate: validatePhone
                        })}
                      />
                      {errors.phone && (
                        <motion.p
                          className="mt-1 text-sm text-red-500"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {errors.phone.message}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <div className="relative">
                      <input
                        id="subject"
                        type="text"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700/50 backdrop-blur-sm transition-all`}
                        placeholder="Subject of your message"
                        {...register("subject", { 
                          required: "Subject is required",
                          validate: validateSubject
                        })}
                      />
                      {errors.subject && (
                        <motion.p
                          className="mt-1 text-sm text-red-500"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {errors.subject.message}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700/50 backdrop-blur-sm transition-all`}
                        rows="5"
                        placeholder="Your message"
                        {...register("message", { 
                          required: "Message is required",
                          validate: validateMessage
                        })}
                      ></textarea>
                      {errors.message && (
                        <motion.p
                          className="mt-1 text-sm text-red-500"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {errors.message.message}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      onChange={setRecaptchaValue}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-70"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane size={18} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        {/* Map section */}
        <motion.div
          className="mt-20 bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="aspect-[16/9] md:aspect-[21/9] w-full bg-gray-200 dark:bg-gray-700 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2034374157!2d107.13886687461792!3d-6.236975993770984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698eb3a1ee9a21%3A0x2b3599707789e7d2!2sBekasi%2C%20Bekasi%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1715934140123!5m2!1sen!2sid"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </Spotlight>
    </section>
  );
} 