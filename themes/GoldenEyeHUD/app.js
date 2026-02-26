// ── GoldenEye 007 Mission Briefing ──
//
// Reads mission state from Mupen64Plus-Next RDRAM via EmuLnk.
// All addresses use N64 virtual format (0x80XXXXXX); RetroArch's
// virtual address masking (& 0x1FFFFFFF) translates to physical RDRAM.
//
// Pointer-based data points (health, armor, weapon) dereference
// g_CurrentPlayer at 0x8007A0B0 automatically via the profile's
// pointer/offset fields.
//
// Data sourced from n64decomp/007 decompilation.

// ── Mission Database ──
// Each mission maps level_id → { name, objectives[] }.
// objectives[].diff = minimum difficulty: 0=Agent, 1=Secret Agent, 2=00 Agent

var MISSIONS = {
  33: { name: 'Dam', objectives: [
    { text: 'Bungee jump from the platform', diff: 0 },
    { text: 'Neutralize all alarms', diff: 1 },
    { text: 'Install covert modem', diff: 2 },
    { text: 'Intercept data backup', diff: 2 }
  ]},
  34: { name: 'Facility', objectives: [
    { text: 'Gain entry to the laboratory area', diff: 0 },
    { text: 'Contact double agent', diff: 0 },
    { text: 'Rendezvous with 006', diff: 0 },
    { text: 'Destroy all tanks in the bottling room', diff: 1 },
    { text: 'Minimize scientist casualties', diff: 2 }
  ]},
  35: { name: 'Runway', objectives: [
    { text: 'Find plane ignition key', diff: 0 },
    { text: 'Escape in the plane', diff: 0 },
    { text: 'Destroy missile battery', diff: 1 },
    { text: 'Obtain building plans', diff: 2 }
  ]},
  36: { name: 'Surface 1', objectives: [
    { text: 'Power down communications dish', diff: 0 },
    { text: 'Enter base via ventilation tower', diff: 0 },
    { text: 'Obtain safe key', diff: 1 },
    { text: 'Destroy all security cameras', diff: 2 }
  ]},
  37: { name: 'Bunker 1', objectives: [
    { text: 'Disarm nuclear bomb', diff: 0 },
    { text: 'Copy GoldenEye key', diff: 0 },
    { text: 'Get personnel to activate computer', diff: 1 },
    { text: 'Download data from computer', diff: 1 },
    { text: 'Photograph main video screen', diff: 2 }
  ]},
  38: { name: 'Silo', objectives: [
    { text: 'Plant explosives in fuel rooms', diff: 0 },
    { text: 'Photograph satellite', diff: 0 },
    { text: 'Obtain telemetric data', diff: 1 },
    { text: 'Retrieve satellite circuitry', diff: 2 },
    { text: 'Minimize scientist casualties', diff: 2 }
  ]},
  39: { name: 'Frigate', objectives: [
    { text: 'Rescue hostages', diff: 0 },
    { text: 'Plant tracking bug on helicopter', diff: 0 },
    { text: 'Disarm bridge bomb', diff: 1 },
    { text: 'Disarm engine room bomb', diff: 2 }
  ]},
  40: { name: 'Surface 2', objectives: [
    { text: 'Disrupt all surveillance equipment', diff: 0 },
    { text: 'Break communications link to bunker', diff: 0 },
    { text: 'Disable Spetsnaz support aircraft', diff: 1 },
    { text: 'Gain entry to bunker', diff: 0 }
  ]},
  41: { name: 'Bunker 2', objectives: [
    { text: 'Compare staff and casualty lists', diff: 0 },
    { text: 'Recover CCTV tape', diff: 0 },
    { text: 'Escape to safety', diff: 0 },
    { text: 'Disable all security cameras', diff: 1 },
    { text: 'Recover GoldenEye operations manual', diff: 2 }
  ]},
  42: { name: 'Statue', objectives: [
    { text: 'Contact Valentin', diff: 0 },
    { text: 'Confront and unmask Janus', diff: 0 },
    { text: 'Locate helicopter', diff: 0 },
    { text: 'Rescue Natalya', diff: 0 },
    { text: 'Find flight recorder', diff: 1 }
  ]},
  43: { name: 'Archives', objectives: [
    { text: 'Escape from interrogation room', diff: 0 },
    { text: 'Find Natalya', diff: 0 },
    { text: 'Recover helicopter black box', diff: 1 },
    { text: 'Escape with Natalya', diff: 0 }
  ]},
  44: { name: 'Streets', objectives: [
    { text: 'Contact Valentin', diff: 0 },
    { text: 'Pursue Ourumov and Natalya', diff: 0 },
    { text: 'Minimize civilian casualties', diff: 1 }
  ]},
  45: { name: 'Depot', objectives: [
    { text: 'Destroy illegal arms cache', diff: 0 },
    { text: 'Destroy computer network', diff: 0 },
    { text: 'Obtain safe key', diff: 1 }
  ]},
  46: { name: 'Train', objectives: [
    { text: 'Destroy brake units', diff: 0 },
    { text: 'Rescue Natalya', diff: 0 },
    { text: 'Locate Janus secret base', diff: 1 },
    { text: 'Crack Boris\'s password', diff: 2 }
  ]},
  47: { name: 'Jungle', objectives: [
    { text: 'Escort Natalya to Janus base', diff: 0 },
    { text: 'Destroy drone guns', diff: 1 },
    { text: 'Eliminate Xenia', diff: 2 }
  ]},
  48: { name: 'Control', objectives: [
    { text: 'Protect Natalya', diff: 0 },
    { text: 'Disable GoldenEye satellite', diff: 0 },
    { text: 'Destroy armored mainframes', diff: 1 }
  ]},
  49: { name: 'Caverns', objectives: [
    { text: 'Destroy inlet pump controls', diff: 0 },
    { text: 'Destroy outlet pump controls', diff: 0 },
    { text: 'Destroy master control console', diff: 1 },
    { text: 'Use radio to contact Jack Wade', diff: 2 },
    { text: 'Minimize scientist casualties', diff: 2 }
  ]},
  50: { name: 'Cradle', objectives: [
    { text: 'Destroy control console', diff: 0 },
    { text: 'Settle the score with 006', diff: 0 }
  ]},
  51: { name: 'Aztec', objectives: [
    { text: 'Reprogram shuttle guidance', diff: 0 },
    { text: 'Launch shuttle', diff: 0 }
  ]},
  52: { name: 'Egyptian', objectives: [
    { text: 'Recover the Golden Gun', diff: 0 },
    { text: 'Defeat Baron Samedi', diff: 0 }
  ]}
};

// ── Weapon Names (ITEM_IDS enum from items.h) ──

var WEAPONS = {
  0x00: 'Unarmed',
  0x01: 'Hunting Knife',
  0x02: 'Throwing Knife',
  0x03: 'PP7',
  0x04: 'PP7 (Silenced)',
  0x05: 'DD44 Dostovei',
  0x06: 'Klobb',
  0x07: 'KF7 Soviet',
  0x08: 'ZMG (9mm)',
  0x09: 'D5K Deutsche',
  0x0A: 'D5K (Silenced)',
  0x0B: 'Phantom',
  0x0C: 'AR33',
  0x0D: 'RC-P90',
  0x0E: 'Shotgun',
  0x0F: 'Auto Shotgun',
  0x10: 'Sniper Rifle',
  0x11: 'Cougar Magnum',
  0x12: 'Golden Gun',
  0x13: 'Silver PP7',
  0x14: 'Gold PP7',
  0x15: 'Laser',
  0x16: 'Watch Laser',
  0x17: 'Grenade Launcher',
  0x18: 'Rocket Launcher',
  0x19: 'Hand Grenades',
  0x1A: 'Timed Mines',
  0x1B: 'Proximity Mines',
  0x1C: 'Remote Mines',
  0x1D: 'Detonator',
  0x1E: 'Taser',
  0x1F: 'Tank'
};

// ── Weapon → Ammo Type index (for reserve ammo array lookup) ──
// AMMOTYPE enum: 0=Pistol, 1=SMG, 2=Rifle, 3=Shotgun, 4=Grenade,
// 5=Remote, 6=Proximity, 7=Timed, 8=Throwing, 9=Rocket,
// 10=GrenadeLauncher, 11=Magnum, 12=GoldenGun, 13=Laser, 14=Tank, 15=Sniper

var AMMO_TYPE_FOR_WEAPON = {
  0x03: 0, 0x04: 0, 0x05: 0, 0x13: 0, 0x14: 0,    // Pistols
  0x06: 1, 0x08: 1, 0x09: 1, 0x0A: 1, 0x0B: 1,     // SMGs
  0x07: 2, 0x0C: 2, 0x0D: 2,                         // Rifles
  0x0E: 3, 0x0F: 3,                                   // Shotguns
  0x19: 4,                                             // Hand Grenades
  0x1C: 5,                                             // Remote Mines
  0x1B: 6,                                             // Proximity Mines
  0x1A: 7,                                             // Timed Mines
  0x02: 8,                                             // Throwing Knife
  0x18: 9,                                             // Rocket Launcher
  0x17: 10,                                            // Grenade Launcher
  0x11: 11,                                            // Cougar Magnum
  0x12: 12,                                            // Golden Gun
  0x15: 13, 0x16: 13,                                 // Laser
  0x1F: 14,                                            // Tank
  0x10: 15                                             // Sniper Rifle
};

// Weapons that don't use magazine ammo (no "mag / reserve" display)
var NO_MAG_WEAPONS = {
  0x00: true, 0x01: true, 0x02: true, 0x19: true,
  0x1A: true, 0x1B: true, 0x1C: true, 0x1D: true,
  0x1E: true, 0x16: true
};

var DIFF_NAMES = ['AGENT', 'SECRET AGENT', '00 AGENT'];

var TITLE_SCREEN_ID = 90;

var currentLevel = -1;
var currentDiff = 0;
var missionTimer = 0;
var objStatuses = [];
var health = 0;
var armor = 0;
var weaponR = 0;
var weaponL = 0;
var ammoMag = 0;
var ammoReserveArr = null;
var settings = { show_weapon: true, show_timer: true };

function b64ToBytes(b64) {
  var bin = atob(b64);
  var bytes = new Uint8Array(bin.length);
  for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function formatTime(ticks) {
  var totalSec = Math.floor(ticks / 60);
  var min = Math.floor(totalSec / 60);
  var sec = totalSec % 60;
  return (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;
}

function isInMission() {
  return currentLevel !== TITLE_SCREEN_ID && currentLevel >= 33 && currentLevel <= 52;
}

function processData(v) {
  currentLevel = (v.level_id !== undefined && v.level_id !== null) ? v.level_id : -1;
  currentDiff = v.difficulty || 0;
  missionTimer = v.mission_timer || 0;

  // Parse objectives: 10 × s32_le from bytes blob
  var rawObj = v.objectives;
  if (rawObj) {
    var objBytes = b64ToBytes(rawObj);
    var objDv = new DataView(objBytes.buffer);
    objStatuses = [];
    var count = Math.min(Math.floor(objBytes.length / 4), 10);
    for (var i = 0; i < count; i++) {
      objStatuses.push(objDv.getInt32(i * 4, true));
    }
  }

  // Pointer-based values — delivered as decoded scalars by the app
  health = (v.health !== undefined && v.health !== null) ? v.health : 0;
  armor = (v.armor !== undefined && v.armor !== null) ? v.armor : 0;
  weaponR = v.weapon_r || 0;
  weaponL = v.weapon_l || 0;
  ammoMag = v.ammo_mag || 0;

  // Reserve ammo: 30 × u32_le from bytes blob
  var rawRes = v.ammo_reserve;
  if (rawRes) {
    var resBytes = b64ToBytes(rawRes);
    var resDv = new DataView(resBytes.buffer);
    ammoReserveArr = [];
    var resCount = Math.min(Math.floor(resBytes.length / 4), 30);
    for (var i = 0; i < resCount; i++) {
      ammoReserveArr.push(resDv.getUint32(i * 4, true));
    }
  }
}

function renderHeader() {
  var nameEl = document.getElementById('mission-name');
  var diffEl = document.getElementById('difficulty-badge');
  var timerEl = document.getElementById('timer');

  if (!isInMission()) {
    nameEl.textContent = 'GOLDENEYE 007';
    diffEl.style.display = 'none';
    timerEl.style.display = 'none';
    return;
  }

  var mission = MISSIONS[currentLevel];
  nameEl.textContent = mission ? mission.name.toUpperCase() : 'LEVEL ' + currentLevel;

  diffEl.textContent = DIFF_NAMES[currentDiff] || 'AGENT';
  diffEl.style.display = '';

  if (settings.show_timer) {
    timerEl.textContent = formatTime(missionTimer);
    timerEl.style.display = '';
  } else {
    timerEl.style.display = 'none';
  }
}

function renderBars() {
  var healthPct = Math.max(0, Math.min(health * 100, 100));
  document.getElementById('health-bar').style.width = healthPct.toFixed(1) + '%';
  document.getElementById('health-pct').textContent = Math.round(healthPct) + '%';

  var armorRow = document.getElementById('armor-row');
  if (armor > 0) {
    var armorPct = Math.max(0, Math.min(armor * 100, 100));
    armorRow.style.display = '';
    document.getElementById('armor-bar').style.width = armorPct.toFixed(1) + '%';
    document.getElementById('armor-pct').textContent = Math.round(armorPct) + '%';
  } else {
    armorRow.style.display = 'none';
  }
}

function renderObjectives() {
  var list = document.getElementById('objectives-list');
  list.textContent = '';

  if (!isInMission()) return;

  var mission = MISSIONS[currentLevel];
  if (!mission) return;

  var applicableObjs = [];
  for (var i = 0; i < mission.objectives.length; i++) {
    if (mission.objectives[i].diff <= currentDiff) {
      applicableObjs.push({ obj: mission.objectives[i], index: i });
    }
  }

  for (var j = 0; j < applicableObjs.length; j++) {
    var entry = applicableObjs[j];
    var status = (entry.index < objStatuses.length) ? objStatuses[entry.index] : 0;

    var item = document.createElement('div');
    item.className = 'obj-item';

    var icon = document.createElement('span');
    icon.className = 'obj-icon';

    var text = document.createElement('span');
    text.className = 'obj-text';
    text.textContent = entry.obj.text;

    if (status === 1) {
      icon.className += ' complete';
      icon.textContent = '\u2713';
      text.className += ' complete';
    } else if (status === 2) {
      icon.className += ' failed';
      icon.textContent = '\u2717';
      text.className += ' failed';
    } else {
      icon.className += ' incomplete';
      icon.textContent = '\u25CB';
      text.className += ' incomplete';
    }

    item.appendChild(icon);
    item.appendChild(text);
    list.appendChild(item);
  }
}

function renderWeapon() {
  var section = document.getElementById('weapon-section');

  if (!settings.show_weapon || !isInMission() || weaponR === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = '';
  var name = WEAPONS[weaponR] || ('Weapon #' + weaponR);
  document.getElementById('weapon-name').textContent = name;

  var ammoText = '';
  if (!NO_MAG_WEAPONS[weaponR]) {
    var ammoType = AMMO_TYPE_FOR_WEAPON[weaponR];
    var reserve = (ammoReserveArr && ammoType !== undefined && ammoType < ammoReserveArr.length)
        ? ammoReserveArr[ammoType] : 0;
    ammoText = ammoMag + ' / ' + reserve;
  } else if (AMMO_TYPE_FOR_WEAPON[weaponR] !== undefined) {
    // Throwable / mine — show reserve count only
    var ammoType2 = AMMO_TYPE_FOR_WEAPON[weaponR];
    if (ammoReserveArr && ammoType2 < ammoReserveArr.length) {
      ammoText = 'x' + ammoReserveArr[ammoType2];
    }
  }
  document.getElementById('weapon-ammo').textContent = ammoText;

  var dualEl = document.getElementById('weapon-dual');
  if (weaponL > 0 && weaponL !== weaponR) {
    var leftName = WEAPONS[weaponL] || ('Weapon #' + weaponL);
    dualEl.textContent = '+ ' + leftName + ' (L)';
  } else if (weaponL > 0) {
    dualEl.textContent = 'Dual wielding';
  } else {
    dualEl.textContent = '';
  }
}

function render() {
  var waiting = document.getElementById('waiting');
  var hud = document.getElementById('hud');

  if (!isInMission()) {
    waiting.style.display = 'flex';
    hud.style.display = 'none';
    renderHeader();
    return;
  }

  waiting.style.display = 'none';
  hud.style.display = '';

  renderHeader();
  renderBars();
  renderObjectives();
  renderWeapon();
}

// ── EmuLnk Entry Points ──

function updateData(base64Data, isInitial) {
  try {
    var json = JSON.parse(atob(base64Data));
    var v = json.values || {};

    if (json.settings) {
      settings.show_weapon = json.settings.show_weapon !== 'false';
      settings.show_timer = json.settings.show_timer !== 'false';
    }

    var connected = !!json.isConnected;
    document.body.classList.toggle('offline', !connected);
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
  document.getElementById('status').textContent = 'Game closed';
  currentLevel = -1;
  currentDiff = 0;
  missionTimer = 0;
  objStatuses = [];
  health = 0;
  armor = 0;
  weaponR = 0;
  weaponL = 0;
  ammoMag = 0;
  ammoReserveArr = null;
  render();
}
