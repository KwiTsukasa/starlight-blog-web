interface ThemeColorInterface {
  "--R": number;
  "--G": number;
  "--B": number;
  "--H": number;
  "--S": number;
  "--L": number;
  "--theme-font": string;
  "--el-color-primary": string;
}

interface ElMixinColor {
  [elMixinName: string]: string;
}
