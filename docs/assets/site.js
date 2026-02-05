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
