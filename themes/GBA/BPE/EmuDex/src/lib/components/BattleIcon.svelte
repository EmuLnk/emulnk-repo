<script lang="ts">
  interface Props {
    icon: string;
    size?: number;
    color?: string;
  }

  let { icon, size = 12, color = 'currentColor' }: Props = $props();

  const ICONS: Record<string, string> = {
    // Weather icons
    sun: 'M6 1v1M6 10v1M1 6h1M10 6h1M2.5 2.5l.7.7M8.8 8.8l.7.7M2.5 9.5l.7-.7M8.8 3.2l.7-.7M6 4a2 2 0 100 4 2 2 0 000-4z',
    rain: 'M6 1C4 1 2 3 2 5.5S4 9 6 9s4-1.5 4-3.5S8 1 6 1zM4 10l-1 2M6 10l-1 2M8 10l-1 2',
    sand: 'M2 8h8v1H2zM3 6h6v1H3zM4 4h4v1H4zM1 10h10v1H1z',
    hail: 'M3 2l3 3M9 2L6 5M6 5v4M3 7l3-2M9 7L6 5M4 9h1M7 9h1M2 11h1M5 11h1M9 11h1',
    // Field icons
    shield: 'M6 1L2 3v3c0 2.5 1.7 4.8 4 5.5 2.3-.7 4-3 4-5.5V3L6 1z',
    spikes: 'M1 11l2-4 2 4M5 11l2-4 2 4M9 11l2-4',
    // Stat arrows
    'arrow-up': 'M6 2L2 7h3v3h2V7h3L6 2z',
    'arrow-down': 'M6 10l4-5H7V2H5v3H2l4 5z',
    // Battle icons
    skull: 'M5.25 5.875L6 4.375l.75 1.5H5.25zM4.25 5.5a.75.75 0 100-1.5.75.75 0 000 1.5zM7.75 5.5a.75.75 0 100-1.5.75.75 0 000 1.5zM3 11V8.875Q2.512 8.663 2.148 8.313 1.785 7.962 1.527 7.525 1.27 7.088 1.14 6.575 1.01 6.063 1 5.5 1 3.525 2.4 2.262 3.8 1 6 1q2.2 0 3.6 1.263Q11 3.525 11 5.5q0 .563-.14 1.075-.13.513-.387.95-.258.438-.622.787-.363.35-.851.563V11H7.5v-1H6.5v1h-1v-1H4.5v1H3z',
    'skull-outline': 'M3 11V8.875Q2.512 8.663 2.148 8.313 1.785 7.962 1.527 7.525 1.27 7.088 1.14 6.575 1.01 6.063 1 5.5 1 3.525 2.4 2.262 3.8 1 6 1q2.2 0 3.6 1.263Q11 3.525 11 5.5q0 .563-.14 1.075-.13.513-.387.95-.258.438-.622.787-.363.35-.851.563V11H7.5v-1H6.5v1h-1v-1H4.5v1H3zM4 10h.5v-1h1v1h1v-1h1v1H8V8.225q.475-.113.844-.375.369-.263.625-.625.256-.363.394-.8Q10 6.025 10 5.5q0-1.563-1.106-2.531Q7.787 2 6 2T3.106 2.969Q2 3.938 2 5.5q0 .488.137.925.138.438.394.8.256.363.625.625.369.263.844.375V10zM5.25 5.875h1.5L6 4.375l-.75 1.5zM4.25 5.5a.75.75 0 100-1.5.75.75 0 000 1.5zM7.75 5.5a.75.75 0 100-1.5.75.75 0 000 1.5z',
    bolt: 'M7 1L3 7h3l-1 4 4-6H6l1-4z',
    flame: 'M6 1C6 3 4 4 4 6c0 1.1.9 2 2 2s2-.9 2-2c0-1-1-2-1-2s1 1.5 1 3c0 1.7-1.3 3-3 3S2 8.7 2 7c0-2.5 4-6 4-6z',
    chevron: 'M3 4l3 4 3-4',
  };

  const FILL_ONLY = new Set(['skull', 'skull-outline']);
  const FILLED = new Set(['shield', 'skull']);

  let path = $derived(ICONS[icon] ?? '');
  let isFillOnly = $derived(FILL_ONLY.has(icon));
  let isFilled = $derived(FILLED.has(icon));
</script>

{#if path}
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill={isFillOnly || isFilled ? color : 'none'}
    stroke={isFillOnly ? 'none' : color}
    stroke-width={isFillOnly ? 0 : 1}
    stroke-linecap="round"
    stroke-linejoin="round"
    style="display:inline-block;vertical-align:middle"
  >
    <path d={path} />
  </svg>
{/if}
