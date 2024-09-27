import { SymbolsSelector } from "./components/symbols-selector";
import { SymbolSelectorProvider } from "./context/useSymbolSelector";
import { SymbolList } from "./components/symbols-list";
import { SymbolListProvider } from "./context/useSymbolList";
import "./App.css";

function App() {
  return (
    <div className="container">
      <SymbolSelectorProvider>
        <SymbolListProvider>
          <SymbolsSelector />
          <SymbolList />
        </SymbolListProvider>
      </SymbolSelectorProvider>
    </div>
  );
}

export default App;
