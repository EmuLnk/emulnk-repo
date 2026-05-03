export interface Gen1StatBlock {
  hp: number;
  atk: number;
  def: number;
  speed: number;
  special: number;
}

export interface Gen1DVs extends Gen1StatBlock {}

export interface Gen1Status {
  raw: number;
  label: string;
  name: string;
  turns?: number;
  catchBonus: number;
  shakeBonus: number;
}

export interface Gen1MoveSlot {
  id: number;
  name: string;
  typeId: number;
  typeName: string;
  power: number;
  accuracy: number;
  maxPp: number;
  pp: number;
  ppUps: number;
}

export interface Gen1Pokemon {
  speciesId: number;
  speciesName: string;
  nickname: string;
  level: number;
  boxLevel?: number;
  hp: number;
  maxhp: number;
  status: Gen1Status;
  type1: number;
  type2: number;
  typeNames: [string, string];
  catchRate: number;
  moves: Gen1MoveSlot[];
  otid?: number;
  experience?: number;
  statExp?: Gen1StatBlock;
  dvs: Gen1DVs;
  stats: Omit<Gen1StatBlock, "hp">;
}

export interface Gen1CatchInput {
  ball: "poke" | "great" | "ultra" | "safari" | "master";
  maxHp: number;
  currentHp: number;
  catchRate: number;
  status: number;
}

export interface Gen1CatchResult {
  chance: number;
  percent: number;
  x: number;
  w: number;
  y: number;
  z: number;
  shakes: number;
  ballFactor: number;
  shakeBallFactor: number;
  statusBonus: number;
  captureStatusBonus: number;
  guaranteed: boolean;
}

const SPECIES_NAMES = "|RHYDON|KANGASKHAN|NIDORAN\u2642|CLEFAIRY|SPEAROW|VOLTORB|NIDOKING|SLOWBRO|IVYSAUR|EXEGGUTOR|LICKITUNG|EXEGGCUTE|GRIMER|GENGAR|NIDORAN\u2640|NIDOQUEEN|CUBONE|RHYHORN|LAPRAS|ARCANINE|MEW|GYARADOS|SHELLDER|TENTACOOL|GASTLY|SCYTHER|STARYU|BLASTOISE|PINSIR|TANGELA|MISSINGNO.|MISSINGNO.|GROWLITHE|ONIX|FEAROW|PIDGEY|SLOWPOKE|KADABRA|GRAVELER|CHANSEY|MACHOKE|MR.MIME|HITMONLEE|HITMONCHAN|ARBOK|PARASECT|PSYDUCK|DROWZEE|GOLEM|MISSINGNO.|MAGMAR|MISSINGNO.|ELECTABUZZ|MAGNETON|KOFFING|MISSINGNO.|MANKEY|SEEL|DIGLETT|TAUROS|MISSINGNO.|MISSINGNO.|MISSINGNO.|FARFETCH'D|VENONAT|DRAGONITE|MISSINGNO.|MISSINGNO.|MISSINGNO.|DODUO|POLIWAG|JYNX|MOLTRES|ARTICUNO|ZAPDOS|DITTO|MEOWTH|KRABBY|MISSINGNO.|MISSINGNO.|MISSINGNO.|VULPIX|NINETALES|PIKACHU|RAICHU|MISSINGNO.|MISSINGNO.|DRATINI|DRAGONAIR|KABUTO|KABUTOPS|HORSEA|SEADRA|MISSINGNO.|MISSINGNO.|SANDSHREW|SANDSLASH|OMANYTE|OMASTAR|JIGGLYPUFF|WIGGLYTUFF|EEVEE|FLAREON|JOLTEON|VAPOREON|MACHOP|ZUBAT|EKANS|PARAS|POLIWHIRL|POLIWRATH|WEEDLE|KAKUNA|BEEDRILL|MISSINGNO.|DODRIO|PRIMEAPE|DUGTRIO|VENOMOTH|DEWGONG|MISSINGNO.|MISSINGNO.|CATERPIE|METAPOD|BUTTERFREE|MACHAMP|MISSINGNO.|GOLDUCK|HYPNO|GOLBAT|MEWTWO|SNORLAX|MAGIKARP|MISSINGNO.|MISSINGNO.|MUK|MISSINGNO.|KINGLER|CLOYSTER|MISSINGNO.|ELECTRODE|CLEFABLE|WEEZING|PERSIAN|MAROWAK|MISSINGNO.|HAUNTER|ABRA|ALAKAZAM|PIDGEOTTO|PIDGEOT|STARMIE|BULBASAUR|VENUSAUR|TENTACRUEL|MISSINGNO.|GOLDEEN|SEAKING|MISSINGNO.|MISSINGNO.|MISSINGNO.|MISSINGNO.|PONYTA|RAPIDASH|RATTATA|RATICATE|NIDORINO|NIDORINA|GEODUDE|PORYGON|AERODACTYL|MISSINGNO.|MAGNEMITE|MISSINGNO.|MISSINGNO.|CHARMANDER|SQUIRTLE|CHARMELEON|WARTORTLE|CHARIZARD|MISSINGNO.|MISSINGNO.|MISSINGNO.|MISSINGNO.|ODDISH|GLOOM|VILEPLUME|BELLSPROUT|WEEPINBELL|VICTREEBEL".split("|");
const MOVE_NAMES = "|POUND|KARATE CHOP|DOUBLESLAP|COMET PUNCH|MEGA PUNCH|PAY DAY|FIRE PUNCH|ICE PUNCH|THUNDERPUNCH|SCRATCH|VICEGRIP|GUILLOTINE|RAZOR WIND|SWORDS DANCE|CUT|GUST|WING ATTACK|WHIRLWIND|FLY|BIND|SLAM|VINE WHIP|STOMP|DOUBLE KICK|MEGA KICK|JUMP KICK|ROLLING KICK|SAND-ATTACK|HEADBUTT|HORN ATTACK|FURY ATTACK|HORN DRILL|TACKLE|BODY SLAM|WRAP|TAKE DOWN|THRASH|DOUBLE-EDGE|TAIL WHIP|POISON STING|TWINEEDLE|PIN MISSILE|LEER|BITE|GROWL|ROAR|SING|SUPERSONIC|SONICBOOM|DISABLE|ACID|EMBER|FLAMETHROWER|MIST|WATER GUN|HYDRO PUMP|SURF|ICE BEAM|BLIZZARD|PSYBEAM|BUBBLEBEAM|AURORA BEAM|HYPER BEAM|PECK|DRILL PECK|SUBMISSION|LOW KICK|COUNTER|SEISMIC TOSS|STRENGTH|ABSORB|MEGA DRAIN|LEECH SEED|GROWTH|RAZOR LEAF|SOLARBEAM|POISONPOWDER|STUN SPORE|SLEEP POWDER|PETAL DANCE|STRING SHOT|DRAGON RAGE|FIRE SPIN|THUNDERSHOCK|THUNDERBOLT|THUNDER WAVE|THUNDER|ROCK THROW|EARTHQUAKE|FISSURE|DIG|TOXIC|CONFUSION|PSYCHIC|HYPNOSIS|MEDITATE|AGILITY|QUICK ATTACK|RAGE|TELEPORT|NIGHT SHADE|MIMIC|SCREECH|DOUBLE TEAM|RECOVER|HARDEN|MINIMIZE|SMOKESCREEN|CONFUSE RAY|WITHDRAW|DEFENSE CURL|BARRIER|LIGHT SCREEN|HAZE|REFLECT|FOCUS ENERGY|BIDE|METRONOME|MIRROR MOVE|SELFDESTRUCT|EGG BOMB|LICK|SMOG|SLUDGE|BONE CLUB|FIRE BLAST|WATERFALL|CLAMP|SWIFT|SKULL BASH|SPIKE CANNON|CONSTRICT|AMNESIA|KINESIS|SOFTBOILED|HI JUMP KICK|GLARE|DREAM EATER|POISON GAS|BARRAGE|LEECH LIFE|LOVELY KISS|SKY ATTACK|TRANSFORM|BUBBLE|DIZZY PUNCH|SPORE|FLASH|PSYWAVE|SPLASH|ACID ARMOR|CRABHAMMER|EXPLOSION|FURY SWIPES|BONEMERANG|REST|ROCK SLIDE|HYPER FANG|SHARPEN|CONVERSION|TRI ATTACK|SUPER FANG|SLASH|SUBSTITUTE|STRUGGLE".split("|");
const MOVE_TYPE_IDS = [0,0,0,0,0,0,0,20,25,23,0,0,0,0,0,0,0,2,0,2,0,0,22,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,3,7,7,0,0,0,0,0,0,0,0,3,20,20,25,21,21,21,25,25,24,21,25,0,2,2,1,1,1,1,0,22,22,22,0,22,22,3,22,22,22,7,26,20,23,23,23,23,5,4,4,4,3,24,24,24,24,24,0,0,24,8,0,0,0,0,0,0,0,8,21,0,24,24,25,24,0,0,0,2,0,0,8,3,3,4,20,21,21,0,0,0,0,24,24,0,1,0,24,3,0,7,0,2,0,21,0,22,0,24,0,3,21,0,0,4,24,5,0,0,0,0,0,0,0,0];
const MOVE_POWER = [0,40,50,15,18,80,40,75,75,75,40,55,1,80,0,50,40,35,0,70,15,80,35,65,30,120,70,60,0,70,65,15,1,35,85,15,90,90,100,0,15,25,14,0,60,0,0,0,0,1,0,40,40,95,0,40,120,95,95,120,65,65,65,150,35,80,80,50,1,1,80,20,40,0,0,55,120,0,0,0,70,0,1,15,40,95,0,120,50,100,1,100,0,50,90,0,0,0,40,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,130,100,20,20,65,65,120,80,35,60,100,20,10,0,0,0,85,0,100,0,15,20,0,140,0,20,70,0,0,1,0,0,90,170,18,50,0,75,80,0,0,80,1,70,0,50];
const MOVE_ACCURACY = [0,100,100,85,85,85,100,100,100,100,100,100,30,75,100,95,100,100,85,95,75,75,100,100,100,75,95,85,100,100,100,85,30,95,100,85,85,100,100,100,100,100,85,100,100,100,100,55,55,90,55,100,100,100,100,100,80,100,100,90,100,100,100,90,100,100,80,90,100,100,100,100,100,90,100,95,100,75,75,75,100,95,100,70,100,100,100,70,65,100,30,100,85,100,100,60,100,100,100,100,100,100,100,85,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,75,100,70,100,85,85,100,75,100,100,100,100,100,80,100,90,75,100,55,85,100,75,90,100,100,100,100,70,80,100,100,85,100,80,90,100,90,90,100,100,100];
const MOVE_MAX_PP = [0,35,25,10,15,20,20,15,15,15,35,30,5,10,30,30,35,35,20,15,20,20,10,20,30,5,25,15,15,15,25,20,5,35,15,20,20,20,15,30,35,20,20,30,25,40,20,15,20,20,20,30,25,15,30,25,5,15,10,5,20,20,20,5,35,20,25,20,20,20,15,20,10,10,40,25,10,35,30,15,20,40,10,15,30,15,20,10,15,10,5,10,10,25,10,20,40,30,30,20,20,15,10,40,15,20,30,20,20,10,40,40,30,30,30,20,30,10,10,20,5,10,30,20,20,20,5,15,10,20,15,15,35,20,15,10,20,30,15,40,20,15,10,5,10,30,10,15,20,15,40,40,10,5,15,10,10,10,15,30,30,10,10,20,10,10];

export const GEN1_TYPE_NAMES: Record<number, string> = {
  0x00: "Normal",
  0x01: "Fighting",
  0x02: "Flying",
  0x03: "Poison",
  0x04: "Ground",
  0x05: "Rock",
  0x06: "Bird",
  0x07: "Bug",
  0x08: "Ghost",
  0x14: "Fire",
  0x15: "Water",
  0x16: "Grass",
  0x17: "Electric",
  0x18: "Psychic",
  0x19: "Ice",
  0x1a: "Dragon",
};

const GEN1_SPECIES_INFO: Record<number, { type1: number; type2: number; catchRate: number }> = {1:{type1:4,type2:5,catchRate:60},2:{type1:0,type2:0,catchRate:45},3:{type1:3,type2:3,catchRate:235},4:{type1:0,type2:0,catchRate:150},5:{type1:0,type2:2,catchRate:255},6:{type1:23,type2:23,catchRate:190},7:{type1:3,type2:4,catchRate:45},8:{type1:21,type2:24,catchRate:75},9:{type1:22,type2:3,catchRate:45},10:{type1:22,type2:24,catchRate:45},11:{type1:0,type2:0,catchRate:45},12:{type1:22,type2:24,catchRate:90},13:{type1:3,type2:3,catchRate:190},14:{type1:8,type2:3,catchRate:45},15:{type1:3,type2:3,catchRate:235},16:{type1:3,type2:4,catchRate:45},17:{type1:4,type2:4,catchRate:190},18:{type1:4,type2:5,catchRate:120},19:{type1:21,type2:25,catchRate:45},20:{type1:20,type2:20,catchRate:75},21:{type1:24,type2:24,catchRate:45},22:{type1:21,type2:2,catchRate:45},23:{type1:21,type2:21,catchRate:190},24:{type1:21,type2:3,catchRate:190},25:{type1:8,type2:3,catchRate:190},26:{type1:7,type2:2,catchRate:45},27:{type1:21,type2:21,catchRate:225},28:{type1:21,type2:21,catchRate:45},29:{type1:7,type2:7,catchRate:45},30:{type1:22,type2:22,catchRate:45},33:{type1:20,type2:20,catchRate:190},34:{type1:5,type2:4,catchRate:45},35:{type1:0,type2:2,catchRate:90},36:{type1:0,type2:2,catchRate:255},37:{type1:21,type2:24,catchRate:190},38:{type1:24,type2:24,catchRate:100},39:{type1:5,type2:4,catchRate:120},40:{type1:0,type2:0,catchRate:30},41:{type1:1,type2:1,catchRate:90},42:{type1:24,type2:24,catchRate:45},43:{type1:1,type2:1,catchRate:45},44:{type1:1,type2:1,catchRate:45},45:{type1:3,type2:3,catchRate:90},46:{type1:7,type2:22,catchRate:75},47:{type1:21,type2:21,catchRate:190},48:{type1:24,type2:24,catchRate:190},49:{type1:5,type2:4,catchRate:45},51:{type1:20,type2:20,catchRate:45},53:{type1:23,type2:23,catchRate:45},54:{type1:23,type2:23,catchRate:60},55:{type1:3,type2:3,catchRate:190},57:{type1:1,type2:1,catchRate:190},58:{type1:21,type2:21,catchRate:190},59:{type1:4,type2:4,catchRate:255},60:{type1:0,type2:0,catchRate:45},64:{type1:0,type2:2,catchRate:45},65:{type1:7,type2:3,catchRate:190},66:{type1:26,type2:2,catchRate:45},70:{type1:0,type2:2,catchRate:190},71:{type1:21,type2:21,catchRate:255},72:{type1:25,type2:24,catchRate:45},73:{type1:20,type2:2,catchRate:3},74:{type1:25,type2:2,catchRate:3},75:{type1:23,type2:2,catchRate:3},76:{type1:0,type2:0,catchRate:35},77:{type1:0,type2:0,catchRate:255},78:{type1:21,type2:21,catchRate:225},82:{type1:20,type2:20,catchRate:190},83:{type1:20,type2:20,catchRate:75},84:{type1:23,type2:23,catchRate:190},85:{type1:23,type2:23,catchRate:75},88:{type1:26,type2:26,catchRate:45},89:{type1:26,type2:26,catchRate:45},90:{type1:5,type2:21,catchRate:45},91:{type1:5,type2:21,catchRate:45},92:{type1:21,type2:21,catchRate:225},93:{type1:21,type2:21,catchRate:75},96:{type1:4,type2:4,catchRate:255},97:{type1:4,type2:4,catchRate:90},98:{type1:5,type2:21,catchRate:45},99:{type1:5,type2:21,catchRate:45},100:{type1:0,type2:0,catchRate:170},101:{type1:0,type2:0,catchRate:50},102:{type1:0,type2:0,catchRate:45},103:{type1:20,type2:20,catchRate:45},104:{type1:23,type2:23,catchRate:45},105:{type1:21,type2:21,catchRate:45},106:{type1:1,type2:1,catchRate:180},107:{type1:3,type2:2,catchRate:255},108:{type1:3,type2:3,catchRate:255},109:{type1:7,type2:22,catchRate:190},110:{type1:21,type2:21,catchRate:120},111:{type1:21,type2:1,catchRate:45},112:{type1:7,type2:3,catchRate:255},113:{type1:7,type2:3,catchRate:120},114:{type1:7,type2:3,catchRate:45},116:{type1:0,type2:2,catchRate:45},117:{type1:1,type2:1,catchRate:75},118:{type1:4,type2:4,catchRate:50},119:{type1:7,type2:3,catchRate:75},120:{type1:21,type2:25,catchRate:75},123:{type1:7,type2:7,catchRate:255},124:{type1:7,type2:7,catchRate:120},125:{type1:7,type2:2,catchRate:45},126:{type1:1,type2:1,catchRate:45},128:{type1:21,type2:21,catchRate:75},129:{type1:24,type2:24,catchRate:75},130:{type1:3,type2:2,catchRate:90},131:{type1:24,type2:24,catchRate:3},132:{type1:0,type2:0,catchRate:25},133:{type1:21,type2:21,catchRate:255},136:{type1:3,type2:3,catchRate:75},138:{type1:21,type2:21,catchRate:60},139:{type1:21,type2:25,catchRate:60},141:{type1:23,type2:23,catchRate:60},142:{type1:0,type2:0,catchRate:25},143:{type1:3,type2:3,catchRate:60},144:{type1:0,type2:0,catchRate:90},145:{type1:4,type2:4,catchRate:75},147:{type1:8,type2:3,catchRate:90},148:{type1:24,type2:24,catchRate:200},149:{type1:24,type2:24,catchRate:50},150:{type1:0,type2:2,catchRate:120},151:{type1:0,type2:2,catchRate:45},152:{type1:21,type2:24,catchRate:60},153:{type1:22,type2:3,catchRate:45},154:{type1:22,type2:3,catchRate:45},155:{type1:21,type2:3,catchRate:60},157:{type1:21,type2:21,catchRate:225},158:{type1:21,type2:21,catchRate:60},163:{type1:20,type2:20,catchRate:190},164:{type1:20,type2:20,catchRate:60},165:{type1:0,type2:0,catchRate:255},166:{type1:0,type2:0,catchRate:90},167:{type1:3,type2:3,catchRate:120},168:{type1:3,type2:3,catchRate:120},169:{type1:5,type2:4,catchRate:255},170:{type1:0,type2:0,catchRate:45},171:{type1:5,type2:2,catchRate:45},173:{type1:23,type2:23,catchRate:190},176:{type1:20,type2:20,catchRate:45},177:{type1:21,type2:21,catchRate:45},178:{type1:20,type2:20,catchRate:45},179:{type1:21,type2:21,catchRate:45},180:{type1:20,type2:2,catchRate:45},185:{type1:22,type2:3,catchRate:255},186:{type1:22,type2:3,catchRate:120},187:{type1:22,type2:3,catchRate:45},188:{type1:22,type2:3,catchRate:255},189:{type1:22,type2:3,catchRate:120},190:{type1:22,type2:3,catchRate:45}};

export const GEN1_MAP_NAMES = "Pallet Town|Viridian City|Pewter City|Cerulean City|Lavender Town|Vermilion City|Celadon City|Fuchsia City|Cinnabar Island|Indigo Plateau|Saffron City|Unused Map 0b|Route 1|Route 2|Route 3|Route 4|Route 5|Route 6|Route 7|Route 8|Route 9|Route 10|Route 11|Route 12|Route 13|Route 14|Route 15|Route 16|Route 17|Route 18|Route 19|Route 20|Route 21|Route 22|Route 23|Route 24|Route 25|Reds House 1F|Reds House 2F|Blues House|Oaks Lab|Viridian Pokecenter|Viridian Mart|Viridian School House|Viridian Nickname House|Viridian Gym|Digletts Cave Route 2|Viridian Forest North Gate|Route 2 Trade House|Route 2 Gate|Viridian Forest South Gate|Viridian Forest|Museum 1F|Museum 2F|Pewter Gym|Pewter Nidoran House|Pewter Mart|Pewter Speech House|Pewter Pokecenter|Mt Moon 1F|Mt Moon B1F|Mt Moon B2F|Cerulean Trashed House|Cerulean Trade House|Cerulean Pokecenter|Cerulean Gym|Bike Shop|Cerulean Mart|Mt Moon Pokecenter|Cerulean Trashed House Copy|Route 5 Gate|Underground Path Route 5|Daycare|Route 6 Gate|Underground Path Route 6|Underground Path Route 6 Copy|Route 7 Gate|Underground Path Route 7|Underground Path Route 7 Copy|Route 8 Gate|Underground Path Route 8|Rock Tunnel Pokecenter|Rock Tunnel 1F|Power Plant|Route 11 Gate 1F|Digletts Cave Route 11|Route 11 Gate 2F|Route 12 Gate 1F|Bills House|Vermilion Pokecenter|Pokemon Fan Club|Vermilion Mart|Vermilion Gym|Vermilion Pidgey House|Vermilion Dock|SS Anne 1F|SS Anne 2F|SS Anne 3F|SS Anne B1F|SS Anne Bow|SS Anne Kitchen|SS Anne Captains Room|SS Anne 1F Rooms|SS Anne 2F Rooms|SS Anne B1F Rooms|Unused Map 69|Unused Map 6a|Unused Map 6b|Victory Road 1F|Unused Map 6d|Unused Map 6e|Unused Map 6f|Unused Map 70|Lances Room|Unused Map 72|Unused Map 73|Unused Map 74|Unused Map 75|Hall Of Fame|Underground Path North South|Champions Room|Underground Path West East|Celadon Mart 1F|Celadon Mart 2F|Celadon Mart 3F|Celadon Mart 4f|Celadon Mart Roof|Celadon Mart Elevator|Celadon Mansion 1F|Celadon Mansion 2F|Celadon Mansion 3F|Celadon Mansion Roof|Celadon Mansion Roof House|Celadon Pokecenter|Celadon Gym|Game Corner|Celadon Mart 5f|Game Corner Prize Room|Celadon Diner|Celadon Chief House|Celadon Hotel|Lavender Pokecenter|Pokemon Tower 1F|Pokemon Tower 2F|Pokemon Tower 3F|Pokemon Tower 4f|Pokemon Tower 5f|Pokemon Tower 6f|Pokemon Tower 7f|Mr Fujis House|Lavender Mart|Lavender Cubone House|Fuchsia Mart|Fuchsia Bills Grandpas House|Fuchsia Pokecenter|Wardens House|Safari Zone Gate|Fuchsia Gym|Fuchsia Meeting Room|Seafoam Islands B1F|Seafoam Islands B2F|Seafoam Islands B3F|Seafoam Islands B4F|Vermilion Old Rod House|Fuchsia Good Rod House|Pokemon Mansion 1F|Cinnabar Gym|Cinnabar Lab|Cinnabar Lab Trade Room|Cinnabar Lab Metronome Room|Cinnabar Lab Fossil Room|Cinnabar Pokecenter|Cinnabar Mart|Cinnabar Mart Copy|Indigo Plateau Lobby|Copycats House 1F|Copycats House 2F|Fighting Dojo|Saffron Gym|Saffron Pidgey House|Saffron Mart|Silph Co 1F|Saffron Pokecenter|Mr Psychics House|Route 15 Gate 1F|Route 15 Gate 2F|Route 16 Gate 1F|Route 16 Gate 2F|Route 16 Fly House|Route 12 Super Rod House|Route 18 Gate 1F|Route 18 Gate 2F|Seafoam Islands 1F|Route 22 Gate|Victory Road 2F|Route 12 Gate 2F|Vermilion Trade House|Digletts Cave|Victory Road 3F|Rocket Hideout B1F|Rocket Hideout B2F|Rocket Hideout B3F|Rocket Hideout B4F|Rocket Hideout Elevator|Unused Map Cc|Unused Map Cd|Unused Map Ce|Silph Co 2F|Silph Co 3F|Silph Co 4f|Silph Co 5f|Silph Co 6f|Silph Co 7f|Silph Co 8f|Pokemon Mansion 2F|Pokemon Mansion 3F|Pokemon Mansion B1F|Safari Zone East|Safari Zone North|Safari Zone West|Safari Zone Center|Safari Zone Center Rest House|Safari Zone Secret House|Safari Zone West Rest House|Safari Zone East Rest House|Safari Zone North Rest House|Cerulean Cave 2F|Cerulean Cave B1F|Cerulean Cave 1F|Name Raters House|Cerulean Badge House|Unused Map E7|Rock Tunnel B1F|Silph Co 9f|Silph Co 10f|Silph Co 11f|Silph Co Elevator|Unused Map Ed|Unused Map Ee|Trade Center|Colosseum|Unused Map F1|Unused Map F2|Unused Map F3|Unused Map F4|Loreleis Room|Brunos Room|Agathas Room".split("|");

const CHARMAP: Record<number, string> = {
  0x4a: "PKMN",
  0x54: "POKe",
  0x5b: "PC",
  0x5c: "TM",
  0x5d: "TRAINER",
  0x5e: "ROCKET",
  0x6d: ":",
  0x70: "'",
  0x71: "'",
  0x72: "\"",
  0x73: "\"",
  0x75: "...",
  0x7f: " ",
  0xba: "\u00e9",
  0xbb: "'d",
  0xbc: "'l",
  0xbd: "'s",
  0xbe: "'t",
  0xbf: "'v",
  0xe0: "'",
  0xe1: "PK",
  0xe2: "MN",
  0xe3: "-",
  0xe4: "'r",
  0xe5: "'m",
  0xe6: "?",
  0xe7: "!",
  0xe8: ".",
  0xef: "\u2642",
  0xf2: ".",
  0xf3: "/",
  0xf4: ",",
  0xf5: "\u2640",
};

const TYPE_MATCHUPS: Array<[number, number, number]> = [
  [0x15,0x14,2],[0x14,0x16,2],[0x14,0x19,2],[0x16,0x15,2],[0x17,0x15,2],
  [0x15,0x05,2],[0x04,0x02,0],[0x15,0x15,0.5],[0x14,0x14,0.5],[0x17,0x17,0.5],
  [0x19,0x19,0.5],[0x16,0x16,0.5],[0x18,0x18,0.5],[0x14,0x15,0.5],[0x16,0x14,0.5],
  [0x15,0x16,0.5],[0x17,0x16,0.5],[0x00,0x05,0.5],[0x00,0x08,0],[0x08,0x08,2],
  [0x14,0x07,2],[0x14,0x05,0.5],[0x15,0x04,2],[0x17,0x04,0],[0x17,0x02,2],
  [0x16,0x04,2],[0x16,0x07,0.5],[0x16,0x03,0.5],[0x16,0x05,2],[0x16,0x02,0.5],
  [0x19,0x15,0.5],[0x19,0x16,2],[0x19,0x04,2],[0x19,0x02,2],[0x01,0x00,2],
  [0x01,0x03,0.5],[0x01,0x02,0.5],[0x01,0x18,0.5],[0x01,0x07,0.5],[0x01,0x05,2],
  [0x01,0x19,2],[0x01,0x08,0],[0x03,0x16,2],[0x03,0x03,0.5],[0x03,0x04,0.5],
  [0x03,0x07,2],[0x03,0x05,0.5],[0x03,0x08,0.5],[0x04,0x14,2],[0x04,0x17,2],
  [0x04,0x16,0.5],[0x04,0x07,0.5],[0x04,0x05,2],[0x04,0x03,2],[0x02,0x17,0.5],
  [0x02,0x01,2],[0x02,0x07,2],[0x02,0x16,2],[0x02,0x05,0.5],[0x18,0x01,2],
  [0x18,0x03,2],[0x07,0x14,0.5],[0x07,0x16,2],[0x07,0x01,0.5],[0x07,0x02,0.5],
  [0x07,0x18,2],[0x07,0x08,0.5],[0x07,0x03,2],[0x05,0x14,2],[0x05,0x01,0.5],
  [0x05,0x04,0.5],[0x05,0x02,2],[0x05,0x07,2],[0x05,0x19,2],[0x08,0x00,0],
  [0x08,0x18,0],[0x14,0x1a,0.5],[0x15,0x1a,0.5],[0x17,0x1a,0.5],[0x16,0x1a,0.5],
  [0x19,0x1a,2],[0x1a,0x1a,2],
];

export function getGen1SpeciesName(speciesId: number): string {
  return SPECIES_NAMES[speciesId] || `SPECIES ${speciesId}`;
}

export function getGen1TypeName(typeId: number): string {
  return GEN1_TYPE_NAMES[typeId] || `TYPE ${typeId.toString(16).toUpperCase().padStart(2, "0")}`;
}

export function getGen1SpeciesInfo(speciesId: number): { type1: number; type2: number; catchRate: number; typeNames: [string, string] } | null {
  const info = GEN1_SPECIES_INFO[speciesId];
  if (!info) return null;
  return {
    ...info,
    typeNames: [getGen1TypeName(info.type1), getGen1TypeName(info.type2)],
  };
}

export function getGen1MoveInfo(moveId: number, ppByte = 0): Gen1MoveSlot | null {
  if (moveId <= 0) return null;
  const pp = ppByte & 0x3f;
  const ppUps = ppByte >> 6;
  const typeId = MOVE_TYPE_IDS[moveId] ?? 0;
  return {
    id: moveId,
    name: MOVE_NAMES[moveId] || `MOVE ${moveId}`,
    typeId,
    typeName: getGen1TypeName(typeId),
    power: MOVE_POWER[moveId] ?? 0,
    accuracy: MOVE_ACCURACY[moveId] ?? 0,
    maxPp: MOVE_MAX_PP[moveId] ?? 0,
    pp,
    ppUps,
  };
}

export function decodeGen1Text(bytes: Uint8Array, offset = 0, length = bytes.length - offset, fallback = "???"): string {
  let out = "";
  const end = Math.min(bytes.length, offset + length);

  for (let i = offset; i < end; i++) {
    const b = bytes[i];
    if (b === 0x50) break;
    if (b >= 0x80 && b <= 0x99) out += String.fromCharCode(65 + b - 0x80);
    else if (b >= 0xa0 && b <= 0xb9) out += String.fromCharCode(97 + b - 0xa0);
    else if (b >= 0xf6 && b <= 0xff) out += String.fromCharCode(48 + b - 0xf6);
    else out += CHARMAP[b] ?? "";
  }

  const trimmed = out.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

export function decodeGen1DVs(atkDef: number, speedSpecial: number): Gen1DVs {
  const atk = (atkDef >> 4) & 0x0f;
  const def = atkDef & 0x0f;
  const speed = (speedSpecial >> 4) & 0x0f;
  const special = speedSpecial & 0x0f;
  const hp = ((atk & 1) << 3) | ((def & 1) << 2) | ((speed & 1) << 1) | (special & 1);
  return { hp, atk, def, speed, special };
}

export function parseGen1Status(raw: number): Gen1Status {
  if ((raw & 0x07) !== 0) {
    return { raw, label: "SLP", name: "Sleep", turns: raw & 0x07, catchBonus: 25, shakeBonus: 10 };
  }
  if (raw & 0x08) return { raw, label: "PSN", name: "Poison", catchBonus: 12, shakeBonus: 5 };
  if (raw & 0x10) return { raw, label: "BRN", name: "Burn", catchBonus: 12, shakeBonus: 5 };
  if (raw & 0x20) return { raw, label: "FRZ", name: "Freeze", catchBonus: 25, shakeBonus: 10 };
  if (raw & 0x40) return { raw, label: "PAR", name: "Paralysis", catchBonus: 12, shakeBonus: 5 };
  return { raw, label: "OK", name: "Healthy", catchBonus: 0, shakeBonus: 0 };
}

function readU24BE(dv: DataView, off: number): number {
  return (dv.getUint8(off) << 16) | (dv.getUint8(off + 1) << 8) | dv.getUint8(off + 2);
}

function readStats(dv: DataView, off: number): Omit<Gen1StatBlock, "hp"> {
  return {
    atk: dv.getUint16(off, false),
    def: dv.getUint16(off + 2, false),
    speed: dv.getUint16(off + 4, false),
    special: dv.getUint16(off + 6, false),
  };
}

function parseMoves(dv: DataView, movesOff: number, ppOff: number): Gen1MoveSlot[] {
  const moves: Gen1MoveSlot[] = [];
  for (let i = 0; i < 4; i++) {
    const move = getGen1MoveInfo(dv.getUint8(movesOff + i), dv.getUint8(ppOff + i));
    if (move) moves.push(move);
  }
  return moves;
}

export function parseGen1PartyMon(
  dv: DataView,
  off: number,
  slotIndex = 0,
  nicknameBytes?: Uint8Array,
): Gen1Pokemon | null {
  if (off + 0x2c > dv.byteLength) return null;
  const speciesId = dv.getUint8(off);
  if (speciesId === 0) return null;

  const speciesName = getGen1SpeciesName(speciesId);
  const nickname = nicknameBytes
    ? decodeGen1Text(nicknameBytes, slotIndex * 11, Math.min(11, nicknameBytes.length - slotIndex * 11), speciesName)
    : speciesName;

  const status = parseGen1Status(dv.getUint8(off + 0x04));
  const type1 = dv.getUint8(off + 0x05);
  const type2 = dv.getUint8(off + 0x06);

  return {
    speciesId,
    speciesName,
    nickname,
    level: dv.getUint8(off + 0x21),
    boxLevel: dv.getUint8(off + 0x03),
    hp: dv.getUint16(off + 0x01, false),
    maxhp: dv.getUint16(off + 0x22, false),
    status,
    type1,
    type2,
    typeNames: [getGen1TypeName(type1), getGen1TypeName(type2)],
    catchRate: dv.getUint8(off + 0x07),
    moves: parseMoves(dv, off + 0x08, off + 0x1d),
    otid: dv.getUint16(off + 0x0c, false),
    experience: readU24BE(dv, off + 0x0e),
    statExp: {
      hp: dv.getUint16(off + 0x11, false),
      atk: dv.getUint16(off + 0x13, false),
      def: dv.getUint16(off + 0x15, false),
      speed: dv.getUint16(off + 0x17, false),
      special: dv.getUint16(off + 0x19, false),
    },
    dvs: decodeGen1DVs(dv.getUint8(off + 0x1b), dv.getUint8(off + 0x1c)),
    stats: readStats(dv, off + 0x24),
  };
}

export function parseGen1BattleMon(dv: DataView, off: number): Gen1Pokemon | null {
  if (off + 0x1d > dv.byteLength) return null;
  const speciesId = dv.getUint8(off);
  if (speciesId === 0) return null;

  const speciesName = getGen1SpeciesName(speciesId);
  const type1 = dv.getUint8(off + 0x05);
  const type2 = dv.getUint8(off + 0x06);

  return {
    speciesId,
    speciesName,
    nickname: speciesName,
    level: dv.getUint8(off + 0x0e),
    hp: dv.getUint16(off + 0x01, false),
    maxhp: dv.getUint16(off + 0x0f, false),
    status: parseGen1Status(dv.getUint8(off + 0x04)),
    type1,
    type2,
    typeNames: [getGen1TypeName(type1), getGen1TypeName(type2)],
    catchRate: dv.getUint8(off + 0x07),
    moves: parseMoves(dv, off + 0x08, off + 0x19),
    dvs: decodeGen1DVs(dv.getUint8(off + 0x0c), dv.getUint8(off + 0x0d)),
    stats: readStats(dv, off + 0x11),
  };
}

export function typeEffectiveness(attackType: number, defenderType1: number, defenderType2 = defenderType1): number {
  let mult = 1;
  for (const [atk, def, factor] of TYPE_MATCHUPS) {
    if (atk === attackType && (def === defenderType1 || (defenderType2 !== defenderType1 && def === defenderType2))) {
      mult *= factor;
    }
  }
  return mult;
}

export function decodeDexFlags(bytes: Uint8Array, speciesCount = 151): number[] {
  const seen: number[] = [];
  for (let i = 0; i < speciesCount; i++) {
    if ((bytes[i >> 3] & (1 << (i & 7))) !== 0) seen.push(i + 1);
  }
  return seen;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function shakeCount(z: number): number {
  if (z < 10) return 0;
  if (z < 30) return 1;
  if (z < 70) return 2;
  return 3;
}

function acceptedRand1Count(ball: Gen1CatchInput["ball"]): number {
  if (ball === "great") return 201;
  if (ball === "ultra" || ball === "safari") return 151;
  return 256;
}

export function calcGen1CatchChance(input: Gen1CatchInput): Gen1CatchResult {
  if (input.ball === "master") {
    return {
      chance: 1,
      percent: 100,
      x: 255,
      w: 255,
      y: 255,
      z: 255,
      shakes: 3,
      ballFactor: 1,
      shakeBallFactor: 1,
      statusBonus: parseGen1Status(input.status).shakeBonus,
      captureStatusBonus: parseGen1Status(input.status).catchBonus,
      guaranteed: true,
    };
  }

  const maxHp = Math.max(1, input.maxHp);
  const currentHp = Math.max(1, input.currentHp);
  const catchRate = clamp(input.catchRate, 0, 255);
  const status = parseGen1Status(input.status);
  const ballFactor = input.ball === "great" ? 8 : 12;
  const shakeBallFactor = input.ball === "poke" ? 255 : input.ball === "great" ? 200 : 150;
  const hpQuarter = Math.max(1, Math.floor(currentHp / 4));
  const w = Math.floor(Math.floor(maxHp * 255 / ballFactor) / hpQuarter);
  const x = Math.min(255, w);
  const y = Math.floor(catchRate * 100 / shakeBallFactor);
  const z = clamp(Math.floor((x * y) / 255) + status.shakeBonus, 0, 255);
  const guaranteedByHp = w > 255;

  const acceptedCount = acceptedRand1Count(input.ball);
  const autoStatusCount = clamp(status.catchBonus, 0, acceptedCount);
  const eligibleRand1Count = Math.max(0, clamp(status.catchBonus + catchRate + 1, 0, acceptedCount) - autoStatusCount);
  const rand2Chance = guaranteedByHp ? 1 : (x + 1) / 256;
  const chance = clamp((autoStatusCount / acceptedCount) + (eligibleRand1Count / acceptedCount) * rand2Chance, 0, 1);

  return {
    chance,
    percent: chance * 100,
    x,
    w,
    y,
    z,
    shakes: guaranteedByHp ? 3 : shakeCount(z),
    ballFactor,
    shakeBallFactor,
    statusBonus: status.shakeBonus,
    captureStatusBonus: status.catchBonus,
    guaranteed: chance >= 1,
  };
}
