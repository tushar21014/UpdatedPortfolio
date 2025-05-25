"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Code,
  User,
  Briefcase,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Coffee,
  Leaf,
  Server,
  Zap,
  Database,
  Globe,
  Wrench,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FlipWords } from "@/components/flip-words"
import { GlowingEffectDemo } from "@/components/ui/GlowingEffect"
import LoadingScreen from "@/components/ui/loading-screen"
import Link from "next/link"
import toast, { Toaster } from 'react-hot-toast';
import dotenv from "dotenv";
dotenv.config();

export default function PortfolioV2() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const darkMode = true
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("Backend")

  // Cambiar tema claro/oscuro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      // console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  useEffect(() => {
    window.addEventListener("load", () => {
      setIsLoading(false)
    })
  }, [])


  // Cambiar sección activa basado en scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "home", label: "Home", icon: <Code size={18} /> },
    { id: "about", label: "About", icon: <User size={18} /> },
    { id: "projects", label: "Projects", icon: <Briefcase size={18} /> },
    { id: "education", label: "Education", icon: <GraduationCap size={18} /> },
    { id: "contact", label: "Contact", icon: <Mail size={18} /> },
  ]

  const skillCategories = {
    Backend: [
      { name: "Java", icon: Coffee },
      { name: "SpringBoot", icon: Leaf },
      { name: "Node.js", icon: Server },
      { name: "Express", icon: Zap },
      { name: "MongoDB", icon: Database },
      { name: "SQL", icon: Database },
    ],
    Frontend: [
      { name: "React", icon: Code },
      { name: "JavaScript", icon: Code },
      { name: "HTML/CSS", icon: Globe },
      { name: "TypeScript", icon: Code },
    ],
    Tools: [
      { name: "Git", icon: Wrench },
      { name: "Docker", icon: Wrench },
      { name: "AWS", icon: Wrench },
      { name: "Postman", icon: Wrench },
    ],
  }
  const words = ["robust", "scalable", "efficient", "reliable"];

  const education = [
    {
      period: "2021 - 2024",
      title: "Bachelor of Computer Applications",
      institution: "Institute Of Information Management And Technology",
      description: "Built a strong foundation in programming, web development, software engineering, and cloud technologies.",
    },
    {
      period: "2024 - 2026",
      title: "Master of Computer Applications",
      institution: "Vivekananda Institute Of Professional Studies",
      description: "Expertising in software development, system design, and emerging cloud and backend technologies.",
    },
    // {
    //   period: "En curso",
    //   title: "Certificación en UX/UI Design",
    //   institution: "Plataforma Online",
    //   description: "Aprendiendo principios de diseño de experiencia de usuario e interfaces.",
    // },
  ]

  const internships = [
    {
      period: "2023",
      title: "Application Developer Intern",
      company: "C-DAC",
      description: "Developed 2 Full Stack Projects using Node, SQL, and React. ",
    },
    {
      period: "2023",
      title: "Technical Head",
      company: "Clique Events",
      description: "Led a team of developers to create a web application for event management."
    }
  ]



  interface ContactFormData {
    name: string;
    email: string;
    reason: string;
    message: string;
  }

  const handleSubmit = async ({ name, email, reason, message }: ContactFormData) => {
    const submissionPromise = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        reason,
        message,
      }),
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong!");
      }
      return await response.text();
    });

    await toast.promise(
      submissionPromise,
      {
        loading: "Submitting your query...",
        success: "Query sent successfully!",
        error: (err) => err.message || "Something went wrong!",
      },
      {
        success: { duration: 4000 },
        error: { duration: 4000 },
      }
    );

    return submissionPromise;
  };


  const CodeEditorAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isAnimating, setIsAnimating] = useState(true)

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Set canvas dimensions to match the container
      const updateCanvasSize = () => {
        const container = canvas.parentElement
        if (container) {
          // Set a fixed aspect ratio to ensure content fits
          const width = Math.min(600, container.clientWidth, window.innerWidth * 0.3)
          const height = Math.min(400, width * 0.8)

          canvas.width = width
          canvas.height = height

          // Update canvas style dimensions
          canvas.style.width = `${width}px`
          canvas.style.height = `${height}px`
        }
      }

      // Initial size update
      updateCanvasSize()

      // Listen for resize events
      window.addEventListener("resize", updateCanvasSize)

      // Colors
      const colors = {
        background: "#0f172a", // Darker background
        text: "#e2e8f0",
        comment: "#94a3b8",
        keyword: "#8b5cf6",
        string: "#10b981",
        function: "#3b82f6",
        variable: "#f59e0b",
        cursor: "#f8fafc",
      }

      // Code lines - shortened to ensure they fit
      const codeLines = [
        { text: "// Software Engineer Portfolio", color: colors.comment },
        { text: "import React from 'react';", color: colors.keyword },
        { text: "import { motion } from 'framer-motion';", color: colors.keyword },
        { text: "", color: colors.text },
        { text: "function Portfolio() {", color: colors.function },
        { text: "  const [projects, setProjects] = useState([]);", color: colors.variable },
        { text: "", color: colors.text },
        { text: "  useEffect(() => {", color: colors.function },
        { text: "    // Fetch projects data", color: colors.comment },
        { text: "    fetchProjects().then(data => {", color: colors.function },
        { text: "      setProjects(data);", color: colors.variable },
        { text: "    });", color: colors.text },
        { text: "  }, []);", color: colors.text },
        { text: "", color: colors.text },
        { text: "  return (", color: colors.keyword },
        { text: '    <div className="portfolio">', color: colors.text },
        { text: '      <Header title="Tushar Gupta" />', color: colors.function },
        { text: "      <Hero />", color: colors.function },
        { text: "      <Projects data={projects} />", color: colors.function },
        { text: "      <Contact />", color: colors.function },
        { text: "    </div>", color: colors.text },
        { text: "  );", color: colors.text },
        { text: "}", color: colors.function },
        { text: "", color: colors.text },
        { text: "export default Portfolio;", color: colors.keyword },
      ]

      // Animation variables
      let currentLine = 0
      let currentChar = 0
      let cursorVisible = true
      let lastTime = 0
      let cursorBlinkTime = 0

      // Draw code editor
      const drawEditor = () => {
        if (!ctx) return

        // Get current dimensions
        const width = canvas.width
        const height = canvas.height

        // Scale factors based on canvas size
        const scaleFactor = width / 500 // Base scale on a 500px reference width
        const lineHeight = 16 * scaleFactor
        const startX = 40 * scaleFactor
        const startY = 30 * scaleFactor
        const tabSize = 20 * scaleFactor
        const fontSize = 12 * scaleFactor

        // Clear canvas
        ctx.fillStyle = colors.background
        ctx.fillRect(0, 0, width, height)

        // Draw line numbers background
        ctx.fillStyle = "#0a0f1c" // Even darker background for line numbers
        ctx.fillRect(0, 0, startX - 10 * scaleFactor, height)

        // Draw code lines
        for (let i = 0; i < Math.min(currentLine + 1, codeLines.length); i++) {
          // Safety check to prevent accessing beyond array bounds
          if (i >= codeLines.length) continue

          // Draw line number
          ctx.fillStyle = "#64748b"
          ctx.font = `${fontSize}px monospace`
          ctx.textAlign = "right"
          ctx.fillText(`${i + 1}`, startX - 15 * scaleFactor, startY + i * lineHeight)

          // Draw code text
          if (i < currentLine && i < codeLines.length) {
            // Completed lines
            ctx.fillStyle = codeLines[i].color
            ctx.font = `${fontSize}px monospace`
            ctx.textAlign = "left"

            // Handle indentation
            let indentLevel = 0
            if (codeLines[i].text.startsWith("  ")) {
              indentLevel = Math.floor(codeLines[i].text.match(/^\s+/)?.[0].length || 0) / 2
            }

            ctx.fillText(codeLines[i].text, startX + indentLevel * tabSize, startY + i * lineHeight)
          } else if (i === currentLine && i < codeLines.length) {
            // Current line (typing)
            const currentText = codeLines[i].text.substring(0, currentChar)
            ctx.fillStyle = codeLines[i].color
            ctx.font = `${fontSize}px monospace`
            ctx.textAlign = "left"

            // Handle indentation
            let indentLevel = 0
            if (codeLines[i].text.startsWith("  ")) {
              indentLevel = Math.floor(codeLines[i].text.match(/^\s+/)?.[0].length || 0) / 2
            }

            ctx.fillText(currentText, startX + indentLevel * tabSize, startY + i * lineHeight)

            // Draw cursor
            if (cursorVisible) {
              const cursorX = startX + indentLevel * tabSize + ctx.measureText(currentText).width
              ctx.fillStyle = colors.cursor
              ctx.fillRect(cursorX, startY + i * lineHeight - lineHeight + 3 * scaleFactor, 2 * scaleFactor, lineHeight)
            }
          }
        }
      }

      // Animation loop using requestAnimationFrame instead of setInterval
      const animate = (time: number) => {
        if (!isAnimating) return

        // Calculate delta time
        const deltaTime = time - lastTime
        lastTime = time

        // Handle cursor blinking
        cursorBlinkTime += deltaTime
        if (cursorBlinkTime > 500) {
          cursorVisible = !cursorVisible
          cursorBlinkTime = 0
        }

        // Typing speed control (ms delay between chars)
        const charDelay = 7 // lower = faster

        let timeSinceLastChar = 0

        // Inside animate function:
        timeSinceLastChar += deltaTime
        if (timeSinceLastChar > charDelay) {
          if (currentLine < codeLines.length) {
            if (currentChar < codeLines[currentLine].text.length) {
              currentChar++
            } else {
              currentLine++
              currentChar = 0
            }
          } else {
            currentLine = 0
            currentChar = 0
          }
          timeSinceLastChar = 0
        }



        drawEditor()
        requestAnimationFrame(animate)
      }

      // Start animation
      drawEditor()
      requestAnimationFrame(animate)

      // Cleanup
      return () => {
        setIsAnimating(false)
        window.removeEventListener("resize", updateCanvasSize)
      }
    }, [isAnimating])

    return (
      <div className="relative w-full mx-auto" style={{ minWidth: "30vw" }}>
<div className="absolute top-0 left-0 right-0 h-8 w-[30vw] 2xl:w-[28.2vw] bg-slate-800 rounded-t-lg flex items-center px-4">
<div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-slate-400 mx-auto">portfolio.tsx</div>
        </div>
        <canvas
          ref={canvasRef}
          className="rounded-lg shadow-2xl border border-slate-700 w-full pt-4 pl-0 "
          style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        />
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Toaster />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-white font-bold">
              TG
            </div>
            {/* <span className="font-bold text-xl hidden sm:block">Tushar Gupta</span> */}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-4 py-2 rounded-md transition-colors ${activeSection === item.id
                  ? "bg-gray-100 dark:bg-gray-800 text-teal-500 dark:text-teal-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)} className="rounded-full">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button> */}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>

            {/* <a href="#contact">

            <Button className="hidden md:flex bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white border-0 cursor-pointer">
              Contact
            </Button>
            </a> */}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-[#0f172a] pt-16"
          >
            <nav className="container mx-auto px-4 py-8 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">{item.icon}</div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16 max-w-[85%] mx-auto">

        {isLoading && <LoadingScreen />}

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="order-2 md:order-1 z-10"
              >
                <Badge className="mb-4 bg-teal-500/10 text-teal-500 dark:bg-teal-400/10 dark:text-teal-400 hover:bg-teal-500/20 dark:hover:bg-teal-400/20">
                  Backend Developer
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Hello, I&apos;m{" "}
                  <span className="bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent">
                    Tushar Gupta
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Passionate backend developer focused on building
                  <FlipWords words={words} /> <br />
                  systems.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="https://github.com/tushar21014" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white border-0 cursor-pointer">
                      View Projects <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  {/* <Button variant="outline" className="border-gray-300 dark:border-gray-700">
                    Descargar CV
                  </Button> */}
                </div>

                <div className="mt-12 flex gap-4">
                  <a
                    href="https://github.com/tushar21014"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://leetcode.com/u/Tushar21014/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer"
                  >
                    <Code size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/tushar-gupta-5666ba23b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="mailto:tg21014@gmail.com"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors cursor-pointer"
                  >
                    <Mail size={20} />
                  </a>
                </div>

              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="order-1 md:order-2 justify-center hidden md:flex"
              >
                {/* Text content */}

                {/* Code Editor Animation */}
                <motion.div
                  style={{ height: '60vh', width: '30vw', padding: '0px' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <CodeEditorAnimation />
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* About Section */}

        <section id="about" className="py-20 bg-gray-100 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge className="mb-4 bg-teal-500/10 text-teal-500 dark:bg-teal-400/10 dark:text-teal-400">
                About Me
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Get to know me better</h2>
              <p className="text-gray-600 dark:text-gray-300 hidden sm:block">
                I am a backend web developer with a passion for learning new technologies and creating innovative solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">My Story</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 z-10">
                  I&apos;m a AWS Certified backend developer with a passion for learning new technologies and creating scalable and innovative solutions.
                  My goal is to develop scalable and
                  efficient programs to create exceptional user experiences.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  I&apos;m a java developer but I have experience with Node.js and databases. I love competitive programming and collaborating with different teams.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm z-10">
                    <div className="text-3xl font-bold text-teal-500 dark:text-teal-400 mb-1">300+</div>
                    <div className="text-gray-600 dark:text-gray-300">Questions Solved on Leetcode</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm z-10">
                    <div className="text-3xl font-bold text-indigo-500 dark:text-indigo-400 mb-1 z-10">10+</div>
                    <div className="text-gray-600 dark:text-gray-300">Projects Completed</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Skills */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>

                <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-0 mb-8">
                  <div className="bg-slate-800 p-1 rounded-lg border border-slate-700 flex flex-col md:flex-row">
                    {Object.keys(skillCategories).map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`px-6 py-2 rounded-md transition-all duration-200 ${activeTab === category
                          ? "bg-cyan-500 text-white shadow-lg"
                          : "text-gray-400 hover:text-white hover:bg-slate-700"
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>


                {/* Skills Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {skillCategories[activeTab as keyof typeof skillCategories].map((skill) => {
                    const IconComponent = skill.icon
                    return (
                      <div
                        key={skill.name}
                        className="group bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 cursor-pointer"
                      >
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className="p-3 bg-slate-700 rounded-xl group-hover:bg-cyan-500 transition-all duration-300 group-hover:scale-110">
                            <IconComponent className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors duration-300" />
                          </div>
                          <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                            {skill.name}
                          </h3>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge className="mb-4 bg-teal-500/10 text-teal-500 dark:bg-teal-400/10 dark:text-teal-400">
                Projects
              </Badge>
              <h2 className="text-3xl font-bold mb-4">My recent work</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Here is a selection of projects I have worked on recently.</p>
            </div>

            <GlowingEffectDemo />
            {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                        <div className="flex gap-3">
                          <a
                            href={project.github}
                            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                          >
                            <Github size={18} className="text-white" />
                          </a>
                          <a
                            href={project.demo}
                            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                          >
                            <ExternalLink size={18} className="text-white" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-0"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div> */}

            <div className="text-center mt-12">
              <a href="https://github.com/tushar21014" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-gray-300 dark:border-gray-700 cursor-pointer">
                  View My Projects
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 bg-gray-100 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge className="mb-4 bg-teal-500/10 text-teal-500 dark:bg-teal-400/10 dark:text-teal-400">
                Education
              </Badge>
              <h2 className="text-3xl font-bold mb-4">My academic training</h2>
              <p className="text-gray-600 dark:text-gray-300">My educational background and professional training.</p>

            </div>

            <div className="max-w-4xl mx-auto">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 mb-12 last:mb-0"
                >
                  <div className="hidden sm:block pt-1">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500"></div>
                    </div>
                    {index !== education.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 ml-6 mt-2"></div>
                    )}
                  </div>

                  <div className="flex flex-col">

                    <Card className="flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <CardContent className="p-6">
                        <Badge className="mb-2 bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400">
                          {item.period}

                        </Badge>

                        <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">{item.institution}</p>
                        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                      </CardContent>

                    </Card>

                    {/* <div className="hidden sm:block pt-1">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500"></div>
                    </div>
                    {index !== education.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 ml-6 mt-2"></div>
                    )}
                  </div> */}
                    {index !== 1 && internships.map((internship, subIndex) => (
                      <div key={subIndex} className="flex gap-6 mb-12 last:mb-0">
                        <div className="hidden sm:block pt-1 mt-20">
                          <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500"></div>
                          </div>
                          {subIndex !== internships.length - 1 && (
                            <div className="w-0.5 h-[24vh] lg:h-[24vh] xl:h-[18.5vh] absolute bg-gray-200 dark:bg-gray-700 ml-6 mt-2"></div>
                          )}
                        </div>

                        <Card className="flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mt-10">
                          <CardContent className="p-6">
                            <Badge className="mb-2 bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400">
                              {internship.period}
                            </Badge>
                            <h3 className="text-xl font-semibold mb-1">{internship.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">{internship.company}</p>
                            <p className="text-gray-600 dark:text-gray-300">{internship.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                    ))}

                  </div>

                </motion.div>
              ))}


            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge className="mb-4 bg-teal-500/10 text-teal-500 dark:bg-teal-400/10 dark:text-teal-400">
                Contact
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Talk Later?</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Interested in working together or have any questions?
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden p-0">
                <div className="grid md:grid-cols-5">
                  <div className="md:col-span-2 bg-gradient-to-br from-teal-500 to-indigo-500 p-8 text-white">
                    <h3 className="text-2xl font-semibold mb-6">Contact information</h3>
                    <p className="mb-8 opacity-90">
                      Fill out the form and I&apos;ll get back to you as soon as possible.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-white/20">
                          <Mail size={20} />
                        </div>
                        <Link
                          href="mailto:tg21014@gmail.com"
                          className="text-white"
                        >
                          tg21014@gmail.com
                        </Link>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-white/20">
                          <Github size={20} />
                        </div>
                        <Link
                          href="https://github.com/tushar21014"
                          target="_blank"
                          className="text-white"
                        >
                          github.com/tushar21014
                        </Link>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-white/20">
                          <Linkedin size={20} />
                        </div>
                        <Link
                          href="https://linkedin.com/in/tushar-gupta-5666ba23b"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white"
                        >
                          linkedin.com/in/tushar-gupta-5666ba23b
                        </Link>
                      </div>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 opacity-10">
                      <Code size={180} />
                    </div>
                  </div>

                  <div className="md:col-span-3 p-8 z-10">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            placeholder="Your Name"
                            className="w-full z-10 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            placeholder="youremail@gmail.com"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                        >
                          Reason
                        </label>
                        <input
                          type="text"
                          id="subject"
                          placeholder="Subject or Reason for Contact"
                          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          placeholder="Your message here..."
                          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
                        />
                      </div>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          const formData: ContactFormData = {
                            name: (document.getElementById("name") as HTMLInputElement).value,
                            email: (document.getElementById("email") as HTMLInputElement).value,
                            reason: (document.getElementById("subject") as HTMLInputElement).value,
                            message: (document.getElementById("message") as HTMLTextAreaElement).value,
                          };
                          handleSubmit(formData).catch((error) => console.error(error));

                          const resetForm = (): void => {
                            // alert("Message sent successfully!");
                            (document.getElementById("name") as HTMLInputElement).value = "";
                            (document.getElementById("email") as HTMLInputElement).value = "";
                            (document.getElementById("subject") as HTMLInputElement).value = "";
                            (document.getElementById("message") as HTMLTextAreaElement).value = "";
                          };
                          resetForm();
                        }}

                        className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white border-0 cursor-pointer"
                      >
                        Send Message
                      </Button>
                    </form>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                TG
              </div>
              <span className="font-bold">Tushar Gupta</span>
            </div>

            <div className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Tushar Gupta. All rights reserved.
            </div>

            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                href="https://github.com/tushar21014"
                target="_blank"
                className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/tushar-gupta-5666ba23b/"
                className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                target="_blank"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:tg21014@gmail.com"
                className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                target="_blank"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://leetcode.com/u/Tushar21014/"
                className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                target="_blank"
              >
                <Code size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
