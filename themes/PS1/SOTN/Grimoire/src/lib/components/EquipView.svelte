<script lang="ts">
  import { appState } from "../state.svelte";
  import { EQUIP_ITEMS, ACCESSORY_ITEMS, type ItemDef } from "../data/items";
  import EquipmentSlot from "./EquipmentSlot.svelte";

  interface Props {
    onback: () => void;
  }

  let { onback }: Props = $props();

  const EMPTY_ITEM: ItemDef = {
    id: 0,
    name: "----",
    description: "",
    category: "weapon",
    attack: 0,
    defense: 0,
  };

  let rightHand = $derived(EQUIP_ITEMS[appState.equipment.rightHand] ?? EMPTY_ITEM);
  let leftHand = $derived(EQUIP_ITEMS[appState.equipment.leftHand] ?? EMPTY_ITEM);
  let head = $derived(ACCESSORY_ITEMS[appState.equipment.head] ?? EMPTY_ITEM);
  let body = $derived(ACCESSORY_ITEMS[appState.equipment.body] ?? EMPTY_ITEM);
  let cloak = $derived(ACCESSORY_ITEMS[appState.equipment.cloak] ?? EMPTY_ITEM);
  let accessory1 = $derived(ACCESSORY_ITEMS[appState.equipment.accessory1] ?? EMPTY_ITEM);
  let accessory2 = $derived(ACCESSORY_ITEMS[appState.equipment.accessory2] ?? EMPTY_ITEM);
</script>

<div class="equip-view">
  <header class="top-bar">
    <button class="back-btn" onclick={onback}>&#9666; BACK</button>
    <h2 class="heading">EQUIPMENT</h2>
    <div class="spacer"></div>
  </header>

  <div class="slot-list">
    <span class="section-label">WEAPONS</span>
    <EquipmentSlot
      label="Right Hand"
      itemName={rightHand.name}
      description={rightHand.description}
      attack={rightHand.attack}
      defense={rightHand.defense}
      element={rightHand.element}
      statBonus={rightHand.statBonus}
      resistElements={rightHand.resistElements}
    />
    <EquipmentSlot
      label="Left Hand"
      itemName={leftHand.name}
      description={leftHand.description}
      attack={leftHand.attack}
      defense={leftHand.defense}
      element={leftHand.element}
      statBonus={leftHand.statBonus}
      resistElements={leftHand.resistElements}
    />

    <span class="section-label">ARMOR</span>
    <EquipmentSlot
      label="Head"
      itemName={head.name}
      description={head.description}
      attack={head.attack}
      defense={head.defense}
      element={head.element}
      statBonus={head.statBonus}
      resistElements={head.resistElements}
    />
    <EquipmentSlot
      label="Body"
      itemName={body.name}
      description={body.description}
      attack={body.attack}
      defense={body.defense}
      element={body.element}
      statBonus={body.statBonus}
      resistElements={body.resistElements}
    />
    <EquipmentSlot
      label="Cloak"
      itemName={cloak.name}
      description={cloak.description}
      attack={cloak.attack}
      defense={cloak.defense}
      element={cloak.element}
      statBonus={cloak.statBonus}
      resistElements={cloak.resistElements}
    />

    <span class="section-label">ACCESSORIES</span>
    <EquipmentSlot
      label="Accessory 1"
      itemName={accessory1.name}
      description={accessory1.description}
      attack={accessory1.attack}
      defense={accessory1.defense}
      element={accessory1.element}
      statBonus={accessory1.statBonus}
      resistElements={accessory1.resistElements}
    />
    <EquipmentSlot
      label="Accessory 2"
      itemName={accessory2.name}
      description={accessory2.description}
      attack={accessory2.attack}
      defense={accessory2.defense}
      element={accessory2.element}
      statBonus={accessory2.statBonus}
      resistElements={accessory2.resistElements}
    />
  </div>
</div>

<style>
  .equip-view {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  .top-bar {
    display: flex;
    align-items: center;
    padding: 8px 10px;
    border-bottom: 1px solid var(--border-ornate);
    flex-shrink: 0;
  }

  .back-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 0.8rem;
    cursor: pointer;
    padding: 4px 8px;
    font-family: inherit;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .heading {
    margin: 0;
    flex: 1;
    text-align: center;
    color: var(--text-accent, var(--accent-crimson));
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 700;
  }

  .spacer {
    width: 60px;
  }

  .slot-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px 10px;
    overflow-y: auto;
    flex: 1;
  }

  .section-label {
    color: var(--text-secondary);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 12px;
  }

  .section-label:first-child {
    margin-top: 0;
  }
</style>
