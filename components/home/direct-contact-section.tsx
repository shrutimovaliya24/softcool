export default function DirectContactSection() {
  return (
    <section className="p-8" style={{ backgroundColor: '#009EDD' }}>
      <div className="max-w-[10000px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-sans">Direct from Us to You</h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-sans">
            Experience the comfort of buying straight from the makers. Our experts help you find the pillow made for your perfect rest. Pure comfort, honest quality — delivered right to your doorstep.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-2xl font-semibold mb-2 text-white font-sans">+91 7600018281</p>
            <a href="tel:+917600018281" className="text-white/80 hover:text-white transition-colors font-sans">
              +917600018281
            </a>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold mb-2 text-white font-sans">info@softcool.in</p>
            <a href="mailto:info@softcool.in" className="text-white/80 hover:text-white transition-colors font-sans">
              info@softcool.in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

