"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedTitle } from "../ui/animated-text";
import { cn } from "../../utils/cn";

const testimonials = [
  {
    id: 1,
    content: "Kawasan Digital transformed our business with their innovative app. The team's attention to detail and ability to understand our needs resulted in a product that exceeded our expectations.",
    author: "Sarah Johnson",
    position: "CEO, TechStart",
    image: "https://i.pravatar.cc/150?img=32"
  },
  {
    id: 2,
    content: "Working with Kawasan Digital on our website redesign was a game-changer. They delivered a modern, responsive site that perfectly reflects our brand identity and has significantly increased our conversions.",
    author: "Michael Chen",
    position: "Marketing Director, Innovations Inc.",
    image: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 3,
    content: "The SaaS platform developed by Kawasan Digital has streamlined our operations and reduced costs by 40%. Their ongoing support and maintenance have been exceptional.",
    author: "Amina Patel",
    position: "Operations Manager, Global Solutions",
    image: "https://i.pravatar.cc/150?img=25"
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <motion.span
            className="inline-block px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Testimonials
          </motion.span>
          
          <AnimatedTitle 
            text="What Our Clients Say"
            className="text-3xl md:text-4xl font-bold mb-6"
          />
          
          <motion.p
            className="text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </motion.p>
        </div>
        
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-500/30 dark:bg-blue-500/10 rounded-full blur-3xl opacity-50" />
          
          <div className="relative">
            <div className="flex flex-col items-center">
              <div className="flex gap-4 mb-8">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActive(idx)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      active === idx 
                        ? "bg-blue-600 w-8" 
                        : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                    )}
                  />
                ))}
              </div>
              
              <div className="relative w-full max-w-4xl">
                {testimonials.map((testimonial, idx) => (
                  <motion.div
                    key={testimonial.id}
                    className={cn(
                      "bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-10",
                      active === idx ? "block" : "hidden"
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: active === idx ? 1 : 0, y: active === idx ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="md:w-1/4 flex-shrink-0">
                        <div className="relative">
                          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white dark:border-gray-700">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.author}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-3/4">
                        <p className="text-lg md:text-xl italic text-gray-700 dark:text-gray-300 mb-6">"{testimonial.content}"</p>
                        <div>
                          <p className="font-bold text-lg">{testimonial.author}</p>
                          <p className="text-gray-600 dark:text-gray-400">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 