import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Variable {
  label: string;
  selected: boolean;
}

interface VariableCategory {
  title: string;
  variables: Variable[];
}

interface VariableState {
  categories: VariableCategory[];
}

const initialState: VariableState = {
  categories: [
    {
      title: "Variable category 1",
      variables: [
        { label: "Carbon 1", selected: false },
        { label: "Co2 Distribution", selected: true },
        { label: "Fleet sizing", selected: true },
      ],
    },
    {
      title: "Variable Category 2",
      variables: [
        { label: "Parking Rate", selected: false },
        { label: "Border Rate", selected: true },
        { label: "Request rate", selected: true },
        { label: "Variable 1", selected: false },
        { label: "Variable 1", selected: false },
      ],
    },
    {
      title: "Variable Category 3",
      variables: [
        { label: "Variable 1", selected: false },
        { label: "Variable 1", selected: true },
        { label: "Variable 1", selected: true },
      ],
    },
  ],
};

const variableSlice = createSlice({
  name: "variables",
  initialState,
  reducers: {
    toggleVariableSelection(
      state: { categories: { [x: string]: any; }; },
      action: PayloadAction<{ catIdx: number; varIdx: number }>
    ) {
      const { catIdx, varIdx } = action.payload;
      const category = state.categories[catIdx];
      const selectedCount = category.variables.filter((v: { selected: any; }) => v.selected).length;
      const variable = category.variables[varIdx];

      if (!variable.selected && selectedCount >= 2) return;

      category.variables[varIdx].selected = !category.variables[varIdx].selected;
    },
  },
});

export const { toggleVariableSelection } = variableSlice.actions;
export default variableSlice.reducer;
