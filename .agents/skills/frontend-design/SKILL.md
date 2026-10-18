---
name: frontend-design
description: Process-driven frontend design system. Eliminates generic AI SaaS templates through compact planning, bold focal anchors, anti-AI tell enforcement, and strict visual validation checklists.
---

# Frontend Design: Process-Driven UI Craft

Coding agents trained on generic SaaS templates default to identical, uninspired interfaces when unguided. This skill enforces an intentional, critique-driven design process for web interfaces and React Native components.

---

## 1. The 4-Step Process

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ 1. Plan      │ ──> │ 2. Sanity    │ ──> │ 3. Build     │ ──> │ 4. Critique  │
│ 4-6 colors   │     │ Eliminate    │     │ One bold     │     │ Screenshot   │
│ Type roles   │     │ AI tells     │     │ anchor,      │     │ Mobile/desk  │
│ Layout sketch│     │ & defaults   │     │ quiet canvas │     │ Fix diffs    │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

### Step 1: Write a Compact Plan First
Before touching JSX or CSS, define a concise design contract:
- **Palette**: Exactly 4–6 named hex colors (Canvas, Surface, Border, Primary Text, Muted Text, One Accent).
- **Type Roles**: 3–4 explicit roles with font family, size, line-height, and weight.
- **Layout Sketch**: Low-fidelity text-based layout grid (asymmetrical, multi-column, or rail).
- **3 Core Principles**: What feeling does this page convey? (e.g., "Dense developer console", "Tactile Swiss typography", "Quiet precision").

### Step 2: Sanity Check Against the Brief
Cross-reference your plan against the user's brief. Ask:
- *Does this look like every other Tailwind template?* If yes, scrap the layout and rethink the hierarchy.
- *Are there generic defaults?* Replace generic cards with structured tables, continuous rails, or technical spec sheets.

### Step 3: Build Around One Bold Focal Anchor
- Place all expressive boldness in **one memorable hero element** (an interactive chart with atmospheric glow, an animated gesture canvas, an architectural bento grid).
- Keep everything around it quiet, disciplined, and functional. Avoid competing focal points.

### Step 4: Critique with Eyes (Screenshots & Responsive Inspection)
- Screenshot at mobile (375px), tablet (768px), and desktop (1280px+).
- Inspect for awkward line wrapping, mismatched padding, horizontal overflow, and focus state clarity. Fix before presenting.

---

## 2. Common AI Tells to Avoid (Defaults to Ban)

| AI Tell | Why It Happens | Intentional Replacement |
| :--- | :--- | :--- |
| **Cream & Terracotta Palette** | Overfit to 2023 design agency mockups | Crisp neutral dark `#070709` or slate, high-contrast monochrome, or single vivid accent |
| **Screaming All-Caps Eyebrows** | `font-mono text-xs uppercase tracking-wider` slapped on every header | Quiet micro-indicators (`// 01`, `spec 2.4`), subtle section counters, or no eyebrow |
| **Identical Rounded Card Grids** | 3 or 4 floating cards with icons in colored squares | Asymmetrical bento grid, connected progressive rails, or unified border-divided tables |
| **Fade-Up Motion Fatigue** | `motion.div initial={{opacity:0, y:20}}` on every section | Purposeful, physics-driven entrances; standard native transitions; reduced-motion respect |
| **Pill Shape Spam** | Indiscriminate `rounded-full` on cards, badges, and buttons | Proportional radii: outer cards 16–24px, inner controls 8–12px, pills strictly for status dots |
| **Jarring Glows & Gradients** | Bright purple/pink blurred radial blobs everywhere | Subtle, continuous monochromatic ambient depths; max 6–10% opacity |

---

## 3. Validation Checklist (Tessl Standard)

Use this checklist before finalizing any UI work:

### [ ] Responsive Layout & Hierarchy
- [ ] Tested at **375px** (iPhone SE) with zero horizontal overflow (`overflow-x: hidden` / natural fit).
- [ ] Tested at **768px** (tablet) with graceful column wrapping.
- [ ] Tested at **1280px+** (desktop) with max-width containment (`1200px` to `1360px`).
- [ ] Subtitles and badges are distinctly smaller and lower-contrast than primary titles (no competing visual weight).

### [ ] Touch & Keyboard Accessibility
- [ ] Minimum touch targets on mobile $\ge 44 \times 44\text{pt}$.
- [ ] All interactive elements declare high-visibility focus states (`focus-visible:ring-2 focus-visible:ring-accent`).
- [ ] Form inputs have associated accessible labels and clear keyboard tab order.

### [ ] Contrast & Readability
- [ ] Body copy meets **WCAG AA 4.5:1** contrast ratio against its background.
- [ ] Large headings meet **WCAG AA 3:1** contrast ratio.
- [ ] Borders use subtle neutral contrast (`rgba(255,255,255,0.08)` to `0.14`).

### [ ] Deliberate Typography Scale
- [ ] No more than 4 distinct font sizes in a single view.
- [ ] Headings declare tight letter-spacing (`tracking-[-0.02em]` to `tracking-[-0.04em]`).
- [ ] Line heights are intentional: headings `1.1–1.2`, body copy `1.5–1.6`.
- [ ] Text in fixed-size React Native containers declares `allowFontScaling={false}`.

---

## 4. Before & After Case Study

### ❌ Before: Generic AI SaaS Template
```tsx
// ❌ Saturated with AI tells: scream eyebrow, identical cards, Lucide icon boxes, pill button
<section className="py-20 bg-neutral-900">
  <div className="text-center mb-12">
    <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono">
      FEATURES
    </span>
    <h2 className="text-3xl font-bold text-white mt-2">Why Developers Love Us</h2>
  </div>
  <div className="grid grid-cols-3 gap-6">
    {features.map((f) => (
      <div className="bg-neutral-800 rounded-2xl p-6 border border-neutral-700">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
          <f.icon />
        </div>
        <h3 className="text-lg font-semibold text-white">{f.title}</h3>
        <p className="text-sm text-neutral-400 mt-2">{f.desc}</p>
      </div>
    ))}
  </div>
  <div className="mt-8 text-center">
    <button className="rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white">
      Get Started
    </button>
  </div>
</section>
```

### ✅ After: Crafted Architectural Spec Matrix
```tsx
// ✅ Intentional: quiet indicator, structured divider grid, clear type hierarchy, proportional radius
<section className="py-24 bg-[#070709] border-t border-white/[0.08]">
  <div className="max-w-[1200px] mx-auto px-6">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
      <div>
        <p className="text-xs font-mono text-[#71717a] mb-2">// 02 Architecture</p>
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          Engineered for <span className="font-editorial italic font-normal">ownership</span>
        </h2>
      </div>
      <p className="text-sm text-[#9ca3af] max-w-[420px] leading-relaxed">
        Zero wrapper runtimes. Every component lives directly in your project tree.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 border border-white/[0.1] rounded-[18px] overflow-hidden bg-[#0a0a0f]">
      {features.map((f, i) => (
        <div
          key={f.title}
          className={`p-7 flex flex-col justify-between ${
            i !== features.length - 1 ? "border-b md:border-b-0 md:border-r border-white/[0.08]" : ""
          }`}
        >
          <div>
            <span className="font-mono text-xs text-[#32c798]">{f.index}</span>
            <h3 className="text-lg font-bold text-white mt-3 mb-2 tracking-tight">{f.title}</h3>
            <p className="text-sm text-[#9ca3af] leading-relaxed">{f.desc}</p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/[0.06] font-mono text-xs text-[#71717a]">
            {f.spec}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```
