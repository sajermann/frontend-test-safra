import { Dispatch, SetStateAction } from "react";
import { SymbolList } from "./symbol-list.type";
import { Biance } from "./biance.type";

export type SymbolListContext = {
  lists: SymbolList[];
  handleAddToList: (data: string[]) => void;
  listSelected: SymbolList | undefined;
  setListSelected: Dispatch<SetStateAction<SymbolList | undefined>>;
  handleCreateList: () => void;
  biances: Biance[];
};
