import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowRight, ArrowUpRight, BadgeCheck, ChevronLeft, ChevronRight, ClipboardList, Factory, FileCheck2,
  Mail, MapPin, Menu, PenTool, Phone, Printer, Search, X,
} from "lucide-react";
import { ConceptWidget, StudioCredit } from "./concept.jsx";
import logo from "./assets/parker-logo.png";
import archivePhoto from "./assets/archive.jpg";
import channelPhoto from "./assets/channel-letters.jpg";

/* ------------------------------------------------------------------ */
/* Content (all facts from parkersign.com)                             */
/* ------------------------------------------------------------------ */

const COMPANY = "Parker Signs & Graphics, Incorporated";
const SHORT = "Parker Signs & Graphics";
const ABBR = "psg";
const END_DATE = "2026-11-30T23:59:59-06:00";
const ORIGINAL = "https://parkersign.com/";
const PHONE = "(515) 962-0330";
const PHONE_TEL = "+15159620330";
const FAX = "(515) 962-0570";
const EMAIL = "jr@parkersign.com";
const CONTACT_NAME = "John Parker Jr.";
const CONTACT_EXT = "ext. 12";
const ADDRESS = { street: "12869 Geneva St.", city: "Indianola, IA 50125" };
const MAP_QUERY = "12869 Geneva St, Indianola, IA 50125";
const GOOGLE_REVIEWS = "https://www.google.com/search?q=Parker+Signs+%26+Graphics+Indianola+IA";
const FOUNDED = 1972;
const SOCIAL_LINKS = []; // none listed on the current site

const NAV = [
  ["Portfolio", "#work"],
  ["What we build", "#products"],
  ["Process", "#process"],
  ["Our story", "#story"],
  ["Contact", "#contact"],
];

// Every product from the "Products We Produce" page, grouped.
const PRODUCTS = [
  {
    group: "Lit up",
    code: "01",
    note: "Signs that work after dark.",
    items: ["Channel Letters", "Neon Signs", "Illuminated Signs", "LED Lighted Signs"],
  },
  {
    group: "Dimensional",
    code: "02",
    note: "Letters and logos with real depth.",
    items: ["Metal, Wood & Acrylic Letters", "HDU Logos & Lettering", "Custom Cut Aluminum, Acrylic & Wood", "Sand Blasted Signs", "Gold Leaf"],
  },
  {
    group: "Systems & site",
    code: "03",
    note: "From the entry monument to the room numbers.",
    items: ["Sign Systems", "Monument Signs", "Way Finding", "Directories", "ADA Signage"],
  },
  {
    group: "Graphics & design",
    code: "04",
    note: "Artwork, vinyl and everything that moves.",
    items: ["Logo & Layout Design", "Edge Printed Vinyl Graphics", "Fleet Graphics/Lettering", "Banners, Menu Boards, Magnetics"],
  },
];

// From the Capabilities page.
const PROCESS = [
  {
    icon: ClipboardList,
    title: "Your own project manager",
    text: "Every client is assigned a project manager who assesses your signage needs and recommends the right type, style and material for the project.",
  },
  {
    icon: PenTool,
    title: "Design with our designers",
    text: "Our designers listen, then guide you through the early stages so you get the correct type and style of sign for each situation.",
  },
  {
    icon: Factory,
    title: "Built in house",
    text: "Our in-house staff handles nearly every part of your sign system, which gives us more control over cost, quality and timing.",
  },
  {
    icon: FileCheck2,
    title: "Permits, plans and install",
    text: "We work with city building officials, architects and project managers to make sure your schedule and budget are met.",
  },
];

const CATS = [
  ["all", "All work"],
  ["business", "Business & retail"],
  ["civic", "Parks & civic"],
  ["schools", "Schools & athletics"],
  ["community", "Museums, churches & nonprofits"],
];

const P = "Parker Signs & Graphics, Inc.";

// Project sheets from the Portfolio pages (names and credits as listed there).
const PROJECTS = [
  { id: "pella", name: "Pella Corporation", place: "Pella, IA", cat: "business", designer: P, fab: P },
  { id: "route-65", name: "Route 65 Harley-Davidson Shop", place: "Indianola, IA", cat: "business", designer: "WDW Design, Chicago, IL / " + P, fab: P + " / Iowa Sign Services Inc." },
  { id: "grand-view", name: "Grand View University Athletics", place: "Des Moines, IA", cat: "schools", designer: P, fab: P },
  { id: "central-iowa-trails", name: "Central Iowa Trails", place: "Des Moines, IA", cat: "civic", designer: "Shive Hattery Inc.", fab: P },
  { id: "iowa-80", name: "Iowa 80 Trucking Museum", place: "Walcott, IA", cat: "community", designer: "WDW Design, Chicago, IL / " + P, fab: P },
  { id: "cownie", name: "Cownie Soccer Park", place: "City of Des Moines Parks & Rec. Dept.", cat: "civic", designer: "Shive Hattery Inc.", fab: P + " & Iowa Metal Fabrication" },
  { id: "arl", name: "Animal Rescue League of Iowa", place: "Des Moines, IA", cat: "community", designer: P, fab: P },
  { id: "palmers", name: "Palmers Deli & Market", place: "West Des Moines, IA", cat: "business", designer: P, fab: P },
  { id: "bass-street", name: "Bass Street Landing", place: "Moline, IL", cat: "civic", designer: "Shive Hattery Inc.", fab: P },
  { id: "integer", name: "Integer Midwest", place: "Des Moines, IA", cat: "business", designer: "Integer Midwest", fab: P },
  { id: "harlan-rogers", name: "Harlan Rogers Sports Complex", place: "Fort Dodge, IA", cat: "schools", designer: P, fab: P },
  { id: "rollins-mansion", name: "Rollins Mansion", place: "Des Moines, IA", cat: "business", designer: P, fab: P },
  { id: "gold-star", name: "Iowa Gold Star Museum", place: "Johnston, IA", cat: "community", designer: P, fab: P },
  { id: "grays-lake", name: "Gray's Lake Park", place: "Des Moines, IA", cat: "civic", designer: "RDG Inc.", fab: P },
  { id: "deer-creek", name: "Deer Creek", place: "Regency Land Development Services", cat: "business", designer: P, fab: P },
  { id: "simpson", name: "Simpson College Athletics", place: "Indianola, IA", cat: "schools", designer: P + " / Brian Clark & Associates", fab: P },
  { id: "green-pines", name: "Green Pines Village", place: "Altoona, IA", cat: "business", designer: P, fab: P },
  { id: "city-state-bank", name: "City State Bank", place: "Indianola, IA", cat: "business", designer: P, fab: P },
  { id: "indianola-hs", name: "Indianola High School", place: "Indianola, IA", cat: "schools", designer: P, fab: P },
  { id: "luther-park", name: "Luther Park", place: "Des Moines, IA", cat: "business", designer: P, fab: P },
  { id: "maytag", name: "Maytag Corporation", place: "Newton, IA", cat: "business", designer: P, fab: P },
  { id: "outcomes", name: "Outcomes Pharmaceutical", place: "Des Moines, IA", cat: "business", designer: P, fab: P },
  { id: "raccoon-river", name: "Raccoon River Park", place: "West Des Moines, IA", cat: "civic", designer: "RDG, Inc.", fab: P },
  { id: "community-state-bank", name: "Community State Bank", place: "Norwalk, IA", cat: "business", designer: P, fab: P },
  { id: "moline-center", name: "Moline Center", place: "Moline, IL", cat: "civic", designer: "Shive Hattery Inc.", fab: P },
  { id: "indianola-emc", name: "City of Indianola Electronic Message Center", place: "Indianola, IA", cat: "civic", designer: P, fab: P },
  { id: "woodsmith", name: "Woodsmith Store", place: "Des Moines, IA", cat: "business", designer: P, fab: P },
  { id: "church-of-christ", name: "Indianola Church of Christ", place: "Indianola, IA", cat: "community", designer: P, fab: P },
  { id: "discerning-eye", name: "Discerning Eye", place: "Iowa City, IA", cat: "business", designer: P, fab: P },
  { id: "ubpc", name: "United Baptist Presbyterian Church", place: "Mt. Ayr, IA", cat: "community", designer: P, fab: P },
  { id: "housby", name: "Housby Truck Lube", place: "", cat: "business", designer: P, fab: P },
  { id: "brokers-intl", name: "Brokers International, Ltd.", place: "", cat: "business", designer: "Brokers International, Ltd.", fab: P + " / Dolphens Design & Sign" },
  { id: "dm-chrysler", name: "Des Moines Chrysler", place: "Des Moines, IA", cat: "business", designer: P, fab: "Installer: Chestnut Signs" },
  { id: "mcaninch", name: "McAninch Corporation", place: "Des Moines, IA", cat: "business", designer: P, fab: P },
];

// "More Signs" page photos.
const MORE = [
  ["pro-body-works", "Professional Body Works"],
  ["teacups", "Teacups & Tiaras"],
  ["bondurant", "Bondurant"],
  ["calypso", "Calypso"],
  ["twin-cedars", "Twin Cedars Community Schools"],
  ["polk-city", "Polk City"],
  ["isabel", "Isabel Bloom"],
  ["airport", "Airport Commerce Park South"],
  ["fumc", "First United Methodist Church"],
  ["madison", "Madison County Farm"],
  ["peoples", "Peoples Bank"],
  ["touch-itally", "A Touch of Italy"],
  ["barker-park", "Barker Park"],
  ["jefferson", "Jefferson"],
  ["indianolahs", "Indianola High School"],
];

const PARTNERS = [
  "Shive Hattery Inc.", "RDG Inc.", "WDW Design, Chicago", "Brian Clark & Associates",
  "Iowa Metal Fabrication", "Iowa Sign Services Inc.", "Dolphens Design & Sign",
];

const TOWNS = [
  "Indianola", "Des Moines", "West Des Moines", "Johnston", "Altoona", "Norwalk", "Pella", "Newton",
  "Fort Dodge", "Walcott", "Iowa City", "Mt. Ayr", "Moline, IL",
];

/* ------------------------------------------------------------------ */
/* Images                                                              */
/* ------------------------------------------------------------------ */

const workFiles = import.meta.glob("./assets/work/*.jpg", { eager: true, import: "default" });
const moreFiles = import.meta.glob("./assets/more/*.jpg", { eager: true, import: "default" });
const workImg = (id, n = 1) => workFiles[`./assets/work/${id}-${n}.jpg`];
const moreImg = (id) => moreFiles[`./assets/more/${id}.jpg`];

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function Eyebrow({ children, light }) {
  return <span className={`eyebrow${light ? " eyebrow-light" : ""}`}>{children}</span>;
}

function CutMarks() {
  // registration marks, like the corners of a vinyl cut job
  return (
    <>
      <i className="reg reg-tl" aria-hidden="true" />
      <i className="reg reg-tr" aria-hidden="true" />
      <i className="reg reg-bl" aria-hidden="true" />
      <i className="reg reg-br" aria-hidden="true" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);
  return (
    <header className="header">
      <div className="wrap header-row">
        <a href="#top" className="brand" aria-label={`${SHORT} home`}>
          <img src={logo} alt="Parker Signs & Graphics, Incorporated logo" width="445" height="172" />
        </a>
        <nav className={`nav${open ? " is-open" : ""}`} aria-label="Main">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="nav-call" href={`tel:${PHONE_TEL}`}><Phone size={16} /> {PHONE}</a>
        </nav>
        <a className="header-call" href={`tel:${PHONE_TEL}`} aria-label={`Call ${PHONE}`}><Phone size={17} /><span>{PHONE}</span></a>
        <button className="menu-btn" type="button" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="wrap hero-row">
        <div className="hero-copy">
          <Eyebrow light>Since {FOUNDED} · Indianola, Iowa</Eyebrow>
          <h1>
            <span className="hero-lead">When other sign makers find a challenge beyond their capability,</span>
            <span className="hero-big">they recommend <span className="neon">Parker&nbsp;Signs.</span></span>
          </h1>
          <p className="hero-sub">
            Custom signs designed, fabricated and installed by one Iowa shop: channel letters, neon and LED,
            monuments, wayfinding and full sign systems for businesses, campuses, parks and cities.
          </p>
          <div className="hero-actions">
            <a className="btn btn-red" href={`tel:${PHONE_TEL}`}><Phone size={18} /> Call {PHONE}</a>
            <a className="btn btn-ghost" href="#work">See the portfolio <ArrowRight size={18} /></a>
          </div>
          <ul className="hero-facts">
            <li><strong>{FOUNDED}</strong><span>Founded in Des Moines</span></li>
            <li><strong>{PROJECTS.length + MORE.length}+</strong><span>Signs in the portfolio</span></li>
            <li><strong>Class A</strong><span>Licensed & bonded</span></li>
          </ul>
        </div>
        <figure className="hero-sign">
          <div className="porthole">
            <img src={workImg("pella", 1)} alt="Gold dimensional Pella script letters mounted on a round window, Pella Corporation" width="380" height="330" />
          </div>
          <figcaption>
            <span className="tag-mono">Job · Pella Corporation</span>
            <span>Pella, IA · designed, fabricated & installed by Parker</span>
          </figcaption>
          <span className="bolt b1" aria-hidden="true" />
          <span className="bolt b2" aria-hidden="true" />
          <span className="bolt b3" aria-hidden="true" />
          <span className="bolt b4" aria-hidden="true" />
        </figure>
      </div>
      <div className="raceway" aria-hidden="true"><span /></div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact strip                                                       */
/* ------------------------------------------------------------------ */

function QuickStrip() {
  return (
    <section className="strip" aria-label="Contact details">
      <div className="wrap strip-row">
        <a href={`tel:${PHONE_TEL}`}><Phone size={20} /><span><small>Call the shop</small>{PHONE}</span></a>
        <a href={`mailto:${EMAIL}`}><Mail size={20} /><span><small>Email {CONTACT_NAME}</small>{EMAIL}</span></a>
        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`} target="_blank" rel="noopener noreferrer"><MapPin size={20} /><span><small>Visit</small>{ADDRESS.street}, {ADDRESS.city}</span></a>
        <div><BadgeCheck size={20} /><span><small>Credentials</small>Class "A" license · Bonded</span></div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Portfolio                                                           */
/* ------------------------------------------------------------------ */

function Lightbox({ list, index, onClose, onMove }) {
  const p = list[index];
  const [shot, setShot] = useState(1);
  useEffect(() => setShot(1), [index]);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    document.addEventListener("keydown", key);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", key); };
  }, [onClose, onMove]);
  if (!p) return null;
  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={p.name} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lb-panel">
        <button className="lb-close" type="button" onClick={onClose} aria-label="Close"><X size={24} /></button>
        <div className="lb-photo">
          <img src={workImg(p.id, shot)} alt={`${p.name}, view ${shot}`} />
          <div className="lb-thumbs">
            {[1, 2].map((n) => (
              <button key={n} type="button" className={shot === n ? "is-on" : ""} onClick={() => setShot(n)} aria-label={`View photo ${n}`}>
                <img src={workImg(p.id, n)} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="lb-ticket">
          <span className="tag-mono">Project sheet {String(index + 1).padStart(2, "0")} / {list.length}</span>
          <h3>{p.name}</h3>
          <dl>
            {p.place && <div><dt>Location</dt><dd>{p.place}</dd></div>}
            <div><dt>Architect / designer</dt><dd>{p.designer}</dd></div>
            <div><dt>Fabricator / installer</dt><dd>{p.fab}</dd></div>
          </dl>
          <div className="lb-nav">
            <button type="button" onClick={() => onMove(-1)}><ChevronLeft size={18} /> Prev</button>
            <button type="button" onClick={() => onMove(1)}>Next <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Portfolio() {
  const [cat, setCat] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(-1);
  const list = useMemo(() => (cat === "all" ? PROJECTS : PROJECTS.filter((p) => p.cat === cat)), [cat]);
  const shown = showAll || cat !== "all" ? list : list.slice(0, 13);
  const move = useCallback((d) => setOpen((i) => (i + d + list.length) % list.length), [list.length]);
  const close = useCallback(() => setOpen(-1), []);

  return (
    <section className="work" id="work">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Eyebrow light>The portfolio</Eyebrow>
            <h2 className="channel">Signs standing all over Iowa.</h2>
          </div>
          <p>
            {PROJECTS.length} project sheets from campuses, parks, banks, museums and main streets. Tap any sign for
            a second photo and who designed and built it.
          </p>
        </div>
        <div className="filters" role="tablist" aria-label="Filter projects">
          {CATS.map(([key, label]) => (
            <button key={key} type="button" role="tab" aria-selected={cat === key} className={cat === key ? "is-on" : ""} onClick={() => { setCat(key); setOpen(-1); }}>
              {label}
            </button>
          ))}
        </div>
        <ul className="work-grid">
          {shown.map((p, i) => (
            <li key={p.id} className={cat === "all" && (i === 0 || i === 13) ? "is-feature" : ""}>
              <button type="button" onClick={() => setOpen(i)} aria-label={`Open ${p.name}`}>
                <img src={workImg(p.id, 1)} alt={`Sign for ${p.name}${p.place ? ", " + p.place : ""}`} loading="lazy" width="380" height="330" />
                <span className="work-label">
                  <strong>{p.name}</strong>
                  {p.place && <small>{p.place}</small>}
                </span>
                <Search className="work-zoom" size={18} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
        {cat === "all" && !showAll && (
          <div className="work-more">
            <button type="button" className="btn btn-ghost" onClick={() => setShowAll(true)}>Show all {PROJECTS.length} projects <ArrowRight size={18} /></button>
          </div>
        )}
      </div>

      <div className="marquee" aria-label="More signs by Parker">
        <div className="marquee-track">
          {[...MORE, ...MORE].map(([id, label], i) => (
            <figure key={`${id}-${i}`} aria-hidden={i >= MORE.length}>
              <img src={moreImg(id)} alt={i >= MORE.length ? "" : `${label} sign`} loading="lazy" width="380" height="330" />
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      {open >= 0 && <Lightbox list={list} index={open} onClose={close} onMove={move} />}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

function Products() {
  return (
    <section className="products" id="products">
      <div className="wrap">
        <div className="section-head dark-ink">
          <div>
            <Eyebrow>What we build</Eyebrow>
            <h2 className="channel channel-light">Simple banner or full sign system.</h2>
          </div>
          <p>
            Using our own system, we design, process and manufacture signs as simple as vinyl banners or as
            involved as a multi-unit sign system.
          </p>
        </div>
        <div className="prod-grid">
          {PRODUCTS.map((g) => (
            <article className="decal" key={g.group}>
              <CutMarks />
              <span className="decal-code">{g.code}</span>
              <h3>{g.group}</h3>
              <p>{g.note}</p>
              <ul>
                {g.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <div className="prod-cta">
          <figure className="prod-photo">
            <img src={channelPhoto} alt="Red illuminated channel letters" loading="lazy" width="170" height="375" />
          </figure>
          <div>
            <h3>Not sure what kind of sign you need?</h3>
            <p>That's the project manager's job. Tell us where the sign goes and what it has to do, and we'll recommend the type, style and material.</p>
            <a className="btn btn-dark" href="#contact">Start a sign project <ArrowRight size={18} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

function Process() {
  return (
    <section className="process" id="process">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Eyebrow light>How a Parker sign gets made</Eyebrow>
            <h2 className="channel">From sketch to the last bolt.</h2>
          </div>
          <p>
            We work with you from design conception through fabrication, with architects, designers, contractors,
            developers and planners when the job calls for it.
          </p>
        </div>
        <ol className="steps">
          {PROCESS.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
              <Icon size={26} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <blockquote className="promise">
          <p>
            “When we walk away from a completed project, not only is your reputation riding on it, but ours is too!”
          </p>
          <cite>Parker Signs & Graphics</cite>
        </blockquote>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Story                                                               */
/* ------------------------------------------------------------------ */

function Story() {
  const years = new Date().getFullYear() - FOUNDED;
  return (
    <section className="story" id="story">
      <div className="wrap story-row">
        <div className="story-year" aria-hidden="true">
          <span className="channel-num">{FOUNDED}</span>
          <figure className="story-photo">
            <img src={archivePhoto} alt="Archive photo from the Parker Evolution page" width="170" height="350" />
          </figure>
        </div>
        <div className="story-copy">
          <Eyebrow>The Parker evolution</Eyebrow>
          <h2>From hand-painted posters to {years} years of sign systems.</h2>
          <ol className="timeline">
            <li>
              <span className="tl-when">1972</span>
              <p>Parker Signs opens in Des Moines, Iowa's capital city, turning out hand painted posters for real estate and construction firms and retail businesses.</p>
            </li>
            <li>
              <span className="tl-when">Late '70s</span>
              <p>Parker is fabricating three dimensional signs for buildings and commercial properties.</p>
            </li>
            <li>
              <span className="tl-when">Today</span>
              <p>Sophisticated technology drives state-of-the-art equipment, and the team works with architects and designers, contractors, developers and planners to translate vision into long-lasting identity.</p>
            </li>
          </ol>
          <div className="partners">
            <span className="tag-mono">Credited on our project sheets</span>
            <ul>{PARTNERS.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Where / reviews                                                     */
/* ------------------------------------------------------------------ */

function Towns() {
  return (
    <section className="towns" aria-labelledby="towns-title">
      <div className="wrap towns-row">
        <div>
          <Eyebrow light>Where our signs stand</Eyebrow>
          <h2 id="towns-title">Known throughout the Midwest.</h2>
          <p>Portfolio projects from Indianola and Des Moines to Fort Dodge, Iowa City and across the river in Moline.</p>
          <a className="google-link" href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer">
            See our reviews on Google <ArrowUpRight size={18} />
          </a>
        </div>
        <ul className="town-list">
          {TOWNS.map((t) => <li key={t}><MapPin size={14} aria-hidden="true" /> {t}</li>)}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

function Contact() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", signType: "", location: "", notes: "", website: "" });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.success) throw new Error(data.message || "Something went wrong.");
      setStatus("sent");
      setMessage(data.demo
        ? `Thanks! This is a concept preview, so nothing was sent. Please call ${PHONE} or email ${EMAIL}.`
        : "Thanks! Your project details are on their way. We'll be in touch shortly.");
    } catch (err) {
      setStatus("error");
      setMessage(`${err.message} Please call ${PHONE}.`);
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="wrap contact-row">
        <div className="contact-info">
          <Eyebrow light>Contact Parker</Eyebrow>
          <h2 className="channel">Let's talk about your sign.</h2>
          <ul className="contact-list">
            <li><Phone size={20} /><div><small>Phone</small><a href={`tel:${PHONE_TEL}`}>{PHONE}</a></div></li>
            <li><Mail size={20} /><div><small>{CONTACT_NAME} · {CONTACT_EXT}</small><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div></li>
            <li><MapPin size={20} /><div><small>Shop</small><span>{ADDRESS.street}<br />{ADDRESS.city}</span></div></li>
            <li><Printer size={20} /><div><small>Fax</small><span>{FAX}</span></div></li>
          </ul>
          <p className="contact-note"><BadgeCheck size={16} /> Parker Signs has a Class "A" license and is bonded. Call ahead for shop hours.</p>
          <div className="map">
            <a className="map-fallback" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`} target="_blank" rel="noopener noreferrer"><MapPin size={18} /> Open in Google Maps</a>
            <iframe title="Map to Parker Signs & Graphics" src={`https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=13&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
        <form className="quote" onSubmit={submit}>
          <CutMarks />
          <span className="tag-mono">Sign request · work order</span>
          <h3>Tell us about the project</h3>
          <div className="q-grid">
            <label>Name *<input required value={form.name} onChange={(e) => up("name", e.target.value)} autoComplete="name" /></label>
            <label>Company<input value={form.company} onChange={(e) => up("company", e.target.value)} autoComplete="organization" /></label>
            <label>Phone *<input required type="tel" value={form.phone} onChange={(e) => up("phone", e.target.value)} autoComplete="tel" /></label>
            <label>Email<input type="email" value={form.email} onChange={(e) => up("email", e.target.value)} autoComplete="email" /></label>
            <label>Type of sign
              <select value={form.signType} onChange={(e) => up("signType", e.target.value)}>
                <option value="">Not sure yet</option>
                {PRODUCTS.flatMap((g) => g.items).map((it) => <option key={it}>{it}</option>)}
              </select>
            </label>
            <label>Project location<input value={form.location} onChange={(e) => up("location", e.target.value)} placeholder="City or address" /></label>
            <label className="q-wide">Details<textarea rows={4} value={form.notes} onChange={(e) => up("notes", e.target.value)} placeholder="Size, timeline, whether you have artwork or an architect's plan..." /></label>
            <div className="hp" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => up("website", e.target.value)} /></label></div>
          </div>
          {message && <p className={`q-msg ${status}`} role="status">{message}</p>}
          <button className="btn btn-red" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send to Parker"} <ArrowRight size={18} /></button>
        </form>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <div className="footer-brand">
          <img src={logo} alt="Parker Signs & Graphics, Incorporated" width="445" height="172" loading="lazy" />
          <p>Custom sign design, fabrication and installation since {FOUNDED}.</p>
        </div>
        <div>
          <h4>Visit</h4>
          <p>{ADDRESS.street}<br />{ADDRESS.city}</p>
        </div>
        <div>
          <h4>Reach us</h4>
          <p><a href={`tel:${PHONE_TEL}`}>{PHONE}</a><br />Fax {FAX}<br /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        </div>
        <div>
          <h4>Explore</h4>
          <p>{NAV.map(([l, h]) => <React.Fragment key={h}><a href={h}>{l}</a><br /></React.Fragment>)}</p>
          {SOCIAL_LINKS.filter(([, url]) => url).map(([label, url]) => <a key={label} href={url}>{label}</a>)}
        </div>
      </div>
      <div className="wrap footer-legal">
        <span>© {new Date().getFullYear()} {COMPANY}. Concept redesign by Blueprint WebStudio · Independent concept, not for official use. Current site: <a href={ORIGINAL}>parkersign.com</a></span>
        <StudioCredit />
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <QuickStrip />
        <Portfolio />
        <Products />
        <Process />
        <Story />
        <Towns />
        <Contact />
      </main>
      <Footer />
      <ConceptWidget company={COMPANY} abbr={ABBR} endDate={END_DATE} />
    </>
  );
}
