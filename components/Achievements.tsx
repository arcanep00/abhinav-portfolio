"use client";

import { motion } from "framer-motion";
import { Award, Sparkles } from "lucide-react";
import { achievements } from "@/data/profile";
import { fadeUp, stagger } from "@/lib/motion";
import { GlassCard } from "./GlassCard";
import { Section } from "./Section";

export function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title="Verified highlights from resume-backed experience."
      description="These highlights avoid inflated claims and focus on concrete signals recruiters can evaluate."
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-4 md:grid-cols-3"
      >
        {achievements.map((item, index) => {
          const Icon = item.icon ?? (index === 1 ? Sparkles : Award);
          return (
            <motion.div key={item.title} variants={fadeUp}>
              <GlassCard className="h-full p-6">
                <Icon className="text-goldSoft" size={24} />
                <h3 className="mt-5 font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{item.description}</p>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
