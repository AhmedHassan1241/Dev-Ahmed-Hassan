"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp,
  FaPaperPlane, FaCheckCircle,
} from "react-icons/fa";
import SectionHeading from "./SectionHeading";

const SERVICE_ID  = "service_pwjxzvc";
const TEMPLATE_ID = "template_myg9mil";
const PUBLIC_KEY  = "XsyHclKlGqXIlGDvV";

const contactLinks = [
  { icon: FaEnvelope,  label: "Email",    value: "ahmed.hassan.1241999@gmail.com", href: "mailto:ahmed.hassan.1241999@gmail.com"               },
  { icon: FaGithub,    label: "GitHub",   value: "github.com/AhmedHassan1241",      href: "https://github.com/AhmedHassan1241"                 },
  { icon: FaLinkedin,  label: "LinkedIn", value: "Ahmed Hassan",                    href: "https://www.linkedin.com/in/ahmed-hassan-622364108/" },
  { icon: FaWhatsapp,  label: "WhatsApp", value: "+20 109 260 9197",                href: "tel:+201092609197"                                   },
];

const vp = { once: true, margin: "-60px" };

export default function Contact() {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const linksRef = useRef<HTMLDivElement>(null);

  // Magnetic hover on contact links
  useEffect(() => {
    const linkEls = linksRef.current?.querySelectorAll<HTMLElement>(".contact-link");
    linkEls?.forEach((el) => {
      el.addEventListener("mouseenter", () => gsap.to(el, { x: 6, duration: 0.25, ease: "power2.out" }));
      el.addEventListener("mouseleave", () => gsap.to(el, { x: 0, duration: 0.35, ease: "power2.out" }));
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id:      SERVICE_ID,
          template_id:     TEMPLATE_ID,
          user_id:         PUBLIC_KEY,
          template_params: { name: form.name, email: form.email, message: form.message },
        }),
      });
      if (res.ok) { setStatus("sent"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <section id="contact" className="section-padding glass-section">
      <div className="section-container">
        <SectionHeading
          label="Get In Touch"
          title="Contact Me"
          subtitle="Open to back-end opportunities, collaborations, or just a friendly chat."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">

          {/* ── Left: info ── */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-4"
            initial={{ x: -48, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={vp}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="glass-card p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-laravel/5 to-transparent pointer-events-none" />
              <div className="relative">
                <h3 className="text-lg font-bold text-white mb-2">Let&apos;s Work Together</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  I&apos;m currently looking for back-end PHP / Laravel roles. If you have an
                  opportunity or want to collaborate, feel free to reach out!
                </p>
              </div>
            </div>

            <div ref={linksRef} className="flex flex-col gap-3">
              {contactLinks.map(({ icon: Icon, label, value, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="contact-link glass-card p-4 flex items-center gap-4 hover:border-white/15 transition-all duration-300 group"
                  initial={{ x: -32, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={vp}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                >
                  <div className="w-10 h-10 rounded-lg bg-laravel/15 border border-laravel/25 flex items-center justify-center flex-shrink-0 group-hover:bg-laravel/25 transition-colors">
                    <Icon className="text-laravel" size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                    <p className="text-slate-300 text-sm font-medium truncate group-hover:text-white transition-colors">
                      {value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            className="lg:col-span-3"
            initial={{ x: 48, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={vp}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="glass-card p-7">
              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                    <FaCheckCircle className="text-green-400" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                  <p className="text-slate-400 text-sm max-w-xs">
                    Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {status === "error" && (
                    <p className="text-red-400 text-sm text-center">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  {[
                    { id: "name",  label: "Your Name",     type: "text",  placeholder: "Ahmed Hassan"    },
                    { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                  ].map(({ id, label, type, placeholder }) => (
                    <div key={id}>
                      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">
                        {label}
                      </label>
                      <input
                        type={type} id={id} name={id} required autoComplete="off"
                        placeholder={placeholder}
                        value={form[id as keyof typeof form]}
                        onChange={handleChange}
                        onFocus={(e) => gsap.to(e.currentTarget, { borderColor: "rgba(6,182,212,0.55)", duration: 0.25 })}
                        onBlur={(e)  => gsap.to(e.currentTarget, { borderColor: "rgba(255,255,255,0.08)", duration: 0.35 })}
                        className="w-full px-4 py-3 rounded-lg bg-white/[0.06] border border-white/[0.10] text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-all duration-200"
                      />
                    </div>
                  ))}

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message" name="message" required rows={5}
                      placeholder="Tell me about the opportunity or project..."
                      value={form.message}
                      onChange={handleChange}
                      onFocus={(e) => gsap.to(e.currentTarget, { borderColor: "rgba(6,182,212,0.55)", duration: 0.25 })}
                      onBlur={(e)  => gsap.to(e.currentTarget, { borderColor: "rgba(255,255,255,0.08)", duration: 0.35 })}
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.06] border border-white/[0.10] text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-all duration-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.02, duration: 0.2 })}
                    onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1.00, duration: 0.25 })}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-laravel text-white font-semibold rounded-lg hover:bg-[#0891b2] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] text-sm"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <><FaPaperPlane size={13} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
