<script lang="ts">
  import { CATEGORY_ICONS } from "../data/icons";

  interface Props {
    name: string;
    quantity: number;
    category: string;
  }

  const CATEGORY_COLORS: Record<string, string> = {
    weapon: "var(--accent-crimson)",
    shield: "#5080c0",
    head: "var(--accent-purple)",
    body: "var(--accent-purple)",
    cloak: "var(--accent-purple)",
    accessory: "var(--accent-gold)",
    consumable: "#508050",
    food: "#8b6b3a",
  };

  let { name, quantity, category }: Props = $props();

  let borderColor = $derived(CATEGORY_COLORS[category] ?? "var(--border-ornate)");
  let icon = $derived(CATEGORY_ICONS[category]);
  let iconColor = $derived(CATEGORY_COLORS[category] ?? "var(--text-dim)");
</script>

<div class="item-card" style:border-left-color={borderColor}>
  {#if icon}
    <svg class="item-icon" viewBox={icon.viewBox} style:fill={iconColor}>
      <path d={icon.path} />
    </svg>
  {/if}
  <span class="item-name">{name}</span>
  <span class="item-qty">{quantity}</span>
</div>

<style>
  .item-card {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px;
    background: var(--bg-surface);
    border: 1px solid var(--border-ornate);
    border-left-width: 3px;
    border-radius: 3px;
    box-sizing: border-box;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.04),
      0 1px 3px rgba(0, 0, 0, 0.25);
  }

  .item-icon {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    opacity: 0.7;
  }

  .item-name {
    color: var(--text-primary);
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
    flex: 1;
  }

  .item-qty {
    color: var(--accent-gold);
    font-family: "Courier New", Courier, monospace;
    font-size: 12px;
    flex-shrink: 0;
  }
</style>
