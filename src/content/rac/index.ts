import type { Subject } from "../types";
import { orientation, safety } from "./modules-core";
import { thermo, refrigerants } from "./modules-core2";
import { compressors, electrical } from "./modules-core3";
import { components, tubing } from "./modules-trade1";
import { windowAc, splitService, install } from "./modules-trade2";
import { team, career } from "./modules-trade3";

export const racModules = [
  orientation,
  safety,
  thermo,
  refrigerants,
  compressors,
  electrical,
  components,
  tubing,
  windowAc,
  splitService,
  install,
  team,
  career,
];

export const racSubject: Subject = {
  id: "rac-l2",
  track: "rac",
  title: "Refrigeration & Air Conditioning",
  short: "RAC",
  tagline: "NSDA / BNQF Level 2 · National Skills Certificate",
  description:
    "The complete NSDA Level 2 Refrigeration and Air Conditioning qualification — all five units of competency, 300 nominal hours, taught the way a Junior Technician actually works.",
  icon: "snow",
  hue: "#5EE7F0",
  hue2: "#3B82F6",
  exam: {
    label: "RAC L2 theory mock",
    minutes: 45,
    items: "30 items · mixed format",
    pass: "Target 80 % — the real assessment is C/NYC",
  },
  modules: racModules,
};
