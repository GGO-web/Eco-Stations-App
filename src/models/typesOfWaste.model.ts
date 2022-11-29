export interface ITypesOfWaste {
  types: Type[];
}

export interface SpecificType {
  shortcut: string;
  fullName: string;
  disposed: string[];
  importantly: string[];
  notDisposed: string[];
  description: string;
}

export interface Type {
  name: string;
  specificTypes: SpecificType[];
}
