"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { MapPin, ArrowRight } from "@phosphor-icons/react";
import { EASE, staggerParent } from "@/lib/motion";
import { ZONAS } from "@/data/zonas";

export function Cobertura() {
  const reduce = useReducedMotion();

  return (
    <section
      className="py-32 px-4 bg-[--bg-soft]"
      id="cobertura"
      aria-label="Zonas de cobertura"
    >
      <div className="max-w-6xl mx-auto">
        {/* Layout split: texto izq + mapa/zonas der */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Izq — texto */}
          <div className="flex flex-col gap-6">
            <EyebrowTag>Dónde llegamos</EyebrowTag>
            <motion.h2
              className="text-h2 text-[--ink]"
              style={{ fontFamily: "var(--font-display)" }}
              initial={reduce ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            >
              Estamos en toda
              <br />
              la zona oeste
            </motion.h2>
            <motion.p
              className="text-[--slate-600] text-body-lg max-w-md"
              initial={reduce ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            >
              Morón, Castelar, Haedo, El Palomar, Ramos Mejía, Ituzaingó,
              Hurlingham y alrededores. ¿No ves tu barrio? Escribinos, seguro
              llegamos.
            </motion.p>

            {/* Mapa estilizado placeholder */}
            <motion.div
              className="rounded-2xl overflow-hidden border border-[--line] aspect-[4/3] relative bg-[--brand-50]"
              initial={reduce ? {} : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <MapPin weight="fill" size={32} className="text-[--brand-400]" />
                <p className="text-[--brand-400] text-sm font-medium text-center px-8">
                  Mapa de cobertura
                  <br />
                  <span className="text-[--slate-400] text-xs font-normal">
                    Google Maps embed — pendiente de implementación
                  </span>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Der — grid de zonas */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            {...(reduce ? {} : staggerParent)}
          >
            {ZONAS.map((zona) => (
              <motion.div
                key={zona.slug}
                variants={{
                  hidden: { opacity: 0, x: 16 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, ease: EASE },
                  },
                }}
              >
                <Link
                  href={`/fletes-${zona.slug}`}
                  className="flex items-center justify-between rounded-2xl px-5 py-4 bg-white border border-[--line] hover:border-[--brand-300] hover:shadow-[0_4px_16px_rgba(46,91,224,0.08)] transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[--brand-50] grid place-items-center shrink-0">
                      <MapPin weight="fill" size={14} className="text-[--brand-500]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[--ink] text-sm">{zona.nombre}</p>
                      <p className="text-[--slate-400] text-xs">
                        Zona {zona.zona === 1 ? "core" : `${zona.zona}`}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="text-[--slate-400] group-hover:text-[--brand-500] group-hover:translate-x-0.5 transition-all duration-200"
                  />
                </Link>
              </motion.div>
            ))}

            {/* Extra: consulta otras zonas */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 16 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5, ease: EASE },
                },
              }}
              className="sm:col-span-2"
            >
              <Link
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_DUENO ?? "5491100000000"}?text=Quiero%20consultar%20si%20llegan%20a%20mi%20zona`}
                className="flex items-center justify-between rounded-2xl px-5 py-4 bg-[--brand-50] border border-[--brand-100] hover:bg-[--brand-100] hover:border-[--brand-300] transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[--brand-500] grid place-items-center shrink-0">
                    <MapPin weight="fill" size={14} className="text-white" />
                  </div>
                  <p className="font-semibold text-[--brand-600] text-sm">
                    ¿No ves tu zona? Consultanos por WhatsApp
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="text-[--brand-400] group-hover:text-[--brand-600] group-hover:translate-x-0.5 transition-all duration-200"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
