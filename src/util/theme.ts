export default {
  mixWhite: "#ffffff",
  hexTorgb(color: string): number[] {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    return [r, g, b];
  },
  rgbToHsl(R: number, G: number, B: number): number[] {
    const r = R / 255;
    const g = G / 255;
    const b = B / 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    let h: number;
    let s: number;
    if (max === min) {
      h = 0;
    } else if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else if (b === max) {
      h = 4 + (r - g) / delta;
    }
    h = Math.min(h * 60, 360);
    if (h < 0) {
      h += 360;
    }
    const l = (min + max) / 2;
    if (max === min) {
      s = 0;
    } else if (l <= 0.5) {
      s = delta / (max + min);
    } else {
      s = delta / (2 - max - min);
    }
    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
  },
  rgbToHex(R: number, G: number, B: number): string[] {
    const r = ("0" + (R || 0).toString(16)).slice(-2);
    const g = ("0" + (G || 0).toString(16)).slice(-2);
    const b = ("0" + (B || 0).toString(16)).slice(-2);
    return [r, g, b];
  },
  minColorScale(
    [R1, G1, B1]: number[],
    [R2, B2, G2]: number[],
    minWeight: number
  ): number[] {
    const r = Math.round(R1 * (1 - minWeight) + R2 * minWeight);
    const g = Math.round(G1 * (1 - minWeight) + B2 * minWeight);
    const b = Math.round(B1 * (1 - minWeight) + G2 * minWeight);
    return [r, g, b];
  },
  mix(color1: string, color2: string, weight: number): string {
    weight = Math.max(Math.min(Number(weight), 1), 0);
    const [r, g, b] = this.minColorScale(
      this.hexTorgb(color1),
      this.hexTorgb(color2),
      weight
    );
    const [_r, _g, _b] = this.rgbToHex(r, g, b);
    return "#" + _r + _g + _b;
  },
  changeTheme(
    color: string,
    theme: ThemeColorInterface,
    elMixin: ElMixinColor
  ): void {
    const [r, g, b] = this.hexTorgb(color);
    const [h, s, l] = this.rgbToHsl(r, g, b);
    theme["--R"] = r;
    theme["--G"] = g;
    theme["--B"] = b;
    theme["--H"] = h;
    theme["--S"] = s;
    theme["--L"] = l;
    theme["--el-color-primary"] = color;
    for (let i = 1; i < 10; i += 1) {
      const mixin = "--el-color-primary-light-" + i;
      elMixin[mixin] = this.mix(color, this.mixWhite, i * 0.1);
    }
  },
  changeFont(font: string, theme: ThemeColorInterface): void {
    theme["--theme-font"] = font;
  },
};
