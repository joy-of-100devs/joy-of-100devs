import {CookieParser} from "@/helpers/persistentStateHelpers/server";
import {Theme} from "@/constants";

export const themeConfigStore = new CookieParser<Theme>("theme-config", () => "dark");
