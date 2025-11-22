# Week 3 - Motion Builder JS

A tiny visual tool for building CSS keyframe animations without touching code.
You tweak values → it shows the motion → and it generates fully working CSS + JS that you can paste directly into any project.

This week was again about **architecture over aesthetics**. I wanted to understand how to structure a tool like this; dynamic UI generation, step-based timelines, state separation, keyframe building, and clean code output. I co-developed this with AI intentionally. Not as a crutch, but as a pair-programming workflow that let me focus on reasoning, structure, and maintainability. Every decision is something I reviewed, challenged, or reshaped.

Some say that using AI is 'cheating', but I find it to be empowering. My focus was not on the code per se, but on how to build something like this from a structural point of view; what do you need to do, how should it be done, what are the components?
Not, "how do you code this?". 

Call it what you want; I wanted a tool and I built it ;)

---

## What is Motion Builder JS?

A zero-dependency web tool that lets you:

- Build animations entirely visually
- Add as many steps as you want
- Control duration, easing, trigger type, and iteration count
- Add only the properties you want (X, Y, scale, opacity, border-radius, etc.)
- Preview instantly
- Export fully working **CSS `@keyframes` + JS trigger code**
- Paste directly into your own HTML and it “just works”

The main purpose is educational:
**to make CSS keyframe animations less scary, more visual, and easier to experiment with.**

---

## Features

### Step-based Animation Timeline

- Add/remove steps
- Each step has:
  - Duration
  - Easing
  - Individual property values (From → To)
- Step headers summarize the animation:
  `X position (0→100), Opacity (1→0.5)`

### Property System

- Add only the properties you want
- Remove unused ones
- Values automatically sync from UI → state → preview → code output
- Everything powered by a single `PROPERTIES` definition (true single source of truth)

### Global Animation Settings

- Trigger type: hover, click, page-load, manual
- Iterations: 1, 2, 3, 5, 10, infinite

### Live Preview

- Hover the preview box to play the current step
- “Play Animation” runs the full multi-step timeline

### Code Generation

Outputs **real CSS keyframes + minimal JS**:

- `<style>` block with proper keyframes
- `.mbjs-animation` utility class
- `<script>` block with:
  - Trigger wiring
  - Restart logic
  - `startMotionBuilderAnimation()` helper
- Designed so beginners can copy, paste, and understand what's happening.

---

## Why I Built This

Because when I was new to frontend, CSS animations feelt like black magic.
The syntax is weird, keyframes are written with percentages over a timeline and I had no way of visualizing the s yntax other than trial and error.
SImply put, I wanted something like this when I started.

This tool demystifies it:

- You see every step
- You see every property change
- You learn what keyframes actually are
- You get real code you can study and tweak

And you don’t have to rely on libraries. It's all plain CSS + JS.

---

## Tech & Architecture Notes

- No frameworks; pure HTML/CSS/JS.
- UI is fully generated from a structured property config.
- Every animation step holds `from` + `to` values for only its active properties.
- Timeline builder converts steps → normalized percentages for CSS keyframes.
- Sequencing is done with Web Animations API for preview.
- Code generation produces clean output optimized for beginners.

The focus this week wasn’t “coding fast,” it was **thinking structurally**.


## Live Demo


---

## 📦 Installation

Clone and open `index.html`.
That's it. Zero tooling required.

---

## License

MIT — do whatever you want with it.
