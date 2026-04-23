'use client';

import { motion } from 'framer-motion';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface ServicesProps {
  services: ServiceItem[];
}

export default function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="py-32 bg-white text-black relative overflow-hidden">
      
      {/* Background Line Art Chess Piece (Watermark) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 overflow-hidden w-[1000px] h-[1000px] flex items-center justify-center opacity-[0.03]">
        <img src="/horse.png" alt="Background watermark" className="w-full h-full object-contain filter grayscale" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-light tracking-widest text-black/80 uppercase">
            WHY LEADERS CHOOSE <span className="text-black/30">QODIX</span>
          </h2>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="text-center md:text-left flex flex-col md:flex-row md:items-start gap-4 md:gap-8"
            >
              <h4 className="text-2xl md:text-3xl font-bold text-black/40 md:w-1/3 md:text-right shrink-0">
                {service.title}
              </h4>
              <p className="text-xl md:text-2xl text-black/90 leading-relaxed font-light md:w-2/3">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
