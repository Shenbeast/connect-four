import { lighten as originalLighten, darken as originalDarken } from "polished";
export const lighten = (color) => originalLighten(0.1, color);
export const darken = (color) => originalDarken(0.1, color);
