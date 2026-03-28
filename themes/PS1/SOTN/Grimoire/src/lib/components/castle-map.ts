/**
 * Canvas-based castle map renderer for the Grimoire minimap.
 * Rooms are drawn as full rectangles (left,top → right,bottom) matching
 * the actual castle architecture. Long hallways, tall shafts, and large
 * rooms all render at their true proportions.
 */

/** Special room type detection by stageId */
function getRoomType(stageId: number): "warp" | "boss" | "normal" {
  if (stageId === 0x0e || stageId === 0x2e) return "warp";
  if (stageId >= 0x16 && stageId <= 0x1e) return "boss";
  if (stageId >= 0x36 && stageId <= 0x3e) return "boss";
  return "normal";
}

/** Stage color mapping. Warm for normal castle, cool for inverted. */
const STAGE_COLORS: Record<number, string> = {
  0x00: "#6B4423", // Entrance
  0x01: "#5A6B3A", // Alchemy Lab
  0x02: "#4A5A8B", // Library
  0x03: "#2A5A8B", // Save Room (blue)
  0x04: "#7B5A3A", // Marble Gallery
  0x05: "#8B6B4A", // Outer Wall
  0x06: "#6B5A7B", // Olrox's Quarters
  0x07: "#5A7B6B", // Colosseum
  0x08: "#4A6B5A", // Underground Caverns
  0x09: "#7B4A4A", // Castle Keep
  0x0a: "#8B7B4A", // Royal Chapel
  0x0b: "#6B4A5A", // Rondo Towers
  0x0c: "#5A4A6B", // Clock Tower
  0x0d: "#4A5A4A", // Long Library
  0x0e: "#6B3FA0", // Warp Room (purple)
};

/** Colors for special room types */
const WARP_COLOR = "#A050E0";
const BOSS_COLOR = "#D03030";

function getStageColor(stageId: number): string {
  if (stageId === 0x0e || stageId === 0x2e) return WARP_COLOR;
  if ((stageId >= 0x16 && stageId <= 0x1e) || (stageId >= 0x36 && stageId <= 0x3e)) return BOSS_COLOR;
  if (STAGE_COLORS[stageId]) return STAGE_COLORS[stageId];
  if (stageId >= 0x20) return "#3A4A6B";
  return "#5A5A4A";
}

/** Parsed room rectangle from a visited room key */
interface RoomRect {
  stageId: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/** Parse a room key "stage:left:top:right:bottom" into a rect */
function parseRoomKey(key: string): RoomRect | null {
  const p = key.split(":");
  // Support both old format (3 parts) and new format (5 parts)
  if (p.length === 5) {
    return {
      stageId: parseInt(p[0]),
      left: parseInt(p[1]),
      top: parseInt(p[2]),
      right: parseInt(p[3]),
      bottom: parseInt(p[4]),
    };
  }
  if (p.length === 3) {
    // Old format: single cell
    const x = parseInt(p[1]);
    const y = parseInt(p[2]);
    return { stageId: parseInt(p[0]), left: x, top: y, right: x, bottom: y };
  }
  return null;
}

export interface MapState {
  visitedRooms: Set<string>;
  currentKey: string;
  roomX: number;
  roomY: number;
  roomRight: number;
  roomBottom: number;
  stageId: number;
}

export interface MapViewport {
  offsetX: number;
  offsetY: number;
  scale: number;
}

const CELL_SIZE = 10;
const ROOM_BORDER_COLOR = "rgba(74, 61, 107, 0.4)";
const CURRENT_ROOM_COLOR = "#C9A94E";
const PLAYER_DOT_COLOR = "#B42828";

/** Render the entire minimap onto a canvas */
export function renderMap(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: MapState,
  viewport: MapViewport,
): void {
  const { scale, offsetX, offsetY } = viewport;
  const cs = CELL_SIZE * scale;

  // Clear
  ctx.fillStyle = "#0D0A1A";
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.translate(offsetX, offsetY);

  // Draw visited rooms as full rectangles
  for (const key of state.visitedRooms) {
    const r = parseRoomKey(key);
    if (!r) continue;

    const x = r.left * cs;
    const y = r.top * cs;
    const w = (r.right - r.left + 1) * cs;
    const h = (r.bottom - r.top + 1) * cs;

    // Room fill
    ctx.fillStyle = getStageColor(r.stageId);
    ctx.fillRect(x, y, w, h);

    // Room border (outer edge only)
    ctx.strokeStyle = ROOM_BORDER_COLOR;
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);

    // Draw markers for special rooms
    const type = getRoomType(r.stageId);
    const mx = x + w / 2;
    const my = y + h / 2;
    const ms = Math.min(cs * 0.35, 5);

    if (type === "warp") {
      // Circle marker
      ctx.strokeStyle = "#C080FF";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(mx, my, ms, 0, Math.PI * 2);
      ctx.stroke();
    } else if (type === "boss") {
      // Diamond marker
      ctx.fillStyle = "#FF6060";
      ctx.beginPath();
      ctx.moveTo(mx, my - ms);
      ctx.lineTo(mx + ms, my);
      ctx.lineTo(mx, my + ms);
      ctx.lineTo(mx - ms, my);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Highlight current room rectangle
  const cx = state.roomX * cs;
  const cy = state.roomY * cs;
  const cw = (state.roomRight - state.roomX + 1) * cs;
  const ch = (state.roomBottom - state.roomY + 1) * cs;

  if (cw > 0 && ch > 0) {
    // Gold highlight border
    ctx.strokeStyle = CURRENT_ROOM_COLOR;
    ctx.lineWidth = 2;
    ctx.strokeRect(cx, cy, cw, ch);

    // Player dot (center of current room)
    ctx.fillStyle = PLAYER_DOT_COLOR;
    ctx.beginPath();
    ctx.arc(cx + cw / 2, cy + ch / 2, cs * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/** Calculate viewport offset to center on the current room */
export function centerOnRoom(
  canvasWidth: number,
  canvasHeight: number,
  roomX: number,
  roomY: number,
  roomRight: number,
  roomBottom: number,
  scale: number,
): { offsetX: number; offsetY: number } {
  const cs = CELL_SIZE * scale;
  const roomCenterX = (roomX + roomRight + 1) / 2 * cs;
  const roomCenterY = (roomY + roomBottom + 1) / 2 * cs;
  return {
    offsetX: canvasWidth / 2 - roomCenterX,
    offsetY: canvasHeight / 2 - roomCenterY,
  };
}
