export default function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work With Us?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join the hundreds of businesses we&apos;ve helped transform through innovative digital solutions.
        </p>
        <a
          href="/contact"
          className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:shadow-lg transform hover:scale-105 transition-all"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
} 