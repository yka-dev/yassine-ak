<script lang="ts">
    import PlasmaGrid from "$lib/motion-core/plasma-grid/PlasmaGrid.svelte";
    import { onMount } from "svelte";
    import * as Carousel from "$lib/components/ui/carousel/index.js";

    const COLOR_PRESETS = {
        dark: {
            color: "#18181B",
            highlightColor: "#572400",
        },
        light: {
            color: "#FFFFFF",
            highlightColor: "#FF6900",
        },
    };

    const projects = [
        {
            title: "Portfolio Website",
            description: "A personal site to showcase my work and background.",
            thumbnail: "/logo.svg",
        },
        {
            title: "Measurely",
            description:
                "Interactive interfaces and motion-driven web concepts.",
            thumbnail: "/logo.svg",
        },
        {
            title: "CPP_",
            description:
                "Interactive interfaces and motion-driven web concepts.",
            thumbnail: "/logo.svg",
        },
        {
            title: "Have something in mind ?",
            description:
                "Contact me for any project or idea that you have in mind.",
            thumbnail: "/logo.svg",
        },
    ];

    let isDark = $state(true);
    let scrollProgress = $state(0);

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
        isDark = document.documentElement.classList.contains("dark");

        const observer = new MutationObserver(() => {
            isDark = document.documentElement.classList.contains("dark");
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        updateScrollProgress();
        window.addEventListener("scroll", updateScrollProgress, {
            passive: true,
        });
        window.addEventListener("resize", updateScrollProgress);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", updateScrollProgress);
            window.removeEventListener("resize", updateScrollProgress);
        };
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
    color={isDark ? COLOR_PRESETS.dark.color : COLOR_PRESETS.light.color}
    highlightColor={isDark
        ? COLOR_PRESETS.dark.highlightColor
        : COLOR_PRESETS.light.highlightColor}
    class="fixed inset-0 z-0 h-screen w-screen"
/>

<div class="relative">
    <header
        class="fixed top-0 left-0 right-0 z-30 flex items-center justify-center px-6 py-3"
    >
        <img src="/logo.svg" alt="yka." style="height: 116px; width: auto;" />
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
                <div
                    class="flex w-full max-w-7xl min-h-screen flex-col px-8 pt-32"
                >
                    <section
                        class="relative flex flex-1 items-center justify-center overflow-hidden"
                    >
                        <div class="-mt-60 select-none px-6 text-center">
                            <h1
                                class="text-center font-light leading-[0.95] text-foreground"
                                style="
                                    font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
                                    font-size: clamp(3.5rem, 12vw, 10rem);
                                    letter-spacing: -0.025em;
                                "
                            >
                                Yassine
                            </h1>
                            <h1
                                class="text-center font-light leading-[0.95] text-foreground"
                                style="
                                    font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
                                    font-size: clamp(1.75rem, 12vw, 5rem);
                                    letter-spacing: -0.025em;
                                "
                            >
                                Akhouayri
                            </h1>
                        </div>

                        <blockquote
                            class="absolute bottom-10 left-10 text-muted-foreground"
                        >
                            <h2
                                class="text-center font-bold text-foreground"
                                style="
                                    font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
                                    font-size: 3.5rem;
                                "
                            >
                                Based in Montreal, Canada
                            </h2>
                        </blockquote>
                    </section>
                </div>
            </div>
        </section>
    </div>

    <div
        class="relative z-20"
        style={`
            opacity: ${contentOpacity};
            transform: translateY(${contentTranslateY}px) scale(${contentScale});
            transform-origin: center center;
            will-change: transform, opacity;
            pointer-events: auto;
        `}
    >
        <section
            class="flex flex-col min-h-screen items-center justify-center px-10 py-20 md:px-16 gap-10"
        >
            <div class="space-y-3 flex flex-col items-center gap-5">
                <h2
                    class="font-light leading-none text-foreground"
                    style="
                                        font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
                                        font-size: clamp(2.25rem, 5vw, 3.5rem);
                                        letter-spacing: -0.025em;
                                    "
                >
                    About me
                </h2>
            </div>
            <p class="text-left w-200 text-xl">
                Hi, I'm Yassine Akhouayri. I'm 18 years old and currently living
                in Montreal, Canada. I’ve always been curious about how
                technology works and how complex systems are built, which
                naturally led me to programming.
                <br />
                <br />

                I started learning to code on my own a few years ago. What began
                as simple curiosity quickly turned into something I spent more
                and more time exploring. Everything I know about programming so
                far has been self-taught through documentation, online
                resources, and a lot of experimentation.
                <br />
                <br />

                Most of what I learn comes from building things. I like taking
                an idea and turning it into a real project, figuring out
                problems along the way and improving the system step by step.
                That process of designing, debugging, and refining software is
                what I enjoy the most.
                <br />
                <br />

                In the near future, I plan to study electrical engineering to
                better understand the hardware and systems that power modern
                computing. I'm particularly interested in the relationship
                between software and the underlying technology it runs on.
                <br />
                <br />

                Outside of programming, I spend a lot of time learning new
                technologies, experimenting with ideas, and working on side
                projects to push my skills further.
                <br />
                <br />
            </p>
        </section>

        <section class="min-h-screen px-10 py-24 md:px-16 mt-200">
            <div class="mx-auto flex w-full max-w-7xl flex-col gap-10">
                <div class="space-y-3 flex flex-col items-center gap-5">
                    <h2
                        class="font-light leading-none text-foreground"
                        style="
                            font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
                            font-size: clamp(3rem, 8vw, 5.5rem);
                            letter-spacing: -0.025em;
                        "
                    >
                        My work
                    </h2>
                    <p
                        class="max-w-xl text-sm text-muted-foreground md:text-base"
                    >
                        My work focuses on building projects that help me
                        explore new ideas and improve my understanding of
                        software systems. Most of what I create comes from
                        curiosity and the desire to experiment, learn, and
                        gradually refine how I design and build things.
                    </p>
                </div>

                <div class="flex justify-center">
                    <Carousel.Root
                        opts={{
                            align: "start",
                            loop: false,
                        }}
                        class="w-full max-w-6xl"
                    >
                        <Carousel.Content class="-ms-4">
                            {#each projects as project}
                                <Carousel.Item
                                    class="ps-4 md:basis-1/2 xl:basis-1/3"
                                >
                                    <article
                                        class="overflow-hidden rounded-3xl border border-border/60 bg-background/70 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
                                    >
                                        <div
                                            class="aspect-16/10 overflow-hidden bg-muted"
                                        >
                                            <img
                                                src={project.thumbnail}
                                                alt={project.title}
                                                class="h-full w-full object-cover"
                                            />
                                        </div>

                                        <div class="flex flex-col gap-3 p-6">
                                            <h3
                                                class="text-xl font-semibold text-foreground"
                                            >
                                                {project.title}
                                            </h3>
                                            <p
                                                class="text-sm leading-6 text-muted-foreground"
                                            >
                                                {project.description}
                                            </p>
                                        </div>
                                    </article>
                                </Carousel.Item>
                            {/each}
                        </Carousel.Content>

                        <div
                            class="mt-8 flex items-center justify-center gap-4"
                        >
                            <Carousel.Previous
                                class="static translate-y-0"
                                size="icon-lg"
                                variant="outline"
                            />
                            <Carousel.Next
                                class="static translate-y-0"
                                size="icon-lg"
                                variant="outline"
                            />
                        </div>
                    </Carousel.Root>
                </div>
            </div>
        </section>
    </div>
</div>
