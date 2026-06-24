"use client";

import { useState } from "react";
import { CaretDown, WhatsappLogo, Truck, House, Calendar } from "@phosphor-icons/react";
import { EstadoBadge } from "./EstadoBadge";
import { UpdateEstado } from "./UpdateEstado";

type Lead = {
  id: string;
  created_at: string;
  nombre: string;
  whatsapp_raw: string;
  tipo_servicio: string;
  origen: string;
  destino: string;
  estimado_min: number | null;
  estimado_max: number | null;
  estado: string;
  urgente: boolean;
  cuando: string | null;
  fecha_deseada: string | null;
  ayudantes: number;
  armado: boolean;
  embalaje: boolean;
  piso_origen: string;
  piso_destino: string;
  ascensor_origen: boolean;
  ascensor_destino: boolean;
  especiales: string[];
  modo: string;
  utm_source: string | null;
};

const TIPO_LABELS: Record<string, string> = {
  single_item: "Item puntual",
  flete_chico: "Flete chico",
  flete_grande: "Flete grande",
  mudanza: "Mudanza",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatPrice(min: number | null, max: number | null) {
  if (!min && !max) return "—";
  const fmt = (n: number) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  return fmt(min ?? max ?? 0);
}

export function LeadCard({ lead }: { lead: Lead }) {
  const [expanded, setExpanded] = useState(false);
  const wppLink = `https://wa.me/${lead.whatsapp_raw}?text=${encodeURIComponent(`Hola ${lead.nombre}, te contacto por tu presupuesto de flete.`)}`;

  return (
    <div className="rounded-[1.75rem] p-1.5 bg-black/[0.03] ring-1 ring-black/5">
      <div className="rounded-[calc(1.75rem-0.375rem)] bg-white" style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.6)" }}>
        {/* Summary row */}
        <div className="flex items-start gap-4 p-5">
          {/* Status dot + type */}
          <div className="shrink-0 mt-0.5">
            <EstadoBadge estado={lead.estado} />
          </div>

          {/* Main info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-(--ink) text-sm">{lead.nombre}</span>
              {lead.urgente && (
                <span className="text-[10px] font-bold uppercase tracking-wide text-red-500 bg-red-50 rounded-full px-2 py-0.5 ring-1 ring-red-100">
                  Urgente
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-(--slate-400) mt-0.5">
              <Truck size={11} weight="fill" />
              <span>{TIPO_LABELS[lead.tipo_servicio] ?? lead.tipo_servicio}</span>
              <span className="text-(--line)">·</span>
              <span className="truncate">{lead.origen} → {lead.destino}</span>
            </div>
          </div>

          {/* Price + date */}
          <div className="shrink-0 text-right hidden sm:block">
            <p
              className="text-sm font-semibold text-(--ink) tabular"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {formatPrice(lead.estimado_min, lead.estimado_max)}
            </p>
            <p className="text-[11px] text-(--slate-400) mt-0.5">{formatDate(lead.created_at)}</p>
          </div>

          {/* Actions */}
          <div className="shrink-0 flex items-center gap-2 ml-1">
            <a
              href={wppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] grid place-items-center hover:bg-[#25D366] hover:text-white transition-all duration-300"
              aria-label={`WhatsApp a ${lead.nombre}`}
            >
              <WhatsappLogo size={16} weight="fill" />
            </a>
            <button
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-label={expanded ? "Cerrar detalles" : "Ver detalles"}
              className="w-8 h-8 rounded-full bg-(--bg-soft) text-(--slate-400) grid place-items-center hover:bg-(--brand-50) hover:text-(--brand-500) transition-all duration-300"
            >
              <CaretDown
                size={14}
                weight="bold"
                className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile price row */}
        <div className="flex items-center gap-3 px-5 pb-4 sm:hidden">
          <p className="text-sm font-semibold text-(--ink) tabular" style={{ fontVariantNumeric: "tabular-nums" }}>
            {formatPrice(lead.estimado_min, lead.estimado_max)}
          </p>
          <span className="text-(--line)">·</span>
          <p className="text-xs text-(--slate-400)">{formatDate(lead.created_at)}</p>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="border-t border-(--line) px-5 pb-5 pt-4 flex flex-col gap-5">
            {/* Route + schedule */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <DetailItem icon={<House size={14} />} label="Origen">
                {lead.origen}
                {lead.piso_origen !== "PB" && (
                  <span className="text-(--slate-400)"> · Piso {lead.piso_origen}{lead.ascensor_origen ? " (asc.)" : ""}</span>
                )}
              </DetailItem>
              <DetailItem icon={<House size={14} />} label="Destino">
                {lead.destino}
                {lead.piso_destino !== "PB" && (
                  <span className="text-(--slate-400)"> · Piso {lead.piso_destino}{lead.ascensor_destino ? " (asc.)" : ""}</span>
                )}
              </DetailItem>
              {lead.cuando && (
                <DetailItem icon={<Calendar size={14} />} label="Cuándo">
                  {lead.cuando === "fecha" && lead.fecha_deseada
                    ? lead.fecha_deseada
                    : lead.cuando.replace("_", " ")}
                </DetailItem>
              )}
            </div>

            {/* Extras */}
            {(lead.ayudantes > 0 || lead.armado || lead.embalaje || lead.especiales?.length > 0) && (
              <div className="flex flex-wrap gap-1.5">
                {lead.ayudantes > 0 && <Tag>{lead.ayudantes} ayudante{lead.ayudantes > 1 ? "s" : ""}</Tag>}
                {lead.armado && <Tag>Armado/desarmado</Tag>}
                {lead.embalaje && <Tag>Embalaje</Tag>}
                {lead.especiales?.map((e) => <Tag key={e}>{e}</Tag>)}
              </div>
            )}

            {/* Estado update */}
            <div>
              <p className="text-[11px] uppercase tracking-wide font-medium text-(--slate-400) mb-2">
                Cambiar estado
              </p>
              <UpdateEstado leadId={lead.id} currentEstado={lead.estado} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-(--slate-400) font-medium mb-0.5">
        {icon}
        {label}
      </div>
      <p className="text-(--ink) text-sm">{children}</p>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-(--bg-soft) text-(--slate-600) text-[11px] px-3 py-1 ring-1 ring-(--line) font-medium">
      {children}
    </span>
  );
}
