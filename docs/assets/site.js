const CONFIG = {
  couple: "Lucas & Charline",
  title: "Infos mariage",
  dateText: "02 mai 2026",
  story: [
    "Après dix ans de voyages ensemble et trois petits aventuriers à nos côtés, nous avons décidé de faire une escale spéciale pour célébrer notre amour.",
    "Nous vous invitons à embarquer avec nous pour une journée inoubliable.",
  ],
  schedule: [
    { time: "13h30", text: "Découverte des mariés devant la mairie" },
    { time: "14h00", text: "Cérémonie à la mairie de Saint-Gilles-Croix-de-Vie" },
    { time: "15h00", text: "Messe à l’église Sainte-Croix" },
    { time: "-", text: "Puis, nous vous attendons au Domaine du Pré pour la suite de l’aventure." },
    { time: "17h00", text: "Vin d'honneur et cocktail" },
    { time: "19h00", text: "Entrée dans la salle de réception" },
  ],
  return: [
    { time: "12h00", text: "Retour de noces au Domaine du Pré." },
  ],
  practical: [
    {
      label: "Mairie",
      address: "86 Quai de la République, 85800 Saint-Gilles-Croix-de-Vie",
      mapsUrl: "https://www.google.com/maps?q=86%20Quai%20de%20la%20R%C3%A9publique%2C%2085800%20Saint-Gilles-Croix-de-Vie",
    },
    {
      label: "Église",
      address: "8 Pl Guy Kergoustin, 85800 Saint-Gilles-Croix-de-Vie",
      mapsUrl: "https://www.google.com/maps?q=8%20Pl%20Guy%20Kergoustin%2C%2085800%20Saint-Gilles-Croix-de-Vie",
    },
    {
      label: "Domaine du Pré",
      address: "2 Bellevue, 85220 La Chapelle-Hermier",
      mapsUrl: "https://www.google.com/maps?q=2%20Bellevue%2C%2085220%20La%20Chapelle-Hermier",
    },
  ],
  contact: {
    names: "Charline & Lucas",
    addressLines: ["1 rue du FOC", "85800 St Gilles Croix de Vie"],
    phone: "06.74.06.50.52",
  },
  notes: [
    "Pas de dress code, tant que vous venez avec votre sourire, tout est parfait.",
    "Nous vous conseillons de vous garer plutôt près de l’église, car un cortège à pied est prévu entre la mairie et l’église.",
    "Possibilité de stationner et dormir en camping-car sur le parking situé à côté du Domaine du Pré."
  ],
};

function el(id) {
  const node = document.getElementById(id);
  if (!node) throw new Error(`Missing element #${id}`);
  return node;
}

function toast(message) {
  const t = el("toast");
  t.textContent = message;
  t.classList.add("show");
  window.clearTimeout(toast._timer);
  toast._timer = window.setTimeout(() => t.classList.remove("show"), 2200);
}

function setText(id, value) {
  el(id).textContent = value ?? "";
}

function setHref(id, value) {
  const a = el(id);
  if (!value) {
    a.setAttribute("aria-disabled", "true");
    a.classList.add("disabled");
    a.removeAttribute("href");
    return;
  }
  a.setAttribute("href", value);
  a.removeAttribute("aria-disabled");
  a.classList.remove("disabled");
}

function phoneToTel(phone) {
  if (!phone) return "";
  return `tel:${phone.replace(/\s+/g, "")}`;
}

function mailTo(email) {
  if (!email) return "";
  return `mailto:${email}`;
}

function init() {
  document.title = `${CONFIG.couple} — ${CONFIG.title}`;
  setText("couple", CONFIG.couple);
  setText("dateText", CONFIG.dateText);

  const story = el("story");
  story.innerHTML = "";
  (CONFIG.story ?? []).forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    story.appendChild(p);
  });

  const schedule = el("schedule");
  schedule.innerHTML = "";
  (CONFIG.schedule ?? []).forEach(({ time, text }) => {
    const li = document.createElement("li");
    const t = document.createElement("span");
    t.className = "time mono";
    t.textContent = time ?? "";
    const d = document.createElement("span");
    d.className = "desc";
    d.textContent = text ?? "";
    li.appendChild(t);
    li.appendChild(d);
    schedule.appendChild(li);
  });

  const retour = el("return");
  if (retour) {
    retour.innerHTML = "";
    const items = Array.isArray(CONFIG.return) ? CONFIG.return : [CONFIG.return];
    items.filter(Boolean).forEach((item) => {
      const box = document.createElement("div");
      box.className = "return-box";

      const left = document.createElement("div");
      left.className = "return-date mono";
      const leftText = [item?.date, item?.time].filter(Boolean).join(" — ");
      left.textContent = leftText;

      const right = document.createElement("div");
      right.className = "return-text";
      right.textContent = item?.text ?? "";

      box.appendChild(left);
      box.appendChild(right);
      retour.appendChild(box);
    });
  }

  const practical = el("practical");
  practical.innerHTML = "";
  (CONFIG.practical ?? []).forEach(({ label, address, mapsUrl }) => {
    const row = document.createElement("div");
    row.className = "practical-row";

    const left = document.createElement("div");
    left.className = "practical-left";
    const l = document.createElement("div");
    l.className = "practical-label";
    l.textContent = label ?? "";
    const a = document.createElement("div");
    a.className = "practical-address";
    a.textContent = address ?? "";
    left.appendChild(l);
    left.appendChild(a);

    const right = document.createElement("div");
    right.className = "practical-right";
    const link = document.createElement("a");
    link.className = "btn";
    link.textContent = "Maps";
    if (mapsUrl) {
      link.href = mapsUrl;
      link.target = "_blank";
      link.rel = "noreferrer";
    } else {
      link.setAttribute("aria-disabled", "true");
      link.classList.add("disabled");
    }
    right.appendChild(link);

    row.appendChild(left);
    row.appendChild(right);
    practical.appendChild(row);
  });

  const contact = el("contact");
  contact.innerHTML = "";
  const cn = document.createElement("div");
  cn.className = "contact-names";
  cn.textContent = CONFIG.contact?.names ?? "";
  contact.appendChild(cn);

  const ca = document.createElement("div");
  ca.className = "contact-address";
  (CONFIG.contact?.addressLines ?? []).forEach((line) => {
    const div = document.createElement("div");
    div.textContent = line;
    ca.appendChild(div);
  });
  contact.appendChild(ca);

  if (CONFIG.contact?.phone) {
    const cp = document.createElement("a");
    cp.className = "contact-phone mono";
    cp.textContent = CONFIG.contact.phone;
    cp.href = phoneToTel(CONFIG.contact.phone);
    contact.appendChild(cp);
  }

  const notes = el("notes");
  notes.innerHTML = "";
  (CONFIG.notes ?? []).forEach((n) => {
    const li = document.createElement("li");
    li.textContent = n;
    notes.appendChild(li);
  });

  const copyLink = document.getElementById("copyLink");
  if (copyLink) copyLink.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast("Lien copié");
    } catch {
      toast("Impossible de copier automatiquement");
    }
  });

  const copyInfo = document.getElementById("copyInfo");
  if (copyInfo) copyInfo.addEventListener("click", async () => {
    const scheduleText = (CONFIG.schedule ?? [])
      .map((s) => `${s.time} — ${s.text}`.trim())
      .filter(Boolean)
      .join("\n");
    const practicalText = (CONFIG.practical ?? [])
      .map((p) => `${p.label}: ${p.address}`.trim())
      .filter(Boolean)
      .join("\n");
    const payload = [
      `${CONFIG.couple} — ${CONFIG.title}`,
      `Date: ${CONFIG.dateText}`,
      "",
      "",
      "Programme:",
      scheduleText,
      "",
      "Infos pratiques:",
      practicalText,
      "",
      CONFIG.contact?.names ? `Contact: ${CONFIG.contact.names}` : "",
      ...(CONFIG.contact?.addressLines ?? []),
      CONFIG.contact?.phone ? `Téléphone: ${CONFIG.contact.phone}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await navigator.clipboard.writeText(payload);
      toast("Infos copiées");
    } catch {
      toast("Copie impossible");
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
