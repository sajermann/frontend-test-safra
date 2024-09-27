import { useSymbolList } from "../../context/useSymbolList";

export function SymbolList() {
  const { lists, listSelected, setListSelected, handleCreateList, biances } =
    useSymbolList();

  return (
    <div className="symbols-selector-list">
      <div className="select-and-add">
        <select
          data-testid="select-list"
          value={listSelected?.value}
          onChange={(e) =>
            setListSelected(lists.find((item) => item.value === e.target.value))
          }
        >
          {lists.map((a) => (
            <option key={a.value} value={a.value}>
              {a.label}
            </option>
          ))}
        </select>
        <button onClick={handleCreateList}>Create List</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Last Price</th>
            <th>Bid Price</th>
            <th>Ask Price</th>
            <th>Price Change (%)</th>
          </tr>
        </thead>
        <tbody>
          {biances.map((biance) => (
            <tr key={biance.stream}>
              <td>{biance.data.s}</td>
              <td>{Number(biance.data.c).toFixed(4)}</td>
              <td>{Number(biance.data.b).toFixed(4)}</td>
              <td>{Number(biance.data.a).toFixed(4)}</td>
              <td>{biance.data.P}%</td>
            </tr>
          ))}
          {!biances.length && (
            <tr>
              <td colSpan={5}>Please, add symbols and wait...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
