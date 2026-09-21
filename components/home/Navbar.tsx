"use client";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
export default function Navbar() {
const [isOpen, setIsOpen] = useState(false);

const menuVariants = {
  closed: {
    opacity: 0,
    y: -20,
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
    },
  },
};
const itemVariants = {
   closed: {
    opacity: 0,
    y: -10,
  },
  open: {
    opacity: 1,
    y: 0,
  },
};

return (
    <nav className="absolute top-0 left-0 z-40 flex w-full justify-between p-6 text-white">
        <div>
            <img src="/images/gdg-white-logo.png" alt="GDG on Campus University of Jeddah logo" className="w-[350px] h-auto" />     
        </div>
        <div className="hidden lg:flex gap-6 pt-4">
            <a href="#home">Home</a>
            <a href="#about">About Us</a>
            <a href="#projects">Projects</a>
            <a href="#events">Events</a>
            <a href="#committees">Community</a>
        </div>
        <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
              className={`relative z-50 text-3xl ${
                isOpen ? "text-black" : "text-white"
                } lg:hidden`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen} 
        >
            {isOpen ? <IoIosClose />: <IoMenu/>}
        </button>
        {/* Mobile Menu */}
        <AnimatePresence>
        {isOpen && (
            <motion.div className="absolute top-8 right-4 z-40 flex w-56 flex-col gap-5 rounded-2xl bg-white px-6 pb-6 pt-16 text-black shadow-lg backdrop-blur-md lg:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            >
                <motion.a
                variants={itemVariants}
                href="/">Home</motion.a>
                <motion.a
                variants={itemVariants}
                href="/about">About Us</motion.a>
                <motion.a
                variants={itemVariants}
                href="/projects">Projects</motion.a>
                <motion.a
                variants={itemVariants}
                href="/events">Events</motion.a>
                <motion.a
                variants={itemVariants}
                href="/community">Community</motion.a>
            </motion.div>
        )}
        </AnimatePresence>
    </nav>
);
    
}