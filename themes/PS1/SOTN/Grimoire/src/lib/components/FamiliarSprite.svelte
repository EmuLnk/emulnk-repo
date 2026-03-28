<script lang="ts">
  interface Props {
    familiar: string;
    animState?: "idle" | "react" | "eat";
    offsetX?: number;
    offsetY?: number;
    snapBack?: boolean;
  }

  let { familiar, animState = "idle", offsetX = 0, offsetY = 0, snapBack = false }: Props = $props();

  import batImg from "../../../assets/familiars/bat.webp";
  import ghostImg from "../../../assets/familiars/ghost.webp";
  import faerieImg from "../../../assets/familiars/fairy.webp";
  import demonImg from "../../../assets/familiars/demon.webp";
  import swordImg from "../../../assets/familiars/sword.webp";

  const spriteUrls: Record<string, string> = { bat: batImg, ghost: ghostImg, faerie: faerieImg, demon: demonImg, sword: swordImg };
  let spriteUrl = $derived(spriteUrls[familiar] ?? "");

  const glowColors: Record<string, string> = {
    bat: "#0044FF30",
    ghost: "#FFFFFF20",
    faerie: "#D4AF3730",
    demon: "#FF660030",
    sword: "#00CCCC30",
  };

  let glowColor = $derived(glowColors[familiar] ?? "#FFFFFF10");
</script>

<div
  class="sprite-container"
  style:transform="translate({offsetX}px, {offsetY}px)"
  class:returning={snapBack}
>
  <div
    class="glow"
    style:background="radial-gradient(circle, {glowColor} 0%, transparent 70%)"
  ></div>

  <img
    class="sprite"
    class:idle={animState === "idle"}
    class:react={animState === "react"}
    class:eat={animState === "eat"}
    src={spriteUrl}
    alt="{familiar} familiar"
  />
</div>

<style>
  .sprite-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: auto;
    transition: none;
  }

  .sprite-container.returning {
    transition: transform 0.4s ease-out;
  }

  .glow {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    pointer-events: none;
  }

  .sprite {
    position: relative;
    width: 80px;
    height: auto;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }

  .sprite.idle {
    animation: float 2s ease-in-out infinite;
  }

  .sprite.react {
    animation: pulse 0.3s ease-out;
  }

  .sprite.eat {
    animation: shrink-bounce 0.5s ease;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(-4px);
    }
    50% {
      transform: translateY(4px);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }

  @keyframes shrink-bounce {
    0% {
      transform: scale(1);
    }
    30% {
      transform: scale(0.85);
    }
    70% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
