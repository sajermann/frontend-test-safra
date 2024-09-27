import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { SymbolSelectorContext } from "../../types/symbol-selector-context.type";

const symbolSelectorContextDefaultValues: SymbolSelectorContext =
  {} as SymbolSelectorContext;

const SymbolSelectorContex = createContext<SymbolSelectorContext>(
  symbolSelectorContextDefaultValues
);

export function useSymbolSelector() {
  return useContext(SymbolSelectorContex);
}

export function SymbolSelectorProvider({ children }: { children: ReactNode }) {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [symbolsSelected, setSymbolsSelected] = useState<string[]>([]);

  const handleToggleSymbol = useCallback(
    (symbolForToggle: string) => {
      const result = symbolsSelected.find(
        (symbol) => symbol === symbolForToggle
      );
      if (!result) {
        setSymbolsSelected((prev) => [...prev, symbolForToggle]);
        return;
      }
      const index = symbolsSelected.findIndex((s) => s === symbolForToggle);
      const old = [...symbolsSelected];
      old.splice(index, 1);
      setSymbolsSelected(old);
    },
    [symbolsSelected]
  );

  const clearSymbolsSelected = useCallback(() => {
    setSymbolsSelected([]);
  }, []);

  async function load() {
    try {
      const response = await fetch(
        "https://api.binance.com/api/v3/exchangeInfo"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSymbols(data.symbols.map((item: { symbol: string }) => item.symbol));
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  useEffect(() => {
    load();
  }, []);

  const memoizedValue = useMemo(
    () => ({
      symbols,
      symbolsSelected,
      handleToggleSymbol,
      clearSymbolsSelected,
    }),
    [symbols, symbolsSelected, handleToggleSymbol, clearSymbolsSelected]
  );

  return (
    <SymbolSelectorContex.Provider value={memoizedValue}>
      {children}
    </SymbolSelectorContex.Provider>
  );
}
