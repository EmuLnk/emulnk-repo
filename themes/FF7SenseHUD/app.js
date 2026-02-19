var MAX_ENEMIES = 6;

var CHAR_NAMES = {
    0:'Cloud', 1:'Barret', 2:'Tifa', 3:'Aerith',
    4:'Red XIII', 5:'Yuffie', 6:'Cait Sith', 7:'Vincent', 8:'Cid'
};

var ELEMENTS = ['Fire','Ice','Lightning','Earth','Poison','Gravity','Water','Wind','Holy'];

// Scene element rate bytes (ffrtt.ru/FF7/Battle/Elemental_Data)
var ELEM_DEATH  = 0x00;
var ELEM_WEAK   = 0x02;
var ELEM_HALF   = 0x04;
var ELEM_NULL   = 0x05;
var ELEM_ABSORB = 0x06;

// Scene immunity mask (inverted: 0 = immune, 1 = vulnerable)
// Upper 16 bits: 16-20 = Barrier/MBarrier/Reflect/Dual/Shield, shifting others
var STATUS_FLAGS = [
    [0x00000001, 'Death'],
    [0x00000004, 'Sleep'],
    [0x00000008, 'Poison'],
    [0x00000040, 'Confusion'],
    [0x00000080, 'Silence'],
    [0x00000200, 'Slow'],
    [0x00000400, 'Stop'],
    [0x00000800, 'Frog'],
    [0x00001000, 'Small'],
    [0x00002000, 'Slow-Numb'],
    [0x00004000, 'Petrify'],
    [0x00200000, 'Doom'],
    [0x00400000, 'Manipulate'],
    [0x00800000, 'Berserk'],
    [0x02000000, 'Paralysis'],
    [0x04000000, 'Darkness']
];

var ITEMS = {
    0:'Potion', 1:'Hi-Potion', 2:'X-Potion', 3:'Ether', 4:'Turbo Ether',
    5:'Elixir', 6:'Megalixir', 7:'Phoenix Down', 8:'Antidote', 9:'Soft',
    10:'Maiden\'s Kiss', 11:'Cornucopia', 12:'Echo Screen', 13:'Hyper',
    14:'Tranquilizer', 15:'Remedy', 16:'Smoke Bomb', 17:'Speed Drink',
    18:'Hero Drink', 19:'Vaccine', 20:'Grenade', 21:'Shrapnel',
    22:'Right Arm', 23:'Hourglass', 24:'Kiss of Death', 25:'Spider Web',
    26:'Dream Powder', 27:'Mute Mask', 28:'War Gong', 29:'Loco Weed',
    30:'Fire Fang', 31:'Fire Veil', 32:'Antarctic Wind', 33:'Ice Crystal',
    34:'Bolt Plume', 35:'Swift Bolt', 36:'Earth Drum', 37:'Earth Mallet',
    38:'Deadly Waste', 39:'M-Tentacles', 40:'Stardust', 41:'Vampire Fang',
    42:'Ghost Hand', 43:'Dazers', 44:'Dragon Scales', 45:'Impaler',
    46:'Shrivel', 47:'Eye Drop', 48:'Molotov', 49:'S-Mine',
    50:'T/S Bomb', 51:'Ink', 52:'Tent', 53:'Power Source',
    54:'Guard Source', 55:'Magic Source', 56:'Mind Source', 57:'Speed Source',
    58:'Luck Source', 59:'Zeio Nut', 60:'Carob Nut',
    72:'Graviball', 73:'Light Curtain', 74:'Lunar Curtain',
    75:'Mirror', 76:'Holy Torch', 77:'Bird Wing', 78:'Dragon Fang',
    79:'Cauldron', 80:'Sylkis Greens',
    96:'Gravity Materia', 97:'Destruct Materia',
    128:'Hardedge', 160:'Diamond Bangle', 176:'Fairy Ring',
    192:'Steal Materia', 193:'Sense Materia',
    255:'Nothing'
};

var battleCards = {};
var lastEnemySlots = [];

function el(tag, className, text) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (text != null) e.textContent = text;
    return e;
}

function span(className, text) { return el('span', className, text); }

function decodeBlob(base64Blob) {
    var bin = atob(base64Blob);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new DataView(bytes.buffer);
}

// FF7 text: each byte is ASCII + 0x20 offset, 0xFF = terminator
function decodeFFText(dv, offset, maxLen) {
    var result = '';
    for (var i = 0; i < maxLen; i++) {
        var b = dv.getUint8(offset + i);
        if (b === 0xFF) break;
        result += String.fromCharCode(b + 0x20);
    }
    return result.trim();
}

function parseSceneElements(dv, off) {
    var death = [], absorbed = [], nulled = [], halved = [], weak = [];
    for (var i = 0; i < 8; i++) {
        var elemIdx = dv.getUint8(off + 0x28 + i);
        if (elemIdx === 0xFF || elemIdx >= ELEMENTS.length) continue;
        var rate = dv.getUint8(off + 0x30 + i);
        var name = ELEMENTS[elemIdx];
        if (rate === ELEM_DEATH) death.push(name);
        else if (rate === ELEM_ABSORB) absorbed.push(name);
        else if (rate === ELEM_NULL) nulled.push(name);
        else if (rate === ELEM_HALF) halved.push(name);
        else if (rate === ELEM_WEAK) weak.push(name);
    }
    return { death: death, absorbed: absorbed, nulled: nulled, halved: halved, weak: weak };
}

function decodeStatusImmunities(bitmask) {
    var result = [];
    for (var i = 0; i < STATUS_FLAGS.length; i++) {
        if (!(bitmask & STATUS_FLAGS[i][0])) result.push(STATUS_FLAGS[i][1]);
    }
    return result;
}

function getHpColor(pct) {
    if (pct > 0.5) return 'var(--hp-full)';
    if (pct > 0.25) return 'var(--hp-mid)';
    return 'var(--hp-low)';
}

function getCharFromSave(base64Blob, charIdx) {
    var dv = decodeBlob(base64Blob);
    var off = charIdx * 0x84;
    var maxHp = dv.getUint16(off + 0x38, true);
    var maxMp = dv.getUint16(off + 0x3A, true);
    if (!maxHp) maxHp = dv.getUint16(off + 0x2E, true);
    if (!maxMp) maxMp = dv.getUint16(off + 0x32, true);
    return {
        level:  dv.getUint8(off + 0x01),
        hp:     dv.getUint16(off + 0x2C, true),
        maxHp:  maxHp,
        mp:     dv.getUint16(off + 0x30, true),
        maxMp:  maxMp
    };
}

// Scene data: 3 x 0xB8 byte enemy type records with all static stats
// DEF/MDEF stored as half-values in RAM, multiply by 2
function getSceneEnemies(base64Blob) {
    if (!base64Blob) return [];
    var dv = decodeBlob(base64Blob);
    var types = [];
    for (var t = 0; t < 3; t++) {
        var off = t * 0xB8;
        if (off + 0xB8 > dv.byteLength) break;
        var name = decodeFFText(dv, off, 32);
        if (!name) { types.push(null); continue; }

        types.push({
            name:       name,
            level:      dv.getUint8(off + 0x20),
            physAtk:    dv.getUint8(off + 0x24),
            physDef:    dv.getUint8(off + 0x25) * 2,
            magAtk:     dv.getUint8(off + 0x26),
            magDef:     dv.getUint8(off + 0x27) * 2,
            elements:   parseSceneElements(dv, off),
            statusImm:  dv.getUint32(off + 0xB0, true),
            stealItem1: dv.getUint16(off + 0x90, true),
            mp:         dv.getUint16(off + 0x9C, true),
            ap:         dv.getUint16(off + 0x9E, true),
            hp:         dv.getUint32(off + 0xA4, true),
            exp:        dv.getUint32(off + 0xA8, true),
            gil:        dv.getUint32(off + 0xAC, true)
        });
    }
    return types;
}

// Battle actor blob (104 bytes) — runtime HP/MP only
function parseEnemy(base64Blob) {
    var dv = decodeBlob(base64Blob);
    var maxHp = dv.getUint32(0x30, true);
    if (maxHp === 0) return null;
    return {
        sceneType:  dv.getUint8(0x08),
        level:      dv.getUint8(0x09),
        mp:         dv.getUint16(0x28, true),
        maxMp:      dv.getUint16(0x2A, true),
        hp:         dv.getUint32(0x2C, true),
        maxHp:      maxHp
    };
}

function getEnemyType(actor, sceneTypes) {
    if (!sceneTypes || sceneTypes.length === 0) return null;
    if (actor.sceneType < sceneTypes.length) return sceneTypes[actor.sceneType];
    return sceneTypes[0];
}

function isValidEnemy(base64Blob) {
    if (!base64Blob) return false;
    try {
        var dv = decodeBlob(base64Blob);
        var maxHp = dv.getUint32(0x30, true);
        var level = dv.getUint8(0x09);
        return maxHp > 0 && maxHp < 1000000 && level <= 99;
    } catch (e) {
        return false;
    }
}

function createBarRow(label, labelClass, barClass) {
    var row = el('div', 'bar-row');
    row.appendChild(span('bar-label ' + labelClass, label));
    var bg = el('div', 'bar-bg');
    var fill = el('div', 'bar-fill' + (barClass ? ' ' + barClass : ''));
    bg.appendChild(fill);
    row.appendChild(bg);
    var text = span('bar-text', '\u2014');
    row.appendChild(text);
    return { row: row, fill: fill, text: text };
}

function labelValue(labelText, valueText, valueClass) {
    var wrapper = el('span');
    wrapper.appendChild(span('label', labelText));
    wrapper.appendChild(span('value' + (valueClass ? ' ' + valueClass : ''), valueText));
    return wrapper;
}

function createGridCard(slotIdx) {
    var card = el('div', 'grid-card');

    var header = el('div', 'grid-header');
    var nameEl = span('grid-name', '\u2014');
    var levelEl = span('grid-level', 'Lv.\u2014');
    header.appendChild(nameEl);
    header.appendChild(levelEl);
    card.appendChild(header);

    var hp = createBarRow('HP', 'hp', null);
    card.appendChild(hp.row);

    var mp = createBarRow('MP', 'mp', 'mp');
    card.appendChild(mp.row);

    var elemRow = el('div', 'elem-row');
    card.appendChild(elemRow);

    var statusRow = el('div', 'status-row');
    card.appendChild(statusRow);

    var defRow = el('div', 'def-row');
    var defVal = labelValue('DEF: ', '\u2014');
    var mdefVal = labelValue('MDEF: ', '\u2014');
    var atkVal = labelValue('ATK: ', '\u2014');
    var matkVal = labelValue('MATK: ', '\u2014');
    defRow.appendChild(defVal);
    defRow.appendChild(mdefVal);
    defRow.appendChild(atkVal);
    defRow.appendChild(matkVal);
    card.appendChild(defRow);

    var stealRow = el('div', 'steal-row');
    var stealVal = labelValue('Steal: ', '\u2014');
    stealRow.appendChild(stealVal);
    card.appendChild(stealRow);

    var rewardsRow = el('div', 'rewards-row');
    var expVal = labelValue('EXP: ', '\u2014');
    var gilVal = labelValue('Gil: ', '\u2014', 'gil-val');
    var apVal = labelValue('AP: ', '\u2014');
    rewardsRow.appendChild(expVal);
    rewardsRow.appendChild(gilVal);
    rewardsRow.appendChild(apVal);
    card.appendChild(rewardsRow);

    battleCards[slotIdx] = {
        card: card,
        nameEl: nameEl,
        levelEl: levelEl,
        hpFill: hp.fill,
        hpText: hp.text,
        mpFill: mp.fill,
        mpText: mp.text,
        elemRow: elemRow,
        statusRow: statusRow,
        defVal: defVal.querySelector('.value'),
        mdefVal: mdefVal.querySelector('.value'),
        atkVal: atkVal.querySelector('.value'),
        matkVal: matkVal.querySelector('.value'),
        stealVal: stealVal.querySelector('.value'),
        expVal: expVal.querySelector('.value'),
        gilVal: gilVal.querySelector('.value'),
        apVal: apVal.querySelector('.value'),
        tagsPopulated: false
    };

    return card;
}

function populateCardTags(slotIdx, typeData) {
    var cache = battleCards[slotIdx];
    if (!cache || cache.tagsPopulated || !typeData) return;

    var elems = typeData.elements;
    var elemRow = cache.elemRow;
    for (var i = 0; i < elems.death.length; i++)
        elemRow.appendChild(span('elem-tag death', elems.death[i]));
    for (var i = 0; i < elems.weak.length; i++)
        elemRow.appendChild(span('elem-tag weak', elems.weak[i]));
    for (var i = 0; i < elems.halved.length; i++)
        elemRow.appendChild(span('elem-tag half', elems.halved[i]));
    for (var i = 0; i < elems.nulled.length; i++)
        elemRow.appendChild(span('elem-tag null', elems.nulled[i]));
    for (var i = 0; i < elems.absorbed.length; i++)
        elemRow.appendChild(span('elem-tag absorb', elems.absorbed[i]));
    if (elems.death.length === 0 && elems.weak.length === 0 && elems.halved.length === 0 && elems.nulled.length === 0 && elems.absorbed.length === 0) {
        elemRow.style.display = 'none';
    }

    var immunities = decodeStatusImmunities(typeData.statusImm);
    var statusRow = cache.statusRow;
    if (immunities.length > 0) {
        statusRow.appendChild(span('elem-label', 'Immune:'));
        for (var i = 0; i < immunities.length; i++)
            statusRow.appendChild(span('status-tag', immunities[i]));
    } else {
        statusRow.style.display = 'none';
    }

    cache.tagsPopulated = true;
}

function updateGridCard(slotIdx, actor, typeData) {
    var cache = battleCards[slotIdx];
    if (!cache) return;

    cache.nameEl.textContent = typeData ? typeData.name : ('Enemy ' + slotIdx);
    cache.levelEl.textContent = 'Lv.' + actor.level;

    var hpPct = actor.maxHp > 0 ? actor.hp / actor.maxHp : 0;
    cache.hpFill.style.width = (hpPct * 100).toFixed(1) + '%';
    cache.hpFill.style.backgroundColor = getHpColor(hpPct);
    cache.hpText.textContent = actor.hp.toLocaleString() + ' / ' + actor.maxHp.toLocaleString();

    var mpPct = actor.maxMp > 0 ? actor.mp / actor.maxMp : 0;
    cache.mpFill.style.width = (mpPct * 100).toFixed(1) + '%';
    cache.mpText.textContent = actor.mp.toLocaleString() + ' / ' + actor.maxMp.toLocaleString();

    populateCardTags(slotIdx, typeData);

    if (typeData) {
        cache.defVal.textContent = String(typeData.physDef);
        cache.mdefVal.textContent = String(typeData.magDef);
        cache.atkVal.textContent = String(typeData.physAtk);
        cache.matkVal.textContent = String(typeData.magAtk);

        var stealName = '\u2014';
        if (typeData.stealItem1 !== 0xFFFF && typeData.stealItem1 !== 0) {
            stealName = ITEMS[typeData.stealItem1] || ('Item #' + typeData.stealItem1);
        }
        cache.stealVal.textContent = stealName;

        cache.expVal.textContent = typeData.exp.toLocaleString();
        cache.gilVal.textContent = typeData.gil.toLocaleString();
        cache.apVal.textContent = typeData.ap.toLocaleString();
    }
}

function showBattleView(v) {
    var container = document.getElementById('battle-view');
    container.style.display = 'flex';
    document.getElementById('party-view').style.display = 'none';
    document.getElementById('mode-badge').textContent = 'BATTLE';

    var sceneTypes = getSceneEnemies(v.scene_enemy_data);

    var activeSlots = [];
    for (var i = 1; i <= MAX_ENEMIES; i++) {
        var blob = v['enemy' + i + '_data'];
        if (!blob) continue;
        try {
            var enemy = parseEnemy(blob);
            if (enemy) activeSlots.push(i);
        } catch (e) {}
    }

    var changed = activeSlots.length !== lastEnemySlots.length;
    if (!changed) {
        for (var i = 0; i < activeSlots.length; i++) {
            if (activeSlots[i] !== lastEnemySlots[i]) { changed = true; break; }
        }
    }

    if (changed) {
        while (container.firstChild) container.removeChild(container.firstChild);
        battleCards = {};
        lastEnemySlots = activeSlots;

        if (activeSlots.length === 0) return;

        var grid = el('div', 'battle-grid');
        grid.setAttribute('data-count', String(activeSlots.length));
        for (var i = 0; i < activeSlots.length; i++) {
            grid.appendChild(createGridCard(activeSlots[i]));
        }
        container.appendChild(grid);
    }

    for (var i = 0; i < activeSlots.length; i++) {
        var slot = activeSlots[i];
        var actor = parseEnemy(v['enemy' + slot + '_data']);
        if (actor) {
            updateGridCard(slot, actor, getEnemyType(actor, sceneTypes));
        }
    }
}

function showPartyView(v) {
    document.getElementById('battle-view').style.display = 'none';
    document.getElementById('party-view').style.display = 'block';
    clearBattleState();

    var module = v.current_module;
    document.getElementById('mode-badge').textContent =
        (module === 3) ? 'WORLD' : 'FIELD';

    var formBlob = v.party_formation;
    var formBytes = [];
    if (formBlob) {
        var formBin = atob(formBlob);
        for (var i = 0; i < formBin.length; i++) formBytes.push(formBin.charCodeAt(i));
    }

    for (var i = 0; i < 3; i++) {
        var card = document.getElementById('party' + (i + 1) + '-card');
        var charIdx = (formBytes.length > i) ? formBytes[i] : 0xFF;

        if (charIdx === 0xFF || charIdx > 8) {
            card.classList.add('hidden');
            continue;
        }

        card.classList.remove('hidden');

        var name = CHAR_NAMES[charIdx] || '\u2014';
        var charData = v.character_save_data ? getCharFromSave(v.character_save_data, charIdx) : null;
        var level = charData ? charData.level : 0;
        var hp = v['slot' + (i + 1) + '_hp'] || (charData ? charData.hp : 0);
        var maxHp = charData ? charData.maxHp : 0;
        var mp = v['slot' + (i + 1) + '_mp'] || (charData ? charData.mp : 0);
        var maxMp = charData ? charData.maxMp : 0;

        document.getElementById('party' + (i + 1) + '-name').textContent = name;
        document.getElementById('party' + (i + 1) + '-level').textContent = 'Lv.' + level;

        var hpPct = maxHp > 0 ? hp / maxHp : 0;
        var hpBar = document.getElementById('party' + (i + 1) + '-hp-bar');
        hpBar.style.width = (hpPct * 100).toFixed(1) + '%';
        hpBar.style.backgroundColor = getHpColor(hpPct);
        document.getElementById('party' + (i + 1) + '-hp-text').textContent =
            hp.toLocaleString() + ' / ' + maxHp.toLocaleString();

        var mpPct = maxMp > 0 ? mp / maxMp : 0;
        var mpBar = document.getElementById('party' + (i + 1) + '-mp-bar');
        mpBar.style.width = (mpPct * 100).toFixed(1) + '%';
        document.getElementById('party' + (i + 1) + '-mp-text').textContent =
            mp.toLocaleString() + ' / ' + maxMp.toLocaleString();
    }
}

function clearBattleState() {
    var container = document.getElementById('battle-view');
    while (container.firstChild) container.removeChild(container.firstChild);
    battleCards = {};
    lastEnemySlots = [];
}

// EmuLnk API entry points

function updateData(base64Data, isInitial) {
    try {
        var json = JSON.parse(atob(base64Data));
        var v = json.values || {};

        document.body.classList.toggle('offline', !json.isConnected);
        document.getElementById('status').textContent =
            json.isConnected ? 'Connected' : 'Offline';

        var module = v.current_module;
        var enemyCount = 0;
        for (var i = 1; i <= MAX_ENEMIES; i++) {
            if (isValidEnemy(v['enemy' + i + '_data'])) enemyCount++;
        }
        var inBattle = (module === 2) || (enemyCount > 0);

        if (inBattle) {
            showBattleView(v);
        } else {
            showPartyView(v);
        }

        document.getElementById('gil-val').textContent =
            (v.gil || 0).toLocaleString();
    } catch (e) {
        document.getElementById('status').textContent = 'Error: ' + e.message;
    }
}

function onGameClosed() {
    document.body.classList.add('offline');
    document.getElementById('status').textContent = 'Game closed';
    clearBattleState();
    document.getElementById('battle-view').style.display = 'none';
    document.getElementById('party-view').style.display = 'none';
    document.getElementById('mode-badge').textContent = '\u2014';
}
