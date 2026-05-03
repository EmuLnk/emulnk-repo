<script lang="ts">
  import type { Gen1BagState, Gen1BattleState, Gen1Pokemon, Gen1SafariState } from "@emulnk/sdk/transforms/gen1";
  import { gen1AccuracySummary } from "../accuracy.js";
  import { battleStateIcons } from "../battle-state-icons.js";
  import { buildCatchOptions, shouldShowBattleCatchStrip } from "../catch.js";
  import { gen1DamageSummary } from "../damage.js";
  import { defensiveTypeSummary } from "../type-matchups.js";
  import {
    battleMoveSignals,
    moveSlotConfidence,
    percent,
    turnOrderSummary,
    visibleBattleMoves,
  } from "../format.js";
  import { onCatchAction, onToggle } from "../sfx.js";
  import BattleStateIcon from "./BattleStateIcon.svelte";
  import HpBar from "./HpBar.svelte";
  import MoveRow from "./MoveRow.svelte";
  import PokemonSprite from "./PokemonSprite.svelte";
  import StatusBadge from "./StatusBadge.svelte";
  import TypeBadge from "./TypeBadge.svelte";

  export let battle: Gen1BattleState;
  export let bag: Gen1BagState;
  export let safari: Gen1SafariState;
  export let showEnemyMoves = true;
  export let showCatchRate = true;
  export let showFieldStates = true;
  export let showDamage = true;
  export let showAccuracy = true;
  export let showEffectLabels = true;
  export let showWeaknesses = false;
  export let showTurnOrder = true;
  export let showSpriteAnimations = true;

  let showFoeDetails = false;
  let showYourDetails = false;

  function battleLabel(state: Gen1BattleState): string {
    if (state.isTrainer) return "TRAINER";
    if (state.isSafari) return "SAFARI";
    if (state.isOldMan) return "OLD MAN";
    return "WILD";
  }

  function hasStats(mon: Gen1Pokemon | null): boolean {
    return !!mon && (mon.stats.atk > 0 || mon.stats.def > 0 || mon.stats.speed > 0 || mon.stats.special > 0);
  }

  function moveName(mon: Gen1Pokemon | null, moveId: number): string {
    if (!moveId) return "";
    return mon?.moves.find((move) => move.id === moveId)?.name ?? `MOVE ${moveId}`;
  }

  function memoryMoveNotes(status: Gen1BattleState["playerStatus"], mon: Gen1Pokemon | null): string[] {
    const notes: string[] = [];
    if (status.selectedMoveId) notes.push(`SEL ${moveName(mon, status.selectedMoveId)}`);
    if (status.usedMoveId && status.usedMoveId !== status.selectedMoveId) notes.push(`USED ${moveName(mon, status.usedMoveId)}`);
    if (status.numAttacksLeft > 0) notes.push(`${status.numAttacksLeft} HIT LEFT`);
    return notes;
  }

  function typeAbbrev(type: string): string {
    return type.slice(0, 3).toUpperCase();
  }

  function toggleFoeDetails(): void {
    showFoeDetails = !showFoeDetails;
    onToggle();
  }

  function toggleYourDetails(): void {
    showYourDetails = !showYourDetails;
    onToggle();
  }

  $: playerNotes = memoryMoveNotes(battle.playerStatus, battle.player);
  $: enemyNotes = memoryMoveNotes(battle.enemyStatus, battle.enemy);
  $: playerStateIcons = battleStateIcons(battle.playerStatMods, battle.playerStatus);
  $: enemyStateIcons = battleStateIcons(battle.enemyStatMods, battle.enemyStatus);
  $: enemyBattleMoves = visibleBattleMoves(battle.enemy?.moves ?? []);
  $: playerBattleMoves = visibleBattleMoves(battle.player?.moves ?? []);
  $: catchOptions = showCatchRate ? buildCatchOptions({ battle, bag, safari }) : [];
  $: canCatch = !!battle.catch && !battle.isTrainer && showCatchRate;
  $: showCatchStrip = canCatch && shouldShowBattleCatchStrip(catchOptions);
  $: enemyWeaknessSummary = battle.enemy ? defensiveTypeSummary(battle.enemy.type1, battle.enemy.type2) : null;
  $: playerTurnMove = battle.playerStatus.selectedMoveId || battle.playerStatus.usedMoveId;
  $: enemyTurnMove = battle.enemyStatus.selectedMoveId || battle.enemyStatus.usedMoveId;
  $: turnOrder = turnOrderSummary(battle.player, battle.enemy, playerTurnMove, enemyTurnMove);
</script>

<section class="view battle-view">
  {#if battle.active}
    <div class="gb-window battle-side-panel foe-panel">
      {#if battle.enemy}
        <div class="battle-side-main">
          <div class="battle-side-sprite">
            <PokemonSprite
              speciesName={battle.enemy.speciesName}
              label={battle.enemy.speciesName}
              animate={showSpriteAnimations}
              statusLabel={battle.enemy.status.label}
            />
          </div>
          <div class="battle-side-data">
            <div class="battle-side-header">
              <span class="battle-role battle-role-foe">{battleLabel(battle)}</span>
              {#if showTurnOrder && turnOrder?.first === "enemy"}<span class="first-chip">FIRST</span>{/if}
              <strong>{battle.enemy.speciesName}</strong>
              <b>L{battle.enemy.level}</b>
              {#if battle.enemy.status.label !== "OK"}
                <StatusBadge label={battle.enemy.status.label} />
              {/if}
            </div>
            <div class="type-line">
              <TypeBadge name={battle.enemy.typeNames[0]} />
              {#if battle.enemy.typeNames[1] !== battle.enemy.typeNames[0]}
                <TypeBadge name={battle.enemy.typeNames[1]} />
              {/if}
            </div>
            {#if battle.enemy.maxhp > 0}
              <HpBar hp={battle.enemy.hp} maxhp={battle.enemy.maxhp} />
            {:else}
              <div class="battle-scanline">HP --/--</div>
            {/if}
            {#if showFieldStates && enemyStateIcons.length > 0}
              <div class="active-state-chips">
                {#each enemyStateIcons as icon (icon.kind)}<BattleStateIcon {icon} />{/each}
              </div>
            {/if}
          </div>
        </div>

        <button type="button" class="battle-detail-toggle" on:click={toggleFoeDetails}>
          <span class="detail-icon" aria-hidden="true">
            <svg viewBox="0 0 8 8">
              <rect x="1" y="3" width="6" height="2" />
              {#if !showFoeDetails}<rect x="3" y="1" width="2" height="6" />{/if}
            </svg>
          </span>
          DETAILS
        </button>

        {#if showFoeDetails}
          <div class="battle-detail-drawer">
            {#if hasStats(battle.enemy)}
              <div class="battle-detail-grid">
                <span>ATTACK <b>{battle.enemy.stats.atk}</b></span>
                <span>DEFENSE <b>{battle.enemy.stats.def}</b></span>
                <span>SPEED <b>{battle.enemy.stats.speed}</b></span>
                <span>SPECIAL <b>{battle.enemy.stats.special}</b></span>
              </div>
            {/if}
            {#if enemyNotes.length > 0}
              <div class="battle-chip-row side-notes">
                {#each enemyNotes as note}<span>{note}</span>{/each}
              </div>
            {/if}
          </div>
        {/if}

        {#if showWeaknesses && enemyWeaknessSummary}
          <div class="weakness-summary">
            <div>
              <span>WEAK</span>
              <p>
                {#if enemyWeaknessSummary.weak.length > 0}
                  {#each enemyWeaknessSummary.weak as entry (entry.typeId)}
                    <b title={entry.type}>{typeAbbrev(entry.type)}</b>
                  {/each}
                {:else}
                  <b>---</b>
                {/if}
              </p>
            </div>
            <div>
              <span>RES</span>
              <p>
                {#if enemyWeaknessSummary.resist.length > 0}
                  {#each enemyWeaknessSummary.resist as entry (entry.typeId)}
                    <b title={entry.type}>{typeAbbrev(entry.type)}</b>
                  {/each}
                {:else}
                  <b>---</b>
                {/if}
              </p>
            </div>
            <div>
              <span>IMM</span>
              <p>
                {#if enemyWeaknessSummary.immune.length > 0}
                  {#each enemyWeaknessSummary.immune as entry (entry.typeId)}
                    <b title={entry.type}>{typeAbbrev(entry.type)}</b>
                  {/each}
                {:else}
                  <b>---</b>
                {/if}
              </p>
            </div>
          </div>
        {/if}

        {#if showEnemyMoves && enemyBattleMoves.length > 0}
          <div class="embedded-moves">
            <div class="window-title">FOE MOVES</div>
            <div class="move-list battle-move-grid">
              {#each enemyBattleMoves as move}
                <MoveRow
                  {move}
                  showPp={false}
                  signals={move && battle.player ? battleMoveSignals(move, battle.player, battle.enemy) : null}
                  damage={showDamage && move ? gen1DamageSummary(move, battle.enemy, battle.player, {
                    attackerStatus: battle.enemy.status,
                    attackerStatsIncludeStatusPenalties: true,
                    targetReflect: battle.playerStatus.reflect,
                    targetLightScreen: battle.playerStatus.lightScreen,
                  }) : null}
                  accuracy={showAccuracy && move ? gen1AccuracySummary(move, battle.enemyStatMods, battle.playerStatMods, battle.enemyStatus) : null}
                  confidence={moveSlotConfidence(move, "enemy")}
                  showEffectLabel={showEffectLabels}
                />
              {/each}
            </div>
          </div>
        {/if}
      {:else}
        <p class="battle-muted">FOE DATA WAITING</p>
      {/if}
    </div>

    {#if showCatchStrip}
      <div class="gb-window battle-catch-strip">
        <div class="ball-option-grid">
          {#each catchOptions as option}
            <button
              type="button"
              class:best-ball={option.best}
              on:click={onCatchAction}
              aria-label={`${option.name} ${option.quantity} ${percent(option.odds.chance)}`}
            >
              <i class={`ball-icon ball-${option.key}`} aria-hidden="true"></i>
              <span>{option.label}</span>
              <b>x{option.quantity}</b>
              <strong>{percent(option.odds.chance)}</strong>
            </button>
          {/each}
        </div>
      </div>
    {/if}

    <div class="gb-window battle-side-panel player-panel">
      {#if battle.player}
        <div class="battle-side-main">
          <div class="battle-side-sprite">
            <PokemonSprite
              speciesName={battle.player.speciesName}
              label={battle.player.nickname}
              animate={showSpriteAnimations}
              statusLabel={battle.player.status.label}
            />
          </div>
          <div class="battle-side-data">
            <div class="battle-side-header">
              <span class="battle-role battle-role-player">YOU</span>
              {#if showTurnOrder && turnOrder?.first === "player"}<span class="first-chip">FIRST</span>{/if}
              <strong>{battle.player.nickname}</strong>
              <b>L{battle.player.level}</b>
              {#if battle.player.status.label !== "OK"}
                <StatusBadge label={battle.player.status.label} />
              {/if}
            </div>
            <div class="type-line">
              <TypeBadge name={battle.player.typeNames[0]} />
              {#if battle.player.typeNames[1] !== battle.player.typeNames[0]}
                <TypeBadge name={battle.player.typeNames[1]} />
              {/if}
            </div>
            <HpBar hp={battle.player.hp} maxhp={battle.player.maxhp} />
            {#if showFieldStates && playerStateIcons.length > 0}
              <div class="active-state-chips">
                {#each playerStateIcons as icon (icon.kind)}<BattleStateIcon {icon} />{/each}
              </div>
            {/if}
          </div>
        </div>

        <button type="button" class="battle-detail-toggle" on:click={toggleYourDetails}>
          <span class="detail-icon" aria-hidden="true">
            <svg viewBox="0 0 8 8">
              <rect x="1" y="3" width="6" height="2" />
              {#if !showYourDetails}<rect x="3" y="1" width="2" height="6" />{/if}
            </svg>
          </span>
          DETAILS
        </button>

        {#if showYourDetails}
          <div class="battle-detail-drawer">
            <div class="battle-detail-grid">
              <span>ATTACK <b>{battle.player.stats.atk}</b></span>
              <span>DEFENSE <b>{battle.player.stats.def}</b></span>
              <span>SPEED <b>{battle.player.stats.speed}</b></span>
              <span>SPECIAL <b>{battle.player.stats.special}</b></span>
            </div>
            {#if playerNotes.length > 0}
              <div class="battle-chip-row side-notes">
                {#each playerNotes as note}<span>{note}</span>{/each}
              </div>
            {/if}
          </div>
        {/if}

        <div class="embedded-moves">
          <div class="window-title">YOUR MOVES</div>
          <div class="move-list battle-move-grid">
            {#each playerBattleMoves as move}
              <MoveRow
                {move}
                showPp={false}
                signals={move ? battleMoveSignals(move, battle.enemy, battle.player) : null}
                damage={showDamage && move ? gen1DamageSummary(move, battle.player, battle.enemy, {
                  attackerStatus: battle.player.status,
                  attackerStatsIncludeStatusPenalties: true,
                  targetReflect: battle.enemyStatus.reflect,
                  targetLightScreen: battle.enemyStatus.lightScreen,
                }) : null}
                accuracy={showAccuracy && move ? gen1AccuracySummary(move, battle.playerStatMods, battle.enemyStatMods, battle.playerStatus) : null}
                confidence={moveSlotConfidence(move, "player")}
                showEffectLabel={showEffectLabels}
              />
            {/each}
          </div>
        </div>
      {:else}
        <p class="battle-muted">PARTY DATA WAITING</p>
      {/if}
    </div>
  {:else}
    <div class="gb-window empty-message">NO ACTIVE BATTLE</div>
  {/if}
</section>
