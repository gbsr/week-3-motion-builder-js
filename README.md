# About

I’m **Anders Hofsten**, a junior frontend developer building 1 coding thing per week for 52 weeks.

This is **Week 3**.

# Motion Builder JS

*Week 3 — 52 Weeks of Code Challenge*

A tiny visual tool for building CSS keyframe animations without touching code.
You tweak values → it shows the motion → and it generates fully working CSS + JS that you can paste directly into any project.

This week was again about **architecture over aesthetics**. 
I wanted to understand how to structure a tool like this; dynamic UI generation, step-based timelines, state separation, keyframe building, and clean code output. 

I co-developed this with AI intentionally. Not as a crutch, but as a pair-programming workflow that let me focus on reasoning, structure, and maintainability. Every decision is something I reviewed, challenged, or reshaped.

Some say that using AI is “cheating”, but I find it to be empowering. My focus was not on the code per se, but on how to build something like this from a structural point of view; what do you need to do, how should it be done, what are the components?
Not, “how do you code this?”.

Call it what you want; I wanted a tool and I built it ;)

---

## Demo

**Live:** https://gbsr.github.io/week-3-motion-builder-js/

---

# Features

### Step-based Animation Timeline

- Add/remove steps
- Each step has:
  - Duration
  - Easing
  - Individual property values (From → To)
- Step headers summarize the animation like:
  `X position (0→100), Opacity (1→0.5)`

### Property System

- Add only the properties you want
- Remove unused ones
- Values automatically sync from UI → state → preview → code output
- Everything powered by a single `PROPERTIES` definition
  (**true single source of truth**)

### Global Animation Settings

- Trigger type: **hover**, **click**, **page-load**, **manual**
- Iterations: **1, 2, 3, 5, 10, infinite**

### Live Preview

- Hover the preview box to play the current step
- “Play Animation” runs the full multi-step timeline

### Code Generation

Outputs **real CSS keyframes + minimal JS**:

- `<style>` block with proper, readable keyframes
- `.mbjs-animation` utility class
- `<script>` block with:
  - Trigger wiring
  - Restart logic
  - `startMotionBuilderAnimation()` helper
- Designed so beginners can copy, paste, and understand what’s happening

---

# Why I Built This

Because when I was new to frontend, CSS animations felt like black magic.
The syntax is weird, keyframes are written with percentages over a timeline and I had no way of visualizing the syntax other than trial and error.
Simply put, I wanted something like this when I started.

This tool demystifies it:

- You see every step
- You see every property change
- You learn what keyframes actually are
- You get real code you can study and tweak

No libraries required; It's all plain CSS + JS.

---

# Tech Stack

- HTML
- CSS
- JavaScript
- Web Animations API (preview engine)
- Pure DOM-based UI generation
- GitHub Pages (deployment)

---

# Post-Mortem (Week 3)

## Key Concepts Explored

### Architecture & Systems

- Single source of truth for all animation properties
- Step-based state management
- Property activation/deactivation system
- State → UI → Preview → Code pipeline
- Normalizing multi-step animations into percentage-based CSS keyframes
- Sequencing multiple steps with Web Animations API

### UI & Interaction Design

- Dynamic UI generation based on a schema
- Add/remove property rows
- Per-step timelines
- Clear state-driven summaries in step headers
- Global settings separated from per-step controls

### Code Generation

- Convert timeline steps → CSS keyframes
- Calculate cumulative percentage mapping
- Generate restart-safe JS for triggers
- Produce clean, readable output aimed at beginners

### Integration

- Pure DOM manipulation, no frameworks
- All logic contained in small modules
- Zero tooling required for end users

---

## What worked

- The property system became extremely flexible
- Single-source-of-truth architecture made everything predictable
- Step summaries made multi-step animation design actually pleasant
- Code generation output ended up very readable
- The preview engine stayed simple but effective

## What hurt

- Thinking, and have the time to do so ;)
- Semantic bugs
- Syncing global settings with preview logic took some of that thinking
- CSS keyframe quirks (fill modes, resets, etc.)

## Lessons Learned

- Structure first, UI later
- Avoid hardcoding and let schemas drive UI
- Keyframes are simple once you see them visually
- Pair-programming with AI is genuinely useful for architectural lessons and practices
- Removing complexity makes the tool more powerful, not less

---

# Run Locally

clone the repo,  open index.html with live server.
No libraries or installs needed.

# **Next Steps / Stretch Ideas**

* Color, gradients, shadows, and text effects
* Saving animations as JSON presets
* Sharing animations via permalink
* Copy-to-clipboard improvements
* Multiple target elements
* Importing existing CSS keyframes
* Timeline easing visualization
* Export to GIF/PNG sequences

---

## **Contact / Follow**

* **Portfolio** : https://andershofsten.com
* **Threads** : https://www.threads.net/@ruido_outpost
* **LinkedIn** : https://www.linkedin.com/in/ahofsten/
* **X** : https://x.com/soundsbyhofsten

Feel free to DM — I’m always open to feedback or discussion.
