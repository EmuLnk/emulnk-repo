<script lang="ts">
  import { appState } from "../state.svelte";
  import { EQUIP_ITEMS } from "../data/items";

  interface Props {
    onselect: (itemId: number) => void;
    onclose: () => void;
  }

  let { onselect, onclose }: Props = $props();

  interface OwnedItem {
    id: number;
    name: string;
    quantity: number;
  }

  let ownedItems: OwnedItem[] = $derived.by(() => {
    const items: OwnedItem[] = [];
    const inv = appState.inventoryHand;
    for (let i = 0; i < 169; i++) {
      const qty = inv[i];
      if (qty > 0) {
        const def = EQUIP_ITEMS[i];
        if (def) {
          items.push({ id: i, name: def.name, quantity: qty });
        }
      }
    }
    items.sort((a, b) => a.name.localeCompare(b.name));
    return items;
  });
</script>

<div class="overlay" role="dialog" aria-modal="true" aria-label="Select item">
  <div class="card">
    <header class="header">
      <h2 class="title">SELECT ITEM</h2>
      <button class="close-btn" onclick={onclose} aria-label="Close">&times;</button>
    </header>

    <div class="item-list">
      {#each ownedItems as item (item.id)}
        <button class="item-row" onclick={() => onselect(item.id)}>
          <span class="item-name">{item.name}</span>
          <span class="item-qty">{item.quantity}</span>
        </button>
      {:else}
        <div class="empty-state">No items in inventory</div>
      {/each}
    </div>
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(13, 10, 26, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card {
    width: 90%;
    max-height: 70vh;
    background: var(--bg-panel);
    border: 1px solid var(--border-ornate);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border-bottom: 1px solid var(--border-ornate);
    flex-shrink: 0;
  }

  .title {
    margin: 0;
    color: var(--text-accent);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
  }

  .close-btn {
    all: unset;
    color: var(--text-secondary);
    font-size: 1.2rem;
    cursor: pointer;
    padding: 2px 6px;
    line-height: 1;
  }

  .item-list {
    overflow-y: auto;
    flex: 1;
  }

  .item-row {
    all: unset;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 12px;
    border-bottom: 1px solid var(--border-ornate);
    cursor: pointer;
    box-sizing: border-box;
  }

  .item-row:active {
    background: var(--bg-surface);
  }

  .item-name {
    color: var(--text-primary);
    font-size: 0.8rem;
  }

  .item-qty {
    color: var(--text-dim);
    font-size: 0.75rem;
    background: var(--bg-surface);
    padding: 2px 8px;
    border-radius: 10px;
    min-width: 20px;
    text-align: center;
  }

  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 16px;
    color: var(--text-dim);
    font-size: 0.8rem;
  }
</style>
