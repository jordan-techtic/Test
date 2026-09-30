/** luna-spec-codegen: data-hook — wire API data here; do not restyle. */
export type FigmaFieldBinding = {
  value?: string;
  onChange?: (event: { target: { value: string } }) => void;
};

/** Default bindings add no DOM props, so the compiled frame stays unchanged. */
export function figmaFieldProps(_field: string): FigmaFieldBinding {
  return {};
}

export function useFigmaScreenData() {
  return {
    bound: "",
    values: {} as Record<string, string>,
    submit: async () => {},
  };
}
