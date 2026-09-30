/** luna-spec-codegen: data-hook — wire API data here; do not restyle. */
export type FigmaFieldBinding = {
  value?: string;
  onChange?: (event: { target: { value: string } }) => void;
};

export type FigmaActionBinding = {
  onClick?: (event: { preventDefault: () => void }) => void;
};

/** Default bindings add no DOM props, so the compiled frame stays unchanged. */
export function figmaFieldProps(_field: string): FigmaFieldBinding {
  return {};
}

/**
 * Semantic actions from Figma prototype reactions. The action id is
 * stamped on the element as data-figma-action; implement its behavior
 * here. The default records which action fired and does not navigate
 * or invent a destination.
 */
export function figmaActionProps(action: string): FigmaActionBinding {
  return {
    onClick: () => {
      document.documentElement.setAttribute("data-figma-action-fired", action);
    },
  };
}

export function useFigmaScreenData() {
  return {
    bound: "",
    values: {} as Record<string, string>,
    submit: async () => {},
  };
}
