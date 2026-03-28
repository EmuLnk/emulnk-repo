<script lang="ts">
  import { appState } from "../state.svelte";
  import { EQUIP_ITEMS, ACCESSORY_ITEMS, type ItemDef } from "../data/items";
  import ItemCard from "./ItemCard.svelte";

  interface OwnedItem {
    id: number;
    name: string;
    quantity: number;
    category: string;
    description: string;
  }

  type FilterCategory = "ALL" | "WEAPONS" | "ARMOR" | "ACCESSORIES" | "CONSUMABLES";

  const FILTER_TABS: FilterCategory[] = [
    "ALL",
    "WEAPONS",
    "ARMOR",
    "ACCESSORIES",
    "CONSUMABLES",
  ];

  const FILTER_CATEGORIES: Record<FilterCategory, string[]> = {
    ALL: [],
    WEAPONS: ["weapon"],
    ARMOR: ["shield", "head", "body", "cloak"],
    ACCESSORIES: ["accessory"],
    CONSUMABLES: ["consumable"],
  };

  let activeFilter: FilterCategory = $state("ALL");

  let ownedItems: OwnedItem[] = $derived.by(() => {
    const items: OwnedItem[] = [];
    // Hand items (weapons, shields, consumables, food)
    const hand = appState.inventoryHand;
    for (let i = 0; i < 169; i++) {
      const qty = hand[i];
      if (qty > 0) {
        const def = EQUIP_ITEMS[i];
        if (def) {
          items.push({
            id: def.id,
            name: def.name,
            quantity: qty,
            category: def.category,
            description: def.description,
          });
        }
      }
    }
    // Body items (armor, accessories). ID offset by 1000 to avoid key collision.
    const body = appState.inventoryBody;
    for (let i = 0; i < 90; i++) {
      const qty = body[i];
      if (qty > 0) {
        const def = ACCESSORY_ITEMS[i];
        if (def) {
          items.push({
            id: 1000 + def.id,
            name: def.name,
            quantity: qty,
            category: def.category,
            description: def.description,
          });
        }
      }
    }
    return items;
  });

  let filteredItems: OwnedItem[] = $derived.by(() => {
    if (activeFilter === "ALL") return ownedItems;
    const cats = FILTER_CATEGORIES[activeFilter];
    return ownedItems.filter((item) => cats.includes(item.category));
  });
</script>

<div class="inventory-grid">
  <div class="filter-bar">
    <div class="filter-tabs">
      {#each FILTER_TABS as tab (tab)}
        <button
          class="filter-tab"
          class:active={activeFilter === tab}
          onclick={() => (activeFilter = tab)}
        >
          {tab}
        </button>
      {/each}
    </div>
    <span class="item-count">{filteredItems.length} items</span>
  </div>

  <div class="item-list">
    {#each filteredItems as item (item.id)}
      <ItemCard name={item.name} quantity={item.quantity} category={item.category} />
    {:else}
      <div class="empty-state">No items</div>
    {/each}
  </div>
</div>

<style>
  .inventory-grid {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .filter-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bg-panel);
    padding: 0 4px;
    flex-shrink: 0;
  }

  .filter-tabs {
    display: flex;
    gap: 0;
  }

  .filter-tab {
    all: unset;
    font-size: 11px;
    text-transform: uppercase;
    padding: 6px 10px;
    color: var(--text-secondary);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: color 0.15s;
  }

  .filter-tab.active {
    color: var(--accent-gold);
    border-bottom-color: var(--accent-gold);
  }

  .item-count {
    font-size: 11px;
    color: var(--text-dim);
    padding-right: 6px;
    flex-shrink: 0;
  }

  .item-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow-y: auto;
    flex: 1;
    padding: 4px;
  }

  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    color: var(--text-dim);
    font-size: 12px;
  }
</style>
