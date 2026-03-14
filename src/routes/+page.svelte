<script lang="ts">
    import PlasmaGrid from "$lib/motion-core/plasma-grid/PlasmaGrid.svelte";
    import {
        Github,
        Linkedin,
        X,
    } from "@lucide/svelte";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import { fade, scale } from "svelte/transition";
    import { onMount } from "svelte";
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import SplitReveal from "$lib/motion-core/split-reveal/SplitReveal.svelte";
    import TextLoop from "$lib/motion-core/text-loop/TextLoop.svelte";
    import Highlighter from "$lib/components/ori/text-highlighter/text-highlighter.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import projects from "./projects.ts";
    import tools from "./tools.ts";

    const COLOR_PRESETS = {
        dark: {
            color: "#18181B",
            highlightColor: "#572400",
        },
        light: {
            color: "#CBCBCB",
            highlightColor: "#636363",
        },
    };

    let imgWrapperRef: HTMLButtonElement | undefined;
    let imageButtonAnimation: gsap.core.Tween | undefined;
    let imageButtonTrigger: ScrollTrigger | undefined;

    let scrollProgress = $state(0);
    let workCarouselSection: HTMLDivElement | undefined;
    let loading = $state(true);
    let reveal = $state(false);
    let selectedProjectIndex = $state(0);
    let displayedProjectIndex = $state(0);
    let isProjectDetailsVisible = $state(true);
    let projectSwapTimeout: ReturnType<typeof setTimeout> | undefined;
    let isGalleryOpen = $state(false);
    let gallerySelectedIndex = $state(0);
    let galleryApi:
        | import("$lib/components/ui/carousel/context.js").CarouselAPI
        | undefined;

    const displayedProject = $derived(projects[displayedProjectIndex]);
    const galleryItems = $derived(displayedProject.galleryItems ?? []);

    const openGallery = () => {
        if (!galleryItems.length) return;
        gallerySelectedIndex = 0;
        isGalleryOpen = true;
        document.body.style.overflow = "hidden";
    };

    const closeGallery = () => {
        isGalleryOpen = false;
        galleryApi = undefined;
        document.body.style.overflow = "";
    };

    const showProjectDetails = (index: number) => {
        if (index === displayedProjectIndex) return;

        isProjectDetailsVisible = false;
        if (projectSwapTimeout) clearTimeout(projectSwapTimeout);

        projectSwapTimeout = setTimeout(() => {
            displayedProjectIndex = index;
            isProjectDetailsVisible = true;
        }, 220);
    };

    const clamp = (value: number, min = 0, max = 1) =>
        Math.min(max, Math.max(min, value));

    const mapRange = (
        value: number,
        inMin: number,
        inMax: number,
        outMin: number,
        outMax: number,
    ) => {
        if (inMax === inMin) return outMin;
        const progress = clamp((value - inMin) / (inMax - inMin));
        return outMin + (outMax - outMin) * progress;
    };

    const updateScrollProgress = () => {
        const viewportHeight = window.innerHeight || 1;
        scrollProgress = clamp(window.scrollY / viewportHeight);
    };

    onMount(() => {
        document.body.style.overflow = "hidden";
        gsap.registerPlugin(ScrollTrigger);

        updateScrollProgress();
        window.addEventListener("scroll", updateScrollProgress, {
            passive: true,
        });
        window.addEventListener("resize", updateScrollProgress);

        let animation: gsap.core.Tween | undefined;
        let trigger: ScrollTrigger | undefined;

        if (workCarouselSection) {
            const cards = workCarouselSection.querySelectorAll("article");
            const controls = workCarouselSection.querySelectorAll(
                "[data-carousel-controls]",
            );

            gsap.set([...cards, ...controls], {
                y: 48,
                opacity: 0,
            });

            animation = gsap.to([...cards, ...controls], {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.05,
                delay: 0.5,
                scrollTrigger: {
                    trigger: workCarouselSection,
                    start: "top 80%",
                    once: true,
                },
            });

            trigger = animation.scrollTrigger;
        }

        if (imgWrapperRef) {
            gsap.set(imgWrapperRef, {
                y: 24,
                opacity: 0,
                scale: 0.96,
            });

            imageButtonAnimation = gsap.to(imgWrapperRef, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.55,
                ease: "power3.out",
                paused: true,
            });

            imageButtonTrigger = ScrollTrigger.create({
                trigger: imgWrapperRef,
                start: "top 85%",
                onEnter: () => imageButtonAnimation?.restart(),
                onEnterBack: () => imageButtonAnimation?.restart(),
            });
        }

        setTimeout(() => {
            reveal = true;
        }, 1000);
        setTimeout(() => {
            loading = false;
            document.body.style.overflow = "";
        }, 2000);

        return () => {
            trigger?.kill();
            animation?.kill();
            imageButtonTrigger?.kill();
            imageButtonAnimation?.kill();
            if (projectSwapTimeout) clearTimeout(projectSwapTimeout);
            document.body.style.overflow = "";
            window.removeEventListener("scroll", updateScrollProgress);
            window.removeEventListener("resize", updateScrollProgress);
        };
    });

    $effect(() => {
        displayedProjectIndex;

        if (!imgWrapperRef) return;

        imageButtonTrigger?.kill();
        imageButtonAnimation?.kill();
        gsap.killTweensOf(imgWrapperRef);

        gsap.set(imgWrapperRef, {
            y: 24,
            opacity: 0,
            scale: 0.96,
        });

        imageButtonAnimation = gsap.to(imgWrapperRef, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: "power3.out",
            paused: true,
        });

        imageButtonTrigger = ScrollTrigger.create({
            trigger: imgWrapperRef,
            start: "top 85%",
            onEnter: () => imageButtonAnimation?.restart(),
            onEnterBack: () => imageButtonAnimation?.restart(),
        });

        ScrollTrigger.refresh();
    });

    const heroOpacity = $derived(mapRange(scrollProgress, 0, 1, 1, 0));
    const heroScale = $derived(mapRange(scrollProgress, 0, 1, 1, 0.82));

    const contentOpacity = $derived(mapRange(scrollProgress, 0.72, 1, 0, 1));
    const contentScale = $derived(mapRange(scrollProgress, 0.72, 1, 0.92, 1));
    const contentTranslateY = $derived(
        mapRange(scrollProgress, 0.72, 1, 64, 0),
    );
</script>

<svelte:head>
    <title>Yassine Akhouayri</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<PlasmaGrid
    color={COLOR_PRESETS.light.color}
    highlightColor={COLOR_PRESETS.light.highlightColor}
    class={`fixed inset-0 z-10 min-h-screen min-w-screen opacity-15`}
/>

{#if loading}
    <div
        class={`loader flex bg-foreground justify-center items-center w-screen h-screen absolute left-0 top-0 z-40 ${reveal ? "reveal" : ""}`}
    >
        <span class="font-serif text-accent text-5xl">yka.</span>
    </div>
{/if}

<div class="bg-background">
    <header
        class="fixed top-0 left-0 z-30 flex items-center justify-center min-w-screen gap-2 pt-5"
    >
        <span
            class="font-serif text-accent text-center text-2xl bg-foreground px-5 py-1"
            >yka.</span
        >

        <div class="flex items-center gap-2">
            <a
                href="https://github.com/yka-dev"
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
                class="flex items-center justify-center text-foreground/80 transition-colors hover:text-foreground"
                style="
                    width: calc(var(--spacing) * 10);
                    height: calc(var(--spacing) * 10);
                    border-radius: var(--radius);
                    border: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
                    background: color-mix(in oklab, var(--background) 70%, transparent);
                    backdrop-filter: blur(calc(var(--spacing) * 1));
                "
            >
                <Github size={18} />
            </a>
            <a
                href="https://www.linkedin.com/in/yassine-akhouayri"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
                class="flex items-center justify-center text-foreground/80 transition-colors hover:text-foreground"
                style="
                    width: calc(var(--spacing) * 10);
                    height: calc(var(--spacing) * 10);
                    border-radius: var(--radius);
                    border: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
                    background: color-mix(in oklab, var(--background) 70%, transparent);
                    backdrop-filter: blur(calc(var(--spacing) * 1));
                "
            >
                <Linkedin size={18} />
            </a>
        </div>
    </header>

    <div class="relative min-h-[200vh]">
        <section class="sticky top-0 z-10 h-screen">
            <div
                class="relative z-10 flex h-full w-full flex-col items-center"
                style={`
                    opacity: ${heroOpacity};
                    transform: scale(${heroScale});
                    transform-origin: center center;
                    will-change: transform, opacity;
                    pointer-events: ${scrollProgress >= 1 ? "none" : "auto"};
                `}
            >
                <div class="flex min-h-screen w-full max-w-7xl flex-col">
                    <section
                        class="relative flex flex-1 items-center justify-center overflow-hidden"
                    >
                        <div class="select-none text-center]">
                            <SplitReveal
                                mode="chars"
                                delay={1.1}
                                config={{
                                    chars: { stagger: 0.03 },
                                }}
                                class="text-center leading-[0.85] text-foreground font-serif  text-7xl"
                            >
                                Yassine<br />
                                <span
                                    class="text-center text-foreground font-serif text-8xl"
                                    >Akhouayri</span
                                >
                            </SplitReveal>
                        </div>

                        <SplitReveal
                            mode="words"
                            class="absolute text-muted-foreground"
                            delay={1.4}
                            style="
                                    bottom: calc(var(--spacing) * 10);
                                    left: calc(var(--spacing) * 10);
                                "
                        >
                            <h2
                                class="text-left font-serif italic text-muted-foreground text-3xl"
                            >
                                A collection of <TextLoop
                                    class="text-secondary-foreground"
                                    texts={["projects", "ideas", "experiments"]}
                                    interval={2000}
                                /> <br />
                                by
                                <Highlighter color="#000000" action="underline"
                                    >Yassine</Highlighter
                                >
                            </h2>
                        </SplitReveal>
                    </section>
                </div>
            </div>
        </section>
    </div>

    <div
        class="relative z-20 flex flex-col items-center gap-100"
        style={`
            opacity: ${contentOpacity};
            transform: translateY(${contentTranslateY}px) scale(${contentScale});
            transform-origin: center center;
            will-change: transform, opacity;
            pointer-events: auto;
        `}
    >
        <section
            id="about"
            class="flex min-h-screen flex-col items-center justify-center gap-5"
        >
            <div class="flex flex-col items-center gap-4">
                <SplitReveal
                    triggerOnScroll={true}
                    mode="chars"
                    class="font-light leading-none text-foreground font-serif text-4xl"
                >
                    About me
                </SplitReveal>
            </div>
            <SplitReveal
                triggerOnScroll={true}
                mode="lines"
                class="text-left text-muted-foreground text-lg max-w-200 font-sans px-12"
            >
                Hi, I'm Yassine Akhouayri. I'm 18 years old and currently living
                in Montreal, Canada. I’ve always been curious about how
                technology works and how complex systems are built, which
                naturally led me to programming.
                <div class="h-10"></div>

                I started learning to code on my own a few years ago. What began
                as simple curiosity quickly turned into something I spent more
                and more time exploring. Everything I know about programming so
                far has been self-taught through documentation, online
                resources, and a lot of experimentation.
                <div class="h-10"></div>

                Most of what I learn comes from building things. I like taking
                an idea and turning it into a real project, figuring out
                problems along the way and improving the system step by step.
                That process of designing, debugging, and refining software is
                what I enjoy the most.
                <div class="h-10"></div>

                In the near future, I plan to study electrical engineering to
                better understand the hardware and systems that power modern
                computing. I'm particularly interested in the relationship
                between software and the underlying technology it runs on.
                <div class="h-10"></div>

                Outside of programming, I spend a lot of time learning new
                technologies, experimenting with ideas, and working on side
                projects to push my skills further.
            </SplitReveal>
        </section>

        <section id="work" class="min-h-screen">
            <div
                class="mx-auto flex w-full max-w-7xl flex-col gap-4 items-center"
            >
                <div class="flex flex-col items-center gap-5">
                    <SplitReveal
                        triggerOnScroll={true}
                        mode="chars"
                        class="font-light leading-none text-foreground font-serif text-4xl"
                    >
                        My work
                    </SplitReveal>
                    <SplitReveal
                        triggerOnScroll={true}
                        delay={0.2}
                        mode="lines"
                        class="text-muted-foreground text-base w-100 font-sans px-12"
                    >
                        My work focuses on building projects that help me
                        explore new ideas and improve my understanding of
                        software systems. Most of what I create comes from
                        curiosity and the desire to experiment, learn, and
                        gradually refine how I design and build things.
                    </SplitReveal>
                </div>

                <div
                    class="flex justify-center mt-5 max-w-screen"
                    bind:this={workCarouselSection}
                >
                    <Carousel.Root
                        opts={{
                            align: "start",
                            loop: false,
                        }}
                        class="px-10 max-w-screen"
                    >
                        <Carousel.Content>
                            {#each projects as project, i (i)}
                                <Carousel.Item
                                    class="max-w-100"
                                    onclick={() => {
                                        if (i !== projects.length - 1) {
                                            selectedProjectIndex = i;
                                            showProjectDetails(i);
                                        }
                                    }}
                                >
                                    <article
                                        class="project-card overflow-hidden flex flex-col justify-between"
                                        style="
		border-radius: var(--radius-xl);
		border: {i === selectedProjectIndex
                                            ? '2px solid color-mix(in oklab, var(--foreground) 20%, transparent)'
                                            : '1px solid color-mix(in oklab, var(--border) 60%, transparent)'};
		background: color-mix(in oklab, var(--background) 70%, transparent);
		box-shadow: var(--shadow-sm);
		backdrop-filter: blur(calc(var(--spacing) * 1));
	"
                                    >
                                        <div
                                            class="absolute h-80 w-full overflow-hidden flex items-center justify-center"
                                        >
                                            {#if project.thumbnail1.type === "image"}
                                                <img
                                                    src={project.thumbnail1.src}
                                                    alt={project.title}
                                                    class="h-full w-full object-contain"
                                                />
                                            {:else}
                                                <project.thumbnail1.component />
                                            {/if}
                                        </div>

                                        <div class="h-full"></div>
                                        <div
                                            class="content z-10 p-6 flex flex-col items-start gap-3 bg-linear-to-t from-background/90 to-transparent"
                                        >
                                            <div class="text">
                                                <h3
                                                    class="text-2xl flex items-center font-serif text-foreground gap-2"
                                                >
                                                    {project.title}
                                                    {#if project.start !== undefined && project.end !== undefined}
                                                        <span
                                                            class="text-sm text-muted-foreground"
                                                        >
                                                            {project.start ===
                                                            project.end
                                                                ? `(${project.start})`
                                                                : `(${project.start} - ${project.end})`}</span
                                                        >
                                                    {/if}
                                                </h3>

                                                <p
                                                    class="text-sm font-inter leading-6 text-muted-foreground"
                                                >
                                                    {project.shortDescription}
                                                </p>
                                            </div>

                                            {#if i == projects.length - 1}
                                                <a
                                                    href="mailto:yassaine_akh@proton.me"
                                                    class="learn-more inline-flex text-sm font-medium bg-background text-foreground py-2 px-5 cursor-pointer border border-border"
                                                    style="
                                                backdrop-filter: blur(calc(var(--spacing) * 1));
                                                ">Contact me</a
                                                >
                                            {:else}
                                                <Button
                                                    class="learn-more text-sm font-medium cursor-pointer hover:bg-accent-background"
                                                    style="
                                                backdrop-filter: blur(calc(var(--spacing) * 1));
                                                "
                                                    variant="outline"
                                                    onclick={() => {
                                                        selectedProjectIndex =
                                                            i;
                                                        showProjectDetails(i);
                                                    }}
                                                >
                                                    Learn more
                                                </Button>
                                            {/if}
                                        </div>
                                    </article>
                                </Carousel.Item>
                            {/each}
                        </Carousel.Content>

                        <div
                            class="flex items-center justify-center mt-5 gap-4"
                            data-carousel-controls
                        >
                            <Carousel.Previous
                                style="
                                    width: calc(var(--spacing) * 10);
                                    height: calc(var(--spacing) * 10);
                                    border-radius: var(--radius);
                                    border: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
                                    background: color-mix(in oklab, var(--background) 70%, transparent);
                                    backdrop-filter: blur(calc(var(--spacing) * 1));
                                "
                                class="static translate-y-0 cursor-pointer"
                                size="icon-lg"
                                variant="outline"
                            />
                            <Carousel.Next
                                style="
                                    width: calc(var(--spacing) * 10);
                                    height: calc(var(--spacing) * 10);
                                    border-radius: var(--radius);
                                    border: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
                                    background: color-mix(in oklab, var(--background) 70%, transparent);
                                    backdrop-filter: blur(calc(var(--spacing) * 1));
                                "
                                class="static translate-y-0 cursor-pointer"
                                size="icon-lg"
                                variant="outline"
                            />
                        </div>
                    </Carousel.Root>
                </div>

                <div class="mt-12 px-10 max-w-287">
                    <div
                        class="transition-opacity duration-200"
                        class:opacity-0={!isProjectDetailsVisible}
                        class:opacity-100={isProjectDetailsVisible}
                    >
                        {#key displayedProjectIndex}
                            <div class="flex flex-col gap-8">
                                <div
                                    class="flex flex-wrap items-center gap-3 pb-2"
                                >
                                    <SplitReveal
                                        triggerOnScroll={true}
                                        mode="chars"
                                    >
                                        <h3
                                            class="font-serif text-4xl text-foreground"
                                        >
                                            {displayedProject.title}
                                        </h3>
                                    </SplitReveal>
                                    <SplitReveal
                                        triggerOnScroll={true}
                                        class="text-xl font-serif text-muted-foreground"
                                    >
                                        {displayedProject.start ===
                                        displayedProject.end
                                            ? `(${displayedProject.start})`
                                            : `(${displayedProject.start} - ${displayedProject.end})`}
                                    </SplitReveal>
                                    <span>
                                        <div class="flex items-center gap-2">
                                            {#each displayedProject.links as link}
                                                <SplitReveal
                                                    triggerOnScroll={true}
                                                >
                                                    <a
                                                        href={link.href}
                                                        aria-label={link.label}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        class="flex h-8 w-8 items-center justify-center text-foreground/70 transition-colors hover:text-foreground"
                                                    >
                                                        {#if link.icon}
                                                            <link.icon
                                                                size={16}
                                                            />
                                                        {:else}
                                                            <span
                                                                class="text-xs font-medium uppercase tracking-[0.2em]"
                                                            >
                                                                {link.label.slice(
                                                                    0,
                                                                    4,
                                                                )}
                                                            </span>
                                                        {/if}
                                                    </a>
                                                </SplitReveal>
                                            {/each}
                                        </div>
                                    </span>
                                </div>

                                <!-- FLEX LAYOUT -->
                                <div
                                    class="flex flex-col gap-10 lg:flex-row lg:items-start"
                                >
                                    <!-- LEFT COLUMN -->
                                    <div class="flex flex-col gap-6 lg:w-[40%]">
                                        <button
                                            type="button"
                                            class="aspect-16/10 max-w-md overflow-hidden rounded-xl border border-border/60 text-left"
                                            bind:this={imgWrapperRef}
                                            onclick={openGallery}
                                        >
                                            <img
                                                src={displayedProject.thumbnail2}
                                                alt={displayedProject.title}
                                                class="h-full w-full object-cover cursor-pointer"
                                            />
                                        </button>

                                        <div
                                            class="flex flex-wrap lg:flex-col gap-3"
                                        >
                                            {#each displayedProject.techStack as tech}
                                                <SplitReveal
                                                    mode="lines"
                                                    triggerOnScroll={true}
                                                >
                                                    <div
                                                        class="flex items-center gap-3 text-muted-foreground"
                                                    >
                                                        <tech.icon size={16} />
                                                        <span class="text-sm">
                                                            {tech.name}
                                                        </span>
                                                    </div>
                                                </SplitReveal>
                                            {/each}
                                        </div>
                                    </div>

                                    <!-- RIGHT COLUMN -->
                                    <div
                                        class="flex flex-col gap-6 max-w-screen"
                                    >
                                        <SplitReveal
                                            mode="lines"
                                            triggerOnScroll={true}
                                        >
                                            <p
                                                class="text-base leading-7 text-muted-foreground font-sans"
                                            >
                                                {displayedProject.description}
                                            </p>
                                        </SplitReveal>

                                        <div class="flex flex-col gap-3">
                                            <SplitReveal
                                                mode="chars"
                                                triggerOnScroll={true}
                                            >
                                                <h4
                                                    class="text-sm font-bold font-sans tracking-[0.2em] text-muted-foreground"
                                                >
                                                    Features
                                                </h4>
                                            </SplitReveal>

                                            <SplitReveal
                                                mode="lines"
                                                triggerOnScroll={true}
                                            >
                                                <ul
                                                    class="list-disc space-y-2 pl-5 text-base leading-7 text-muted-foreground font-sans"
                                                >
                                                    {#each displayedProject.features as feature}
                                                        <li>{feature}</li>
                                                    {/each}
                                                </ul>
                                            </SplitReveal>
                                        </div>

                                        <SplitReveal
                                            mode="lines"
                                            triggerOnScroll={true}
                                        >
                                            <p
                                                class="text-base leading-7 text-muted-foreground"
                                            >
                                                {displayedProject.why}
                                            </p>
                                        </SplitReveal>
                                    </div>
                                </div>
                            </div>
                        {/key}
                    </div>
                </div>
            </div>
        </section>

        <section id="tools" class="min-h-screen">
            <div class="mx-auto flex w-full max-w-7xl flex-col gap-4">
                <div class="flex flex-col items-center gap-4">
                    <SplitReveal
                        triggerOnScroll={true}
                        mode="chars"
                        class="font-light leading-none text-foreground font-serif text-4xl"
                    >
                        My tools
                    </SplitReveal>
                    <SplitReveal
                        triggerOnScroll={true}
                        delay={0.2}
                        mode="lines"
                        class="text-muted-foreground max-w-100 text-base font-sans px-12"
                    >
                        The tools I use to build and experiment with software,
                        from programming languages and frameworks to the editor
                        and utilities that shape my development workflow.
                    </SplitReveal>
                </div>

                <div
                    class="mt-5 flex w-full max-w-4xl flex-col gap-8 px-12 md:mx-auto"
                >
                    {#each tools as category}
                        <div class="flex flex-col gap-4">
                            <SplitReveal triggerOnScroll={true} mode="chars">
                                <h3 class="font-serif text-2xl text-foreground">
                                    {category.category}
                                </h3>
                            </SplitReveal>
                            <SplitReveal triggerOnScroll={true} mode="lines">
                                <div class="flex flex-col gap-2">
                                    {#each category.items as item}
                                        <div class="flex items-center">
                                            <div
                                                class="flex items-center gap-2 w-40"
                                            >
                                                <item.icon size={16} />
                                                <span class="font-medium"
                                                    >{item.name}</span
                                                >
                                            </div>
                                            <span
                                                class="hidden text-sm text-muted-foreground md:inline"
                                                >{item.desc}</span
                                            >
                                        </div>
                                    {/each}
                                </div>
                            </SplitReveal>
                        </div>
                    {/each}
                </div>
            </div>
        </section>

        <section id="contact" class="h-fit">
            <div class="mx-auto flex w-full max-w-7xl flex-col gap-4">
                <div class="flex flex-col items-center gap-4">
                    <SplitReveal
                        triggerOnScroll={true}
                        mode="chars"
                        class="font-light leading-none text-foreground font-serif text-4xl"
                    >
                        Have something in mind ?
                    </SplitReveal>
                    <SplitReveal
                        triggerOnScroll={true}
                        delay={0.2}
                        mode="lines"
                        class="text-muted-foreground w-100 text-base font-sans px-12"
                    >
                        If you want to discuss a project, collaboration, or just
                        get in touch, feel free to reach out. I'm always open to
                        interesting ideas and opportunities.
                    </SplitReveal>
                </div>

                <div class="flex justify-center items-center gap-2 mt-5">
                    <SplitReveal triggerOnScroll={true} mode="lines">
                        <a
                            href="mailto:yassaine_akh@proton.me"
                            class="inline-flex text-sm font-medium bg-foreground text-background py-2 px-5 cursor-pointer"
                            >Contact me</a
                        >
                    </SplitReveal>
                    <SplitReveal triggerOnScroll={true} delay={0.1}>
                        <a
                            href="https://github.com/yka-dev"
                            aria-label="GitHub"
                            target="_blank"
                            rel="noreferrer"
                            class="flex items-center justify-center text-foreground/80 transition-colors hover:text-foreground"
                            style="
                    width: calc(var(--spacing) * 10);
                    height: calc(var(--spacing) * 10);
                    border-radius: var(--radius);
                    border: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
                    background: color-mix(in oklab, var(--background) 70%, transparent);
                    backdrop-filter: blur(calc(var(--spacing) * 1));
                "
                        >
                            <Github size={18} />
                        </a>
                    </SplitReveal>
                    <SplitReveal triggerOnScroll={true} delay={0.2}>
                        <a
                            href="https://www.linkedin.com/in/yassine-akhouayri"
                            aria-label="LinkedIn"
                            target="_blank"
                            rel="noreferrer"
                            class="flex items-center justify-center text-foreground/80 transition-colors hover:text-foreground"
                            style="
                    width: calc(var(--spacing) * 10);
                    height: calc(var(--spacing) * 10);
                    border-radius: var(--radius);
                    border: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
                    background: color-mix(in oklab, var(--background) 70%, transparent);
                    backdrop-filter: blur(calc(var(--spacing) * 1));
                "
                        >
                            <Linkedin size={18} />
                        </a>
                    </SplitReveal>
                </div>
            </div>

            <div
                class="flex p-2 border-t border-border min-w-screen items-center justify-center text-muted-foreground font-mono text-xs mt-150"
            >
                All rights reserved © 2026 Yassine Akhouayri
            </div>
        </section>
    </div>

    {#if isGalleryOpen}
        <div
            transition:fade={{ duration: 100 }}
            class="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-6 backdrop-blur-sm"
            role="button"
            tabindex="0"
            aria-label="Close gallery"
            onclick={closeGallery}
            onkeydown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    closeGallery();
                }
            }}
        >
            <button
                type="button"
                aria-label="Close gallery"
                class="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-foreground transition-colors hover:bg-muted"
                onclick={closeGallery}
            >
                <X size={18} />
            </button>

            <div
                transition:scale={{ duration: 180, start: 0.96 }}
                class="w-full max-w-5xl"
                role="presentation"
                onclick={(event) => event.stopPropagation()}
                onkeydown={(event) => event.stopPropagation()}
            >
                <Carousel.Root
                    opts={{
                        align: "center",
                        loop: galleryItems.length > 1,
                    }}
                    setApi={(api) => {
                        galleryApi = api;
                        gallerySelectedIndex = api?.selectedScrollSnap() ?? 0;
                        api?.on("select", () => {
                            gallerySelectedIndex = api.selectedScrollSnap();
                        });
                    }}
                    class="w-full"
                >
                    <Carousel.Content class="-ms-4">
                        {#each galleryItems as item, imageIndex (imageIndex)}
                            <Carousel.Item class="ps-4 basis-full">
                                <div
                                    class="flex aspect-16/10 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-black/20"
                                >
                                    {#if item.type === "video"}
                                        <video
                                            src={item.src}
                                            controls
                                            playsinline
                                            class="h-full w-full object-fill"
                                        >
                                            <track kind="captions" />
                                        </video>
                                    {:else}
                                        <img
                                            src={item.src}
                                            alt={`${displayedProject.title} media ${imageIndex + 1}`}
                                            class="h-full w-full object-fill"
                                        />
                                    {/if}
                                </div>
                            </Carousel.Item>
                        {/each}
                    </Carousel.Content>

                    {#if galleryItems.length > 1}
                        <Carousel.Previous
                            class="left-4 cursor-pointer"
                            size="icon-lg"
                            variant="outline"
                            style="
                                                                width: calc(var(--spacing) * 10);
                                                                height: calc(var(--spacing) * 10);
                                                                border-radius: var(--radius);
                                                                border: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
                                                                background: color-mix(in oklab, var(--background) 70%, transparent);
                                                                backdrop-filter: blur(calc(var(--spacing) * 1));
                                                            "
                        />
                        <Carousel.Next
                            class="right-4 cursor-pointer"
                            size="icon-lg"
                            variant="outline"
                            style="
                                                                width: calc(var(--spacing) * 10);
                                                                height: calc(var(--spacing) * 10);
                                                                border-radius: var(--radius);
                                                                border: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
                                                                background: color-mix(in oklab, var(--background) 70%, transparent);
                                                                backdrop-filter: blur(calc(var(--spacing) * 1));
                                                            "
                        />
                    {/if}
                </Carousel.Root>

                <div
                    class="mt-4 text-center font-mono text-sm text-muted-foreground"
                >
                    {gallerySelectedIndex + 1}/{galleryItems.length}
                </div>
            </div>
        </div>
    {/if}
</div>
