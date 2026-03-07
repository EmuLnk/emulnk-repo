// ── Phantasy Star IV Combo Codex ──
//
// Reads party state from Genesis Plus GX work RAM and computes
// which combination attacks are currently available.
//
// IMPORTANT — Genesis Plus GX word-swaps its RETRO_MEMORY_SYSTEM_RAM buffer.
// Within each 16-bit word the two bytes are reversed vs the native 68000
// big-endian layout. Consequently:
//   - u8 at an even 68000 offset  → read from the next (odd) buffer offset
//   - u8 at an odd  68000 offset  → read from the previous (even) buffer offset
//   - u16 values                  → read as LITTLE-ENDIAN, not big-endian
// This applies to all Genesis games on this core.
//
// Addresses verified against PStarSaveEditor, GameHacking.org PAR codes,
// and Genecyst save-state format specification.

// ── Character Names ──

var CHAR_NAMES = {
    0:'Chaz', 1:'Alys', 2:'Hahn', 3:'Rune', 4:'Gryz',
    5:'Rika', 6:'Demi', 7:'Wren', 8:'Raja', 9:'Kyra', 10:'Seth'
};

// ── Learn Table (combo-relevant abilities only) ──
// techs/skills: learned at the listed level
// storySkills: acquired via story events; level is a proxy threshold
// Sources: PSCave Chronology, Phantasy Star Wiki, FantasyAnime

var LEARN_TABLE = {
    0: { // Chaz
        techs:  { Tsu:4, Zan:12, Gizan:23, Nazan:37 },
        skills: { Crosscut:6, Airslash:13, Rayblade:27 },
        storySkills: { Megid:38 }
    },
    1: { // Alys
        techs:  { Foi:1, Zan:8, Gifoi:14, Gizan:18, Nafoi:22, Nazan:27 },
        skills: { Death:13 },
        storySkills: {}
    },
    2: { // Hahn
        techs:  { Wat:3, Zan:9, Giwat:16, Gizan:21, Nawat:28, Nazan:37 },
        skills: { Astral:29 },
        storySkills: { SaVol:33 }
    },
    3: { // Rune
        techs:  { Foi:1, Wat:1, Gra:1, Giwat:18, Gifoi:19,
                  Gigra:23, Nafoi:25, Nawat:26, Nagra:30 },
        skills: { Flaeli:1, Hewn:1, Diem:24, Tandle:27,
                  Efess:29, Negatis:32, Legeon:35 },
        storySkills: {}
    },
    4: { // Gryz
        techs: {}, skills: {}, storySkills: {}
    },
    5: { // Rika
        techs:  { Deban:14 },
        skills: { Illusion:1 },
        storySkills: {}
    },
    6: { // Demi
        techs: {}, skills: {},
        storySkills: { Phonomezer:24 }
    },
    7: { // Wren
        techs: {}, skills: {},
        storySkills: { Hijammer:28, 'Burst Rockets':32, 'Positron Bolt':36 }
    },
    8: { // Raja
        techs: {},
        skills: { 'Holy Word':1 },
        storySkills: {}
    },
    9: { // Kyra
        techs:  { Foi:1, Gifoi:1, Gra:1, Gigra:30, Nafoi:33, Nagra:40 },
        skills: { Flaeli:1, Hewn:1, Tandle:39 },
        storySkills: {}
    },
    10: { // Seth
        techs: {},
        skills: { Death:1 },
        storySkills: {}
    }
};

// ── Combo Table ──
// ability: pipe-separated alternatives (any one satisfies the component)
// chars:   character IDs that can cast this component

var COMBO_TABLE = [
    {
        name: 'Fire Storm', element: 'fire',
        description: 'Wind feeds flames into an inferno.',
        components: [
            { ability: 'Foi|Gifoi|Nafoi|Flaeli', chars: [1, 3, 9] },
            { ability: 'Zan|Gizan|Nazan|Hewn',   chars: [0, 1, 2, 3, 9] }
        ]
    },
    {
        name: 'Blizzard', element: 'ice',
        description: 'Wind whips water into a freezing storm.',
        components: [
            { ability: 'Wat|Giwat|Nawat',       chars: [2, 3] },
            { ability: 'Zan|Gizan|Nazan|Hewn',   chars: [0, 1, 2, 3, 9] }
        ]
    },
    {
        name: 'Tri-Blaster', element: 'multi',
        description: 'Fire, wind, and water collide. Base-tier only.',
        components: [
            { ability: 'Foi', chars: [1, 3, 9] },
            { ability: 'Tsu', chars: [0] },
            { ability: 'Wat', chars: [2, 3] }
        ]
    },
    {
        name: 'Conduct Thunder', element: 'lightning',
        description: 'Electrified water conducts massive lightning.',
        components: [
            { ability: 'Wat|Giwat|Nawat', chars: [2, 3] },
            { ability: 'Tandle',           chars: [3, 9] }
        ]
    },
    {
        name: 'Circuit Break', element: 'lightning',
        description: 'Hijammer channels Tandle\'s lightning.',
        components: [
            { ability: 'Hijammer', chars: [7] },
            { ability: 'Tandle',   chars: [3, 9] }
        ]
    },
    {
        name: 'Shooting Star', element: 'fire',
        description: 'Rockets ignite into a barrage of fire.',
        components: [
            { ability: 'Burst Rockets',          chars: [7] },
            { ability: 'Foi|Gifoi|Nafoi|Flaeli', chars: [1, 3, 9] }
        ]
    },
    {
        name: 'Silent Wave', element: 'physical',
        description: 'Sound disruption silences all enemies.',
        components: [
            { ability: 'Phonomezer', chars: [6] },
            { ability: 'Airslash',   chars: [0] }
        ]
    },
    {
        name: 'Grand Cross', element: 'holy',
        description: 'Holy light channeled through steel. One of the strongest combos.',
        components: [
            { ability: 'Efess',    chars: [3] },
            { ability: 'Crosscut', chars: [0] }
        ]
    },
    {
        name: 'Paladin Blow', element: 'holy',
        description: 'Astral power focused through a light blade.',
        components: [
            { ability: 'Astral',   chars: [2] },
            { ability: 'Rayblade', chars: [0] }
        ]
    },
    {
        name: 'Purify Light', element: 'holy',
        description: 'Sacred radiance purges darkness.',
        components: [
            { ability: 'Holy Word', chars: [8] },
            { ability: 'Efess',     chars: [3] }
        ]
    },
    {
        name: 'Lethal Image', element: 'dark',
        description: 'A deadly illusion. Instant kill.',
        components: [
            { ability: 'Death',    chars: [1] },
            { ability: 'Illusion', chars: [5] }
        ]
    },
    {
        name: 'Holocaust', element: 'dark',
        description: 'Soul separation followed by death.',
        components: [
            { ability: 'SaVol', chars: [2] },
            { ability: 'Diem',  chars: [3] }
        ]
    },
    {
        name: 'Black Hole', element: 'dark',
        description: 'Gravity collapsed into a void.',
        components: [
            { ability: 'Negatis',         chars: [3] },
            { ability: 'Gra|Gigra|Nagra', chars: [3, 9] }
        ]
    },
    {
        name: 'Destruction', element: 'multi',
        description: 'The ultimate combo. Four participants required.',
        components: [
            { ability: 'Deban',         chars: [5] },
            { ability: 'Megid',         chars: [0] },
            { ability: 'Legeon',        chars: [3] },
            { ability: 'Positron Bolt', chars: [7] }
        ]
    }
];

// ── Element Colors ──

var ELEMENT_CONFIG = {
    fire:      { label: 'fire',      color: '#ff6a00' },
    ice:       { label: 'ice',       color: '#00d4ff' },
    lightning: { label: 'lightning',  color: '#ffe040' },
    holy:      { label: 'holy',      color: '#ffd700' },
    dark:      { label: 'dark',      color: '#a040ff' },
    physical:  { label: 'physical',  color: '#c8dce8' },
    multi:     { label: 'multi',     color: '#00d4ff' }
};

// ── State ──

var partySlots = [0xFF, 0xFF, 0xFF, 0xFF, 0xFF];
var charData = {};
var settings = { show_locked: true, show_party: true };
var expandedCards = {};

// ── DOM Helpers ──

function el(tag, className, text) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (text != null) e.textContent = text;
    return e;
}

function clearChildren(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
}

// ── Ability Logic ──

function getKnownAbilities(charId, level) {
    var table = LEARN_TABLE[charId];
    if (!table) return {};
    var known = {};
    var sources = [table.techs, table.skills, table.storySkills];
    for (var s = 0; s < sources.length; s++) {
        var src = sources[s];
        if (!src) continue;
        for (var ability in src) {
            if (src.hasOwnProperty(ability) && level >= src[ability]) {
                known[ability] = src[ability];
            }
        }
    }
    return known;
}

function getLearnLevel(charId, abilityName) {
    var table = LEARN_TABLE[charId];
    if (!table) return null;
    var sources = [table.techs, table.skills, table.storySkills];
    for (var s = 0; s < sources.length; s++) {
        if (sources[s] && sources[s][abilityName] !== undefined) {
            return sources[s][abilityName];
        }
    }
    return null;
}

function isStorySkill(charId, abilityName) {
    var table = LEARN_TABLE[charId];
    return !!(table && table.storySkills && table.storySkills[abilityName] !== undefined);
}

// ── Combo Evaluation ──
// Backtracking search for a valid assignment of unique party members
// to combo components (bipartite matching).

function evaluateCombo(combo, activeParty, partyAbilities) {
    var components = combo.components;
    var n = components.length;

    var candidates = [];
    for (var c = 0; c < n; c++) {
        var comp = components[c];
        var alts = comp.ability.split('|');
        var possible = [];
        for (var p = 0; p < activeParty.length; p++) {
            var charId = activeParty[p];
            if (comp.chars.indexOf(charId) === -1) continue;
            var known = partyAbilities[charId];
            if (!known) continue;
            for (var a = 0; a < alts.length; a++) {
                if (known[alts[a]] !== undefined) {
                    possible.push({ charId: charId, ability: alts[a], learnLevel: known[alts[a]] });
                    break;
                }
            }
        }
        candidates.push(possible);
    }

    var assignment = new Array(n);
    var used = {};

    function solve(idx) {
        if (idx === n) return true;
        for (var i = 0; i < candidates[idx].length; i++) {
            var cand = candidates[idx][i];
            if (used[cand.charId]) continue;
            assignment[idx] = cand;
            used[cand.charId] = true;
            if (solve(idx + 1)) return true;
            delete used[cand.charId];
        }
        return false;
    }

    var available = solve(0);

    var missing = [];
    if (!available) {
        for (var c = 0; c < n; c++) {
            if (candidates[c].length > 0) continue;
            var comp = components[c];
            var alts = comp.ability.split('|');
            var bestNeed = null;

            for (var ci = 0; ci < comp.chars.length; ci++) {
                var cid = comp.chars[ci];
                if (activeParty.indexOf(cid) === -1) continue;
                for (var ai = 0; ai < alts.length; ai++) {
                    var lv = getLearnLevel(cid, alts[ai]);
                    if (lv !== null && (!bestNeed || lv < bestNeed.level)) {
                        bestNeed = {
                            type: 'level', charId: cid, ability: alts[ai],
                            level: lv, isStory: isStorySkill(cid, alts[ai])
                        };
                    }
                }
            }

            if (bestNeed) {
                missing.push(bestNeed);
            } else {
                missing.push({ type: 'party', ability: alts[0], chars: comp.chars });
            }
        }
    }

    return { available: available, assignment: available ? assignment : null, missing: missing };
}

function computeCombos(activeParty, partyAbilities) {
    var avail = [];
    var locked = [];
    for (var i = 0; i < COMBO_TABLE.length; i++) {
        var combo = COMBO_TABLE[i];
        var result = evaluateCombo(combo, activeParty, partyAbilities);
        if (result.available) {
            avail.push({ combo: combo, details: result });
        } else {
            locked.push({ combo: combo, details: result });
        }
    }
    return { available: avail, locked: locked };
}

// ── Data Parsing ──

function decodeBlob(base64) {
    var bin = atob(base64);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new DataView(bytes.buffer);
}

// Character block: 128 bytes (0x80) per character, 11 characters total.
// Genesis Plus GX word-swaps the buffer — read u16 as little-endian.
//
// Offset  Field       Type
// +0x00   Level       u8
// +0x06   Current HP  u16 LE
// +0x08   Max HP      u16 LE
// +0x0A   Current TP  u16 LE
// +0x0C   Max TP      u16 LE
function parseCharBlock(dv, charIndex) {
    var off = charIndex * 0x80;
    if (off + 0x0E > dv.byteLength) return null;
    return {
        level: dv.getUint8(off + 0x00),
        hp:    dv.getUint16(off + 0x06, true),
        maxHp: dv.getUint16(off + 0x08, true),
        tp:    dv.getUint16(off + 0x0A, true),
        maxTp: dv.getUint16(off + 0x0C, true)
    };
}

function processData(v) {
    var slotsRaw = v.party_slots;
    if (!slotsRaw) return;
    var slotsDv = decodeBlob(slotsRaw);

    var newSlots = [];
    for (var i = 0; i < 5; i++) {
        newSlots.push(i < slotsDv.byteLength ? slotsDv.getUint8(i) : 0xFF);
    }

    var charsRaw = v.all_chars;
    if (!charsRaw) return;
    var charsDv = decodeBlob(charsRaw);

    var activeParty = [];
    var newCharData = {};
    for (var i = 0; i < 5; i++) {
        var cid = newSlots[i];
        if (cid === 0xFF || cid > 10) continue;
        activeParty.push(cid);
        var parsed = parseCharBlock(charsDv, cid);
        if (parsed) {
            newCharData[cid] = parsed;
        }
    }

    if (activeParty.length === 0) {
        var hadData = false;
        for (var i = 0; i < 5; i++) {
            if (partySlots[i] !== 0xFF) { hadData = true; break; }
        }
        if (hadData) return;
    }

    partySlots = newSlots;
    charData = newCharData;
}

// ── Rendering ──

function getHpColor(pct) {
    if (pct > 0.5) return 'var(--hp-full)';
    if (pct > 0.25) return 'var(--hp-mid)';
    return 'var(--hp-low)';
}

function buildPartySlot(cid) {
    var slot = el('div', 'party-slot');
    var data = charData[cid];
    var name = CHAR_NAMES[cid] || '???';
    var level = data ? data.level : 0;
    var hpPct = data && data.maxHp > 0 ? (data.hp / data.maxHp * 100) : 0;
    var tpPct = data && data.maxTp > 0 ? (data.tp / data.maxTp * 100) : 0;

    slot.appendChild(el('div', 'slot-name', name.toUpperCase()));
    slot.appendChild(el('div', 'slot-level', 'Lv' + level));

    var hpText = data ? (data.hp + '/' + data.maxHp) : '?';
    var tpText = data ? (data.tp + '/' + data.maxTp) : '?';
    slot.appendChild(el('div', 'slot-hp-text', 'HP ' + hpText));
    slot.appendChild(el('div', 'slot-tp-text', 'TP ' + tpText));

    var bars = el('div', 'slot-bars');

    var hpBar = el('div', 'mini-bar hp-bar');
    var hpFill = el('div', 'mini-fill');
    hpFill.style.width = hpPct.toFixed(0) + '%';
    hpFill.style.background = getHpColor(hpPct / 100);
    hpBar.appendChild(hpFill);
    bars.appendChild(hpBar);

    var tpBar = el('div', 'mini-bar tp-bar');
    var tpFill = el('div', 'mini-fill');
    tpFill.style.width = tpPct.toFixed(0) + '%';
    tpBar.appendChild(tpFill);
    bars.appendChild(tpBar);

    slot.appendChild(bars);
    return slot;
}

function renderPartyBar() {
    var bar = document.getElementById('party-bar');
    clearChildren(bar);
    bar.style.display = settings.show_party ? 'flex' : 'none';

    for (var i = 0; i < 5; i++) {
        if (partySlots[i] === 0xFF || partySlots[i] > 10) continue;
        bar.appendChild(buildPartySlot(partySlots[i]));
    }
}

function renderComboCard(combo, isAvailable, details) {
    var elemCfg = ELEMENT_CONFIG[combo.element] || ELEMENT_CONFIG.physical;
    var expanded = !!expandedCards[combo.name];
    var card = el('div', 'combo-card ' + combo.element + (isAvailable ? ' available' : ' locked'));
    card.style.borderLeftColor = elemCfg.color;

    var header = el('div', 'card-header');
    header.appendChild(el('span', 'card-name', combo.name.toUpperCase()));
    var elemBadge = el('span', 'card-element', elemCfg.label);
    elemBadge.style.color = elemCfg.color;
    header.appendChild(elemBadge);
    card.appendChild(header);

    if (isAvailable && details.assignment) {
        var summaryParts = [];
        for (var i = 0; i < details.assignment.length; i++) {
            var a = details.assignment[i];
            summaryParts.push(a.ability + ' (' + CHAR_NAMES[a.charId] + ')');
        }
        card.appendChild(el('div', 'card-summary', summaryParts.join(' + ')));
    } else {
        var msgParts = [];
        if (details.missing) {
            for (var i = 0; i < details.missing.length; i++) {
                var m = details.missing[i];
                if (m.type === 'level') {
                    var prefix = m.isStory ? '~' : '';
                    msgParts.push(m.ability + ' (' + CHAR_NAMES[m.charId] + ' ' + prefix + 'Lv' + m.level + ')');
                } else {
                    var names = [];
                    for (var j = 0; j < m.chars.length; j++) {
                        names.push(CHAR_NAMES[m.chars[j]]);
                    }
                    msgParts.push('Needs ' + names.join('/') + ' in party');
                }
            }
        }
        if (msgParts.length > 0) {
            card.appendChild(el('div', 'card-missing', 'Needs: ' + msgParts.join(', ')));
        }
    }

    if (expanded) {
        var detail = el('div', 'card-detail');
        for (var i = 0; i < combo.components.length; i++) {
            var comp = combo.components[i];
            var lineText;
            if (isAvailable && details.assignment && details.assignment[i]) {
                var a = details.assignment[i];
                var lv = getLearnLevel(a.charId, a.ability);
                var suffix = isStorySkill(a.charId, a.ability)
                    ? ' (story ~Lv' + lv + ')'
                    : ' (learned Lv' + lv + ')';
                lineText = '\u25B8 ' + a.ability + ' \u2192 ' + CHAR_NAMES[a.charId] + suffix;
            } else {
                var alts = comp.ability.split('|');
                var charNames = [];
                for (var j = 0; j < comp.chars.length; j++) {
                    charNames.push(CHAR_NAMES[comp.chars[j]]);
                }
                lineText = '\u25B8 ' + alts[0] +
                    (alts.length > 1 ? ' (+variants)' : '') +
                    ' \u2192 ' + charNames.join('/');
            }
            detail.appendChild(el('div', 'detail-line', lineText));
        }
        detail.appendChild(el('div', 'card-description', combo.description));
        card.appendChild(detail);
    }

    card.addEventListener('click', function() {
        expandedCards[combo.name] = !expandedCards[combo.name];
        render();
    });

    return card;
}

function render() {
    var activeParty = [];
    var partyAbilities = {};
    for (var i = 0; i < 5; i++) {
        var cid = partySlots[i];
        if (cid === 0xFF || cid > 10) continue;
        activeParty.push(cid);
        var level = charData[cid] ? charData[cid].level : 0;
        partyAbilities[cid] = getKnownAbilities(cid, level);
    }

    var result = computeCombos(activeParty, partyAbilities);
    renderPartyBar();

    var availList = document.getElementById('available-list');
    clearChildren(availList);
    document.getElementById('available-count').textContent = String(result.available.length);

    if (result.available.length === 0) {
        var msg = activeParty.length === 0
            ? 'Waiting for party data\u2026'
            : 'No combos available with current party';
        availList.appendChild(el('div', 'empty-message', msg));
    } else {
        for (var i = 0; i < result.available.length; i++) {
            var entry = result.available[i];
            availList.appendChild(renderComboCard(entry.combo, true, entry.details));
        }
    }

    var lockedSection = document.getElementById('locked-section');
    lockedSection.style.display = settings.show_locked ? 'block' : 'none';

    var lockedList = document.getElementById('locked-list');
    clearChildren(lockedList);

    var partyLocked = [];
    for (var i = 0; i < result.locked.length; i++) {
        var entry = result.locked[i];
        var needsAbsent = false;
        if (entry.details.missing) {
            for (var j = 0; j < entry.details.missing.length; j++) {
                if (entry.details.missing[j].type === 'party') {
                    needsAbsent = true;
                    break;
                }
            }
        }
        if (!needsAbsent) partyLocked.push(entry);
    }

    document.getElementById('locked-count').textContent = String(partyLocked.length);

    for (var i = 0; i < partyLocked.length; i++) {
        lockedList.appendChild(renderComboCard(partyLocked[i].combo, false, partyLocked[i].details));
    }
}

// ── EmuLnk Entry Points ──

function updateData(base64Data, isInitial) {
    try {
        var json = JSON.parse(atob(base64Data));
        var v = json.values || {};

        if (json.settings) {
            settings.show_locked = json.settings.show_locked !== 'false';
            settings.show_party = json.settings.show_party !== 'false';
        }

        var connected = !!json.isConnected;
        document.body.classList.toggle('offline', !connected);
        document.getElementById('status-dot').className =
            'status-dot' + (connected ? ' connected' : '');
        document.getElementById('status').textContent =
            connected ? 'Connected' : 'Offline';

        processData(v);
        render();
    } catch (e) {
        document.getElementById('status').textContent = 'Error: ' + e.message;
    }
}

function onGameClosed() {
    document.body.classList.add('offline');
    document.getElementById('status-dot').className = 'status-dot';
    document.getElementById('status').textContent = 'Game closed';
    partySlots = [0xFF, 0xFF, 0xFF, 0xFF, 0xFF];
    charData = {};
    render();
}

// ── Init ──

document.getElementById('locked-header').addEventListener('click', function() {
    var list = document.getElementById('locked-list');
    var arrow = document.getElementById('locked-toggle');
    var isHidden = list.style.display === 'none';
    list.style.display = isHidden ? '' : 'none';
    arrow.textContent = isHidden ? '\u25BC' : '\u25B6';
});
