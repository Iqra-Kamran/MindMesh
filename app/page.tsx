"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import mindmeshLogo from '@/public/puzzle club (1).png';
import feature1Image from '@/public/files.jpg';
import feature2Image from '@/public/search.png';
import feature3Image from '@/public/aisummary.jpg';
import { motion } from 'framer-motion';
import  AuthModal  from "@/components/ui/AuthModal";
import { useInView } from 'react-intersection-observer';
import { useAuthModalStore } from "@/lib/store/authModalStore";



function FeatureSection({ 
  title, 
  description, 
  imageSrc,
  open
}: { 
  title: string, 
  description: string, 
  imageSrc: any,
  open: () => void
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
    rootMargin: '-100px'
  });

  return (
    <section 
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 bg-black"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Text Content - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-8 lg:pr-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-purple-100 leading-tight">
            {title}
          </h2>
          <p className="text-xl md:text-2xl text-purple-200/90 leading-relaxed mb-8">
            {description}
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { 
              opacity: 1, 
              y: 0,
              transition: { 
                delay: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 10
              } 
            } : {}}
          >
            
            <Button 
              size="lg" 
              onClick={() => open()}
              className="px-10 py-6 text-lg bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-all"
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Image Content - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-purple-900/30 lg:ml-auto"
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            quality={100}
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

export default  function Home() {
  const { data: session, status } = useSession();
  const { openModal } = useAuthModalStore();

  const features = [
    {
      title: "Capture Anything",
      description: "Notes, PDFs, audio—drop them in and we'll take care of the rest.",
      image: feature1Image
    },
    {
      title: "AI Summaries",
      description: "We generate short, insightful digests for everything you upload.",
      image: feature2Image
    },
    {
      title: "Smart Search",
      description: "Search naturally: 'What was that article on neural dust?'",
      image: feature3Image
    }
  ];

  const [buttonsRef, buttonsInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black to-purple-900/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-8 mb-12"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image 
                src={mindmeshLogo}
                alt="MindMesh Logo"
                width={180}
                height={180}
                className="rounded-lg"
                priority
              />
            </motion.div>
            <h1 className="text-[120px] font-bold bg-gradient-to-r from-purple-300 via-purple-200 to-purple-100 bg-clip-text text-transparent leading-none">
              MindMesh
            </h1>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl md:text-4xl font-semibold text-purple-50 mb-6"
          >
            Your AI-powered second brain for organizing and accessing all your thoughts, links, files, and ideas.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl text-purple-200/90 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Store bookmarks, notes, docs & voice notes. AI will summarize, categorize, and help you recall what matters most.
          </motion.p>
          
          <motion.div
            ref={buttonsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={buttonsInView ? { 
              opacity: 1, 
              y: 0,
              transition: { 
                delay: 0.8,
                type: "spring",
                stiffness: 300,
                damping: 10
              } 
            } : {}}
            className="flex gap-6 justify-center"
          >
            <Button size="lg" className="px-10 py-6 text-lg bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-all" 
             onClick={() => openModal()} >
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="px-10 py-6 text-lg text-purple-100 border-purple-400 hover:bg-purple-900/30 hover:text-white">
              Learn How
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Feature Sections - All with text left, image right */}
      {features.map((feature, index) => (
        <FeatureSection
          key={index}
          title={feature.title}
          description={feature.description}
          imageSrc={feature.image}
          open = {openModal}
        />
      ))}
      <AuthModal/>
    </main>
  );
}