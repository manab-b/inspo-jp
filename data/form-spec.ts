export type FormField = {
  id: string;
  label: string;
  required: boolean;
  inputMode?: string;
  patternHint?: string;
  autocomplete?: string;
};

export const formSpec: FormField[] = [
  {
    id: "family-name",
    label: "姓",
    required: true,
    autocomplete: "family-name",
  },
  {
    id: "given-name",
    label: "名",
    required: true,
    autocomplete: "given-name",
  },
  {
    id: "family-name-kana",
    label: "フリガナセイ",
    required: true,
    patternHint: "全角カタカナ",
  },
  {
    id: "given-name-kana",
    label: "フリガナメイ",
    required: true,
    patternHint: "全角カタカナ",
  },
  {
    id: "email",
    label: "email",
    required: true,
    inputMode: "email",
    autocomplete: "email",
  },
  {
    id: "tel",
    label: "tel",
    required: false,
    inputMode: "tel",
    autocomplete: "tel",
    patternHint: "ハイフンなし10–11桁",
  },
  {
    id: "postal-code",
    label: "郵便番号",
    required: true,
    inputMode: "numeric",
    autocomplete: "postal-code",
    patternHint: "7桁",
  },
  {
    id: "prefecture",
    label: "都道府県",
    required: true,
    autocomplete: "address-level1",
  },
  {
    id: "address",
    label: "住所",
    required: true,
    autocomplete: "street-address",
  },
  {
    id: "inquiry",
    label: "ご用件",
    required: true,
  },
];
