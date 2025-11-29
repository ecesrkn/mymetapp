
type QueryParamValue = string | number | boolean | Array<string | number | boolean>;

type QueryParams = {
  [key: string]: QueryParamValue | undefined | null;
};

export function toQueryString(obj: QueryParams) {
  if (!obj || typeof obj !== 'object') return '';

  const parts = [];

  for (const key in obj) {
    let value = obj[key];
    if (value === undefined || value === null) continue;

    // If array → join with "|"
    if (Array.isArray(value)) {
      value = value.join("|");
    }

    parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  }

  if (!parts.length) return ''; // empty object → no question mark

  return `?${parts.join("&")}`; // include ? automatically
}