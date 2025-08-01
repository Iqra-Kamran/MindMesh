'use client';

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-[#0f0f0f] to-[#111827]">
        <motion.img
          src="/logo.png"
          alt="MindMesh Logo"
          className="w-16 h-16 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          MindMesh – Your AI Second Brain
        </motion.h1>
        <motion.p
          className="max-w-2xl text-lg text-gray-300 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Store bookmarks, notes, docs & voice notes. AI will summarize, categorize, and help you recall what matters most.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg shadow-lg">
            Get Started
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-3 rounded-xl text-lg">
            Learn How
          </Button>
        </motion.div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-16 max-w-6xl mx-auto">
        {[
          ['Capture Anything', 'Notes, PDFs, audio—drop them in and we’ll take care of the rest.'],
          ['AI Summaries', 'We generate short, insightful digests for everything you upload.'],
          ['Smart Search', 'Search naturally: “What was that article on neural dust?”'],
          ['Visual Categories', 'Content grouped intelligently into themes and tags.'],
          ['Weekly Digests', 'Every week, get a personalized summary of what matters.'],
          ['Seamless Sync', 'Everything is backed up, synced, and searchable.'],
        ].map(([title, desc]) => (
          <motion.div
            key={title}
            className="bg-[#1f1f1f] p-6 rounded-2xl shadow hover:shadow-lg hover:scale-[1.02] transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-400">{desc}</p>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
