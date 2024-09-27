export type SymbolSelectorContext = {
  symbols: string[];
  handleToggleSymbol: (data: string) => void;
  symbolsSelected: string[];
  clearSymbolsSelected: () => void;
};
