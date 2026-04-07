import { Messages } from "../request";
import de from "./de";
import en from "./en";
import es from "./es";
import sr from "./sr";

// Ova promenljiva osigurava da svi jezici prate strukturu sr.json
const check: Record<string, Messages> = {
  sr,
  en,
  de,
  es,
};

export default check;
