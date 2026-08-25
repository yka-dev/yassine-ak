import { Github, Globe } from "@lucide/svelte";
import { base } from "$app/paths";
import ContactThumbnail from "@/components/contact-thumbnail.svelte";
import {
  SiGo,
  SiGoland,
  SiGsap,
  SiPostgresql,
  SiReact,
  SiReactrouter,
  SiRedis,
  SiSvelte,
  SiTailwindcss,
  SiTypescript,
} from "@icons-pack/svelte-simple-icons";

const projects = [
  {
    start: "2026",
    end: "Now",
    title: "Lenss",
    thumbnail1: {
      type: "image",
      src: `${base}/work/lenss/thumbnail1.png`,
    },
    thumbnail2: `${base}/work/lenss/thumbnail2.png`,
    galleryItems: [
      {
        type: "image",
        src: `${base}/work/lenss/thumbnail2.png`,
      },
      {
        type: "image",
        src: `${base}/work/lenss/1.png`,
      },
      {
        type: "image",
        src: `${base}/work/lenss/2.png`,
      },
      {
        type: "image",
        src: `${base}/work/lenss/3.png`,
      },
    ],
    shortDescription: "Feedback management platform for SaaS teams.",
    description:
      "Lenss is a feedback management platform that helps SaaS teams collect, organize, and prioritize user feedback. It automatically groups related feedback and surfaces critical and urgent issues, making it easier to understand what users need and decide what to work on next.",
    features: [
      "Centralized feedback collection from multiple sources",
      "Automatic grouping of related feedback",
      "Automatic prioritization of critical and urgent feedback",
      "Feedback portal that can be integrated into existing products",
      "API for programmatic feedback collection",
    ],
    why: "I built Lenss to make customer feedback easier to manage at scale. Instead of manually sorting through individual requests and trying to determine which issues matter most, Lenss automatically organizes feedback and highlights what needs attention.",
    techStack: [
      { name: "React Router", icon: SiReactrouter },
      { name: "Go", icon: SiGo },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
    links: [
      {
        label: "Website",
        href: "https://lenss.app",
        icon: Globe,
      },
    ],
  },
  {
    start: "2024",
    end: "2025",
    title: "Measurely",
    thumbnail1: {
      type: "image",
      src: `${base}/work/measurely/thumbnail1.png`,
    },
    thumbnail2: `${base}/work/measurely/thumbnail2.png`,
    galleryItems: [
      {
        type: "image",
        src: `${base}/work/measurely/3.png`,
      },
      {
        type: "image",
        src: `${base}/work/measurely/2.png`,
      },
      {
        type: "image",
        src: `${base}/work/measurely/1.png`,
      },
    ],
    shortDescription:
      "Open-source analytics platform for tracking and visualizing metrics.",
    description:
      "Measurely is an open-source analytics platform designed to make tracking, analyzing, and visualizing metrics simple. It provides developers with customizable metric types, real-time insights, and an API-first integration model, allowing applications to send and explore metrics while maintaining full control over their data.",
    features: [
      "Developer-friendly API with API key authentication",
      "Real-time metric monitoring and dashboard visualization",
      "Custom metric types including basic metrics and dual metrics",
      "Advanced configuration options such as offsets and custom tracking periods",
      "Customizable visualization blocks for charts and tables",
      "Team collaboration with role-based permissions",
      "SDK support for JavaScript/TypeScript, Go, and Python",
    ],
    why: "I built Measurely to explore how analytics systems are designed and to create a developer-focused platform where collecting and visualizing application metrics is simple, flexible, and fully controllable.",
    techStack: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "Golang", icon: SiGoland },
      { name: "React", icon: SiReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Postgresql", icon: SiPostgresql },
      { name: "Redis", icon: SiRedis },
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Measurely-dev/Measurely",
        icon: Github,
      },
    ],
  },
  {
    start: "2026",
    end: "2026",
    title: "Portfolio Website",
    thumbnail1: {
      type: "image",
      src: `${base}/work/portfolio/thumbnail1.png`,
    },
    thumbnail2: `${base}/work/portfolio/thumbnail2.png`,
    galleryItems: [
      {
        type: "image",
        src: `${base}/work/portfolio/thumbnail2.png`,
      },
      {
        type: "image",
        src: `${base}/work/portfolio/1.png`,
      },
      {
        type: "image",
        src: `${base}/work/portfolio/2.png`,
      },
      {
        type: "image",
        src: `${base}/work/portfolio/3.png`,
      },
    ],
    shortDescription: "Personal developer portfolio built with SvelteKit.",
    description:
      "A personal portfolio website built with SvelteKit to showcase my projects, experiments, and technical work. The site focuses on clear presentation, smooth navigation, and a structured way to explore the projects I have built.",
    features: [
      "Project showcase with detailed project pages",
      "Responsive layout designed for desktop and mobile devices",
      "Image and media gallery for presenting project visuals",
      "Structured sections for projects, tools, and contact",
    ],
    why: "I built this portfolio to have a central place where I can present my projects and technical work, while also experimenting with modern front-end frameworks and interface design.",
    techStack: [
      { name: "SvelteKit", icon: SiSvelte },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "GSAP", icon: SiGsap },
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/yka-dev/yassine-ak",
        icon: Github,
      },
      {
        label: "Website",
        href: "https://yka-dev.github.io/portfolio",
        icon: Globe,
      },
    ],
  },
  {
    start: "2023",
    end: "2023",
    title: "CPP_",
    thumbnail1: {
      type: "image",
      src: `${base}/work/cpp_/thumbnail1.png`,
    },
    thumbnail2: `${base}/work/cpp_/thumbnail1.png`,
    galleryItems: [
      {
        type: "video",
        src: `${base}/work/cpp_/video1.mp4`,
      },
      {
        type: "video",
        src: `${base}/work/cpp_/video2.mp4`,
      },
    ],
    shortDescription:
      "VS Code extension for building multi-file C and C++ projects.",
    description:
      "CPP_ is a Visual Studio Code extension that simplifies building C and C++ projects. It automatically discovers all source files in a project and compiles them using configurable build settings. The extension supports multiple application types, customizable compiler options, and parallel compilation to reduce build times.",
    features: [
      "Automatic discovery and compilation of multi-file C and C++ projects",
      "Support for executables, dynamic libraries (DLL), and static libraries",
      "Configurable include paths, library directories, libraries, and preprocessors",
      "Debug and Release build modes with configurable optimization levels",
      "Parallel compilation for faster builds",
      "Compilation history system to avoid recompiling unchanged files",
      "Commands to compile, recompile, run, and configure projects directly from VS Code",
    ],
    why: "I built this extension to simplify the process of compiling multi-file C and C++ projects in Visual Studio Code and automate the configuration typically required when working with larger C++ codebases.",
    techStack: [{ name: "TypeScript", icon: SiTypescript }],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/yka-dev/CPP_extension",
        icon: Github,
      },
      {
        label: "Vscode Marketplace",
        href: "https://marketplace.visualstudio.com/items?itemName=bleastProgram.CPP-Compiler",
        icon: Globe,
      },
    ],
  },
  {
    title: "Have something in mind ?",
    thumbnail1: {
      type: "component",
      component: ContactThumbnail,
    },
    shortDescription:
      "Contact me for any project or idea that you have in mind.",
  },
];

export default projects;
