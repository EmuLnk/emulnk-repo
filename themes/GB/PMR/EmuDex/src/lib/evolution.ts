export type EvolutionKind = "level" | "stone" | "trade" | "branch" | "final" | "none";

export interface EvolutionSummary {
  kind: EvolutionKind;
  target: string;
  label: string;
  ready: boolean;
}

interface LevelEvolution {
  kind: "level";
  level: number;
  target: string;
}

interface StoneEvolution {
  kind: "stone";
  stone: string;
  target: string;
}

interface TradeEvolution {
  kind: "trade";
  target: string;
}

type EvolutionRule = LevelEvolution | StoneEvolution | TradeEvolution;

// Mirrored from pret/pokered data/pokemon/evos_moves.asm normal Gen 1 evolution data.
const EVOLUTIONS: Record<string, readonly EvolutionRule[]> = {
  ABRA: [{ kind: "level", level: 16, target: "KADABRA" }],
  BELLSPROUT: [{ kind: "level", level: 21, target: "WEEPINBELL" }],
  BULBASAUR: [{ kind: "level", level: 16, target: "IVYSAUR" }],
  CATERPIE: [{ kind: "level", level: 7, target: "METAPOD" }],
  CHARMANDER: [{ kind: "level", level: 16, target: "CHARMELEON" }],
  CHARMELEON: [{ kind: "level", level: 36, target: "CHARIZARD" }],
  CLEFAIRY: [{ kind: "stone", stone: "MOON_STONE", target: "CLEFABLE" }],
  CUBONE: [{ kind: "level", level: 28, target: "MAROWAK" }],
  DIGLETT: [{ kind: "level", level: 26, target: "DUGTRIO" }],
  DODUO: [{ kind: "level", level: 31, target: "DODRIO" }],
  DRAGONAIR: [{ kind: "level", level: 55, target: "DRAGONITE" }],
  DRATINI: [{ kind: "level", level: 30, target: "DRAGONAIR" }],
  DROWZEE: [{ kind: "level", level: 26, target: "HYPNO" }],
  EEVEE: [
    { kind: "stone", stone: "WATER_STONE", target: "VAPOREON" },
    { kind: "stone", stone: "THUNDER_STONE", target: "JOLTEON" },
    { kind: "stone", stone: "FIRE_STONE", target: "FLAREON" },
  ],
  EKANS: [{ kind: "level", level: 22, target: "ARBOK" }],
  EXEGGCUTE: [{ kind: "stone", stone: "LEAF_STONE", target: "EXEGGUTOR" }],
  GASTLY: [{ kind: "level", level: 25, target: "HAUNTER" }],
  GEODUDE: [{ kind: "level", level: 25, target: "GRAVELER" }],
  GLOOM: [{ kind: "stone", stone: "LEAF_STONE", target: "VILEPLUME" }],
  GOLDEEN: [{ kind: "level", level: 33, target: "SEAKING" }],
  GRAVELER: [{ kind: "trade", target: "GOLEM" }],
  GRIMER: [{ kind: "level", level: 38, target: "MUK" }],
  GROWLITHE: [{ kind: "stone", stone: "FIRE_STONE", target: "ARCANINE" }],
  HAUNTER: [{ kind: "trade", target: "GENGAR" }],
  HORSEA: [{ kind: "level", level: 32, target: "SEADRA" }],
  IVYSAUR: [{ kind: "level", level: 32, target: "VENUSAUR" }],
  JIGGLYPUFF: [{ kind: "stone", stone: "MOON_STONE", target: "WIGGLYTUFF" }],
  KABUTO: [{ kind: "level", level: 40, target: "KABUTOPS" }],
  KADABRA: [{ kind: "trade", target: "ALAKAZAM" }],
  KAKUNA: [{ kind: "level", level: 10, target: "BEEDRILL" }],
  KOFFING: [{ kind: "level", level: 35, target: "WEEZING" }],
  KRABBY: [{ kind: "level", level: 28, target: "KINGLER" }],
  MACHOKE: [{ kind: "trade", target: "MACHAMP" }],
  MACHOP: [{ kind: "level", level: 28, target: "MACHOKE" }],
  MAGIKARP: [{ kind: "level", level: 20, target: "GYARADOS" }],
  MAGNEMITE: [{ kind: "level", level: 30, target: "MAGNETON" }],
  MANKEY: [{ kind: "level", level: 28, target: "PRIMEAPE" }],
  MEOWTH: [{ kind: "level", level: 28, target: "PERSIAN" }],
  METAPOD: [{ kind: "level", level: 10, target: "BUTTERFREE" }],
  "NIDORAN♀": [{ kind: "level", level: 16, target: "NIDORINA" }],
  "NIDORAN♂": [{ kind: "level", level: 16, target: "NIDORINO" }],
  NIDORINA: [{ kind: "stone", stone: "MOON_STONE", target: "NIDOQUEEN" }],
  NIDORINO: [{ kind: "stone", stone: "MOON_STONE", target: "NIDOKING" }],
  ODDISH: [{ kind: "level", level: 21, target: "GLOOM" }],
  OMANYTE: [{ kind: "level", level: 40, target: "OMASTAR" }],
  PARAS: [{ kind: "level", level: 24, target: "PARASECT" }],
  PIDGEOTTO: [{ kind: "level", level: 36, target: "PIDGEOT" }],
  PIDGEY: [{ kind: "level", level: 18, target: "PIDGEOTTO" }],
  PIKACHU: [{ kind: "stone", stone: "THUNDER_STONE", target: "RAICHU" }],
  POLIWHIRL: [{ kind: "stone", stone: "WATER_STONE", target: "POLIWRATH" }],
  POLIWAG: [{ kind: "level", level: 25, target: "POLIWHIRL" }],
  PONYTA: [{ kind: "level", level: 40, target: "RAPIDASH" }],
  PSYDUCK: [{ kind: "level", level: 33, target: "GOLDUCK" }],
  RATTATA: [{ kind: "level", level: 20, target: "RATICATE" }],
  RHYHORN: [{ kind: "level", level: 42, target: "RHYDON" }],
  SANDSHREW: [{ kind: "level", level: 22, target: "SANDSLASH" }],
  SEEL: [{ kind: "level", level: 34, target: "DEWGONG" }],
  SHELLDER: [{ kind: "stone", stone: "WATER_STONE", target: "CLOYSTER" }],
  SLOWPOKE: [{ kind: "level", level: 37, target: "SLOWBRO" }],
  SPEAROW: [{ kind: "level", level: 20, target: "FEAROW" }],
  SQUIRTLE: [{ kind: "level", level: 16, target: "WARTORTLE" }],
  STARYU: [{ kind: "stone", stone: "WATER_STONE", target: "STARMIE" }],
  TENTACOOL: [{ kind: "level", level: 30, target: "TENTACRUEL" }],
  VENONAT: [{ kind: "level", level: 31, target: "VENOMOTH" }],
  VOLTORB: [{ kind: "level", level: 30, target: "ELECTRODE" }],
  VULPIX: [{ kind: "stone", stone: "FIRE_STONE", target: "NINETALES" }],
  WARTORTLE: [{ kind: "level", level: 36, target: "BLASTOISE" }],
  WEEDLE: [{ kind: "level", level: 7, target: "KAKUNA" }],
  WEEPINBELL: [{ kind: "stone", stone: "LEAF_STONE", target: "VICTREEBEL" }],
  ZUBAT: [{ kind: "level", level: 22, target: "GOLBAT" }],
};

const FINAL_FORMS = new Set(
  Object.values(EVOLUTIONS)
    .flatMap((rules) => rules.map((rule) => rule.target))
    .filter((target) => !Object.prototype.hasOwnProperty.call(EVOLUTIONS, target)),
);

function normalizeSpecies(speciesName: string): string {
  return speciesName.trim().toUpperCase();
}

function itemLabel(item: string): string {
  return item.replace(/_/g, " ");
}

function summaryForRule(rule: EvolutionRule, level: number): EvolutionSummary {
  if (rule.kind === "level") {
    return {
      kind: "level",
      target: rule.target,
      ready: level >= rule.level,
      label: `L${rule.level} -> ${rule.target}`,
    };
  }

  if (rule.kind === "stone") {
    return {
      kind: "stone",
      target: rule.target,
      ready: true,
      label: `${itemLabel(rule.stone)} -> ${rule.target}`,
    };
  }

  return {
    kind: "trade",
    target: rule.target,
    ready: true,
    label: `TRADE -> ${rule.target}`,
  };
}

export function evolutionSummaryForSpecies(speciesName: string, level: number): EvolutionSummary {
  const species = normalizeSpecies(speciesName);
  const rules = EVOLUTIONS[species];

  if (rules?.length) {
    if (rules.length > 1) {
      const target = rules.map((rule) => rule.target).join(" / ");
      return {
        kind: "branch",
        target,
        ready: true,
        label: `STONE -> ${target}`,
      };
    }

    return summaryForRule(rules[0], level);
  }

  if (FINAL_FORMS.has(species)) {
    return {
      kind: "final",
      target: "",
      ready: false,
      label: "FINAL FORM",
    };
  }

  return {
    kind: "none",
    target: "",
    ready: false,
    label: "NO EVOLUTION DATA",
  };
}
