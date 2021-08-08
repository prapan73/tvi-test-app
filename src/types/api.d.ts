export type Lang =
  | "af"
  | "ar"
  | "bg"
  | "bn"
  | "ca"
  | "cs"
  | "cy"
  | "da"
  | "de"
  | "el"
  | "en"
  | "es"
  | "et"
  | "fa"
  | "fi"
  | "fr"
  | "gu"
  | "he"
  | "hi"
  | "hr"
  | "hu"
  | "id"
  | "it"
  | "ja"
  | "kn"
  | "ko"
  | "lt"
  | "lv"
  | "mk"
  | "ml"
  | "mr"
  | "ne"
  | "nl"
  | "no"
  | "pa"
  | "pl"
  | "pt"
  | "ro"
  | "ru"
  | "sk"
  | "sl"
  | "so"
  | "sq"
  | "sv"
  | "sw"
  | "ta"
  | "te"
  | "th"
  | "tl"
  | "tr"
  | "uk"
  | "ur"
  | "vi";

export type SortBy = "relevancy" | "date" | "rank";

export type ApiParams = {
  lang: Country;
  q: string;
  page: string;
  page_size: string;
  media: string;
  sort_by?: SortBy;
};
