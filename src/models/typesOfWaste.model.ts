export interface ITypesOfWaste {
  types: IType[];
}

export interface ISpecificType {
  shortcut?: string;
  fullName?: string;
  images?: string[];
  disposed?: string[];
  importantly?: string[];
  notDisposed?: string[];
  description?: string;
}

export interface IType {
  id: string;
  name: string;
  image: string;
  specificTypes: ISpecificType[];
}
