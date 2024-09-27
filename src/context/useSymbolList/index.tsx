import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { SymbolList } from "../../types/symbol-list.type";
import { SymbolListContext } from "../../types/symbol-list-context.type";
import { Biance } from "../../types/biance.type";
import { useSymbolSelector } from "../useSymbolSelector";

const symbolListContextDefaultValues: SymbolListContext =
  {} as SymbolListContext;

const SymbolListContex = createContext<SymbolListContext>(
  symbolListContextDefaultValues
);

export function useSymbolList() {
  return useContext(SymbolListContex);
}

export function SymbolListProvider({ children }: { children: ReactNode }) {
  const { clearSymbolsSelected } = useSymbolSelector();
  const [lists, setLists] = useState<SymbolList[]>([]);
  const [listSelected, setListSelected] = useState<SymbolList | undefined>(
    undefined
  );
  const [biances, setBiances] = useState<Biance[]>([]);

  const handleAddToList = useCallback(
    (symbols: string[]) => {
      if (!listSelected || symbols.length < 1) {
        alert(`Required: List/Symbols Selecteds`);
        return;
      }
      const old = [...lists];
      for (const item of old) {
        if (item.value === listSelected?.value) {
          item.symbols = symbols;
        }
      }
      setLists(old);
      clearSymbolsSelected();
    },
    [listSelected, lists, clearSymbolsSelected]
  );

  const handleCreateList = useCallback(() => {
    const name = prompt();
    if (!name) return;
    const result = { value: name, label: name, symbols: [] };
    setLists((prev) => [...prev, result]);
    setListSelected(result);
  }, []);

  const updateBiance = useCallback((event: MessageEvent) => {
    const result = JSON.parse(event.data) as Biance;

    setBiances((prev) => {
      if (prev.length === 0) {
        return [{ ...result }];
      }
      const old = [...prev];
      const index = prev.findIndex((item) => item.stream === result.stream);
      if (index < 0) {
        return [...old, { ...result }];
      }
      old[index] = { ...result };
      return [...old];
    });
  }, []);

  useEffect(() => {
    if (!listSelected || listSelected.symbols.length === 0) return;
    const ws = new WebSocket(
      `wss://data-stream.binance.com/stream?streams=${listSelected?.symbols
        .map((symbol) => `${symbol.toLowerCase()}@ticker`)
        .join("/")}`
    );

    ws.onmessage = updateBiance;

    return () => {
      setBiances([]);
      ws.close();
    };
  }, [listSelected, listSelected?.symbols, updateBiance]);

  const memoizedValue = useMemo(
    () => ({
      lists,
      handleAddToList,
      listSelected,
      setListSelected,
      handleCreateList,
      biances,
    }),
    [lists, handleAddToList, listSelected, handleCreateList, biances]
  );

  return (
    <SymbolListContex.Provider value={memoizedValue}>
      {children}
    </SymbolListContex.Provider>
  );
}
