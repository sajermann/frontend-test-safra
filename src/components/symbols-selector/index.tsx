import { useSymbolList } from "../../context/useSymbolList";
import { useSymbolSelector } from "../../context/useSymbolSelector";

export function SymbolsSelector() {
  const { symbols, symbolsSelected, handleToggleSymbol } = useSymbolSelector();
  const { handleAddToList } = useSymbolList();

  return (
    <div className="symbols-selector-container">
      <div className="title-container">
        <span>Symbols</span>
      </div>
      <div className="symbols-selector-sub-container">
        {symbols.map((symbol) => (
          <div key={symbol} className="row">
            <input
              id={symbol}
              type="checkbox"
              checked={symbolsSelected.findIndex((s) => s === symbol) > -1}
              onChange={() => handleToggleSymbol(symbol)}
            />
            <label htmlFor={symbol}>{symbol}</label>
          </div>
        ))}
      </div>
      <button onClick={() => handleAddToList(symbolsSelected)}>
        Add to List
      </button>
    </div>
  );
}
