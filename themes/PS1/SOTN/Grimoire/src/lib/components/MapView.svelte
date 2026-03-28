<script lang="ts">
  import { appState } from "../state.svelte";
  import {
    renderMap,
    centerOnRoom,
    type MapState,
    type MapViewport,
  } from "./castle-map";
  import { resetMapData } from "../persistence";

  let canvasEl: HTMLCanvasElement;
  let containerEl: HTMLDivElement;
  let viewport: MapViewport = $state({ offsetX: 0, offsetY: 0, scale: 2 });
  let canvasWidth = $state(300);
  let canvasHeight = $state(200);

  let settingAutoCenter = $derived(
    appState.settings["auto-center-map"] !== "false"
  );
  let localCenterOverride: boolean | null = $state(null);
  let autoCenter = $derived(localCenterOverride ?? settingAutoCenter);
  let isDragging = $state(false);
  let effectiveAutoCenter = $derived(autoCenter && !isDragging);

  let roomCount = $derived(appState.visitedRooms.size);
  let currentKey = $derived(
    `${appState.stageId}:${appState.roomX}:${appState.roomY}:${appState.roomRight}:${appState.roomBottom}`
  );

  // Touch state
  let dragging = false;
  let lastTouchDist = 0;
  let startTouchX = 0;
  let startTouchY = 0;
  let startOffsetX = 0;
  let startOffsetY = 0;
  let lastTapTime = 0;
  let resumeTimer: ReturnType<typeof setTimeout> | null = null;

  // Canvas rendering
  $effect(() => {
    if (!canvasEl) return;
    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;

    // Use reactive canvas dimensions (set by ResizeObserver)
    const w = canvasWidth;
    const h = canvasHeight;

    // Always auto-center unless actively dragging
    if (effectiveAutoCenter && w > 0 && h > 0) {
      const centered = centerOnRoom(
        w,
        h,
        appState.roomX,
        appState.roomY,
        appState.roomRight,
        appState.roomBottom,
        viewport.scale
      );
      viewport.offsetX = centered.offsetX;
      viewport.offsetY = centered.offsetY;
    }

    const mapState: MapState = {
      visitedRooms: appState.visitedRooms,
      currentKey,
      roomX: appState.roomX,
      roomY: appState.roomY,
      roomRight: appState.roomRight,
      roomBottom: appState.roomBottom,
      stageId: appState.stageId,
    };

    renderMap(ctx, w, h, mapState, viewport);
  });

  // Resize handling
  $effect(() => {
    if (!containerEl) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.contentRect;
        canvasWidth = Math.floor(rect.width);
        canvasHeight = Math.floor(rect.height);
      }
    });

    observer.observe(containerEl);

    return () => {
      observer.disconnect();
    };
  });

  // Touch handlers
  function handleTouchStart(e: TouchEvent) {
    if (e.touches.length === 1) {
      dragging = true;
      startTouchX = e.touches[0].clientX;
      startTouchY = e.touches[0].clientY;
      startOffsetX = viewport.offsetX;
      startOffsetY = viewport.offsetY;

      // Double-tap resets to auto-center
      const now = Date.now();
      if (now - lastTapTime < 300) {
        viewport.scale = 2;
        isDragging = false;
      }
      lastTapTime = now;
    } else if (e.touches.length === 2) {
      dragging = false;
      lastTouchDist = getTouchDist(e.touches);
    }
  }

  function handleTouchMove(e: TouchEvent) {
    e.preventDefault();

    if (e.touches.length === 1 && dragging) {
      const dx = e.touches[0].clientX - startTouchX;
      const dy = e.touches[0].clientY - startTouchY;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        isDragging = true;
      }
      if (isDragging) {
        viewport.offsetX = startOffsetX + dx;
        viewport.offsetY = startOffsetY + dy;
      }
    } else if (e.touches.length === 2) {
      const dist = getTouchDist(e.touches);
      if (lastTouchDist > 0) {
        const ratio = dist / lastTouchDist;
        viewport.scale = Math.min(6, Math.max(0.5, viewport.scale * ratio));
      }
      lastTouchDist = dist;
    }
  }

  function handleTouchEnd() {
    dragging = false;
    lastTouchDist = 0;
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => { isDragging = false; }, 3000);
  }

  function getTouchDist(touches: TouchList): number {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function toggleAutoCenter() {
    localCenterOverride = !autoCenter;
    isDragging = false;
  }

  function handleReset() {
    resetMapData();
  }
</script>

<div class="map-container">
  <div class="top-bar">
    <div class="top-bar-left">
      <h3 class="heading gothic-heading">CASTLE</h3>
      <span class="room-count">{roomCount} rooms</span>
    </div>
    <button class="reset-btn" onclick={handleReset}>RESET</button>
    <button
      class="center-btn"
      class:active={effectiveAutoCenter}
      onclick={toggleAutoCenter}
    >
      CENTER
    </button>
  </div>

  <div class="canvas-area" bind:this={containerEl}>
    <canvas
      bind:this={canvasEl}
      width={canvasWidth}
      height={canvasHeight}
      ontouchstart={handleTouchStart}
      ontouchmove={handleTouchMove}
      ontouchend={handleTouchEnd}
    ></canvas>
  </div>
</div>

<style>
  .map-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 8px;
  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .top-bar-left {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }

  .heading {
    margin: 0;
    color: var(--text-accent);
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .room-count {
    color: var(--text-secondary);
    font-size: 11px;
  }

  .reset-btn {
    background: none;
    border: 1px solid var(--accent-crimson);
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 10px;
    font-weight: 600;
    color: var(--accent-crimson);
    cursor: pointer;
  }

  .center-btn {
    background: var(--bg-surface);
    border: 1px solid var(--border-ornate);
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: var(--text-secondary);
    cursor: pointer;
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .center-btn.active {
    color: var(--accent-gold);
    border-color: var(--accent-gold);
  }

  .canvas-area {
    flex: 1;
    min-height: 0;
    position: relative;
  }

  canvas {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    border: 1px solid var(--border-ornate);
    background: var(--bg-deep);
    touch-action: none;
  }
</style>
