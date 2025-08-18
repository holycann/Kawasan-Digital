export default function CTASection() {
    return (
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
    );
} 