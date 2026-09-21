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
<div className="hidden gap-6 pt-4 lg:flex">
<motion.a
  href="#home"
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.2 }}
  className="group flex flex-col items-center text-sm font-medium leading-none"
>
  <span>Home</span>

  <span
    className="mt-1 h-[2px] w-0 rounded-full bg-[linear-gradient(90deg,#4285F4_0%,#34A853_33%,#FBBC05_66%,#EA4335_100%)] transition-all duration-300 group-hover:w-full"
  />
</motion.a>

<motion.a
  href="#about"
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.2 }}
  className="group flex flex-col items-center text-sm font-medium leading-none"
>
  <span>About Us</span>

  <span
    className="mt-1 h-[2px] w-0 rounded-full bg-[linear-gradient(90deg,#4285F4_0%,#34A853_33%,#FBBC05_66%,#EA4335_100%)] transition-all duration-300 group-hover:w-full"
  />
</motion.a>

<motion.a
  href="#projects"
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.2 }}
  className="group flex flex-col items-center text-sm font-medium leading-none"
>
  <span>Projects</span>

  <span
    className="mt-1 h-[2px] w-0 rounded-full bg-[linear-gradient(90deg,#4285F4_0%,#34A853_33%,#FBBC05_66%,#EA4335_100%)] transition-all duration-300 group-hover:w-full"
  />
</motion.a>

<motion.a
  href="#events"
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.2 }}
  className="group flex flex-col items-center text-sm font-medium leading-none"
>
  <span>Events</span>

  <span
    className="mt-1 h-[2px] w-0 rounded-full bg-[linear-gradient(90deg,#4285F4_0%,#34A853_33%,#FBBC05_66%,#EA4335_100%)] transition-all duration-300 group-hover:w-full"
  />
</motion.a>

<motion.a
  href="#committees"
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.2 }}
  className="group flex flex-col items-center text-sm font-medium leading-none"
>
  <span>Community</span>

  <span
    className="mt-1 h-[2px] w-0 rounded-full bg-[linear-gradient(90deg,#4285F4_0%,#34A853_33%,#FBBC05_66%,#EA4335_100%)] transition-all duration-300 group-hover:w-full"
  />
</motion.a>
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
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                href="#home"
                className="text-sm font-medium leading-none hover:underline"
              >
                Home
              </motion.a>
              <motion.a
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              href="#about"
              className="text-sm font-medium leading-none hover:underline"
              >
              About Us
              </motion.a>
                <motion.a
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              href="#projects"
              className="text-sm font-medium leading-none hover:underline"
              >Projects</motion.a>
                <motion.a
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              href="#events"
              className="text-sm font-medium leading-none hover:underline"
              >Events</motion.a>
                <motion.a
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              href="#committees"
              className="text-sm font-medium leading-none hover:underline"
              >Community</motion.a>
            </motion.div>
        )}
        </AnimatePresence>
    </nav>
);
    
}