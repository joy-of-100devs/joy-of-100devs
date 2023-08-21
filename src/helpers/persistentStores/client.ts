import {CookieParser} from "@/helpers/persistentStateHelpers/client";
import {Theme} from "@/constants";

export const themeConfigStore = new CookieParser<Theme>("theme-config", () => "dark");
