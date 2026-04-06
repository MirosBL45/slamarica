import { Messages } from "../request";
import de from "./de.json";
import en from "./en.json";
import es from "./es.json";
import sr from "./sr.json";

// Ova promenljiva osigurava da svi jezici prate strukturu sr.json
const check: Record<string, Messages> = {
  sr,
  en,
  de,
  es,
};

export default check;
