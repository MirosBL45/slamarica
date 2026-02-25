import { Messages } from "../request";
import sr from "./sr.json";
import en from "./en.json";
import de from "./de.json";
import es from "./es.json";

// Ova promenljiva osigurava da svi jezici prate strukturu sr.json
const check: Record<string, Messages> = {
  sr,
  en,
  de,
  es,
};

export default check;
