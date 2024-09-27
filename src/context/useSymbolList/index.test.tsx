import { renderHook } from "@testing-library/react";
import { it, describe, expect, vi } from "vitest";
import { SymbolSelectorProvider } from "../../context/useSymbolSelector";
import { SymbolListProvider, useSymbolList } from ".";

describe("Context/UseSymbolList", async () => {
  it(`should try add symbol to list without list selected`, async () => {
    const wrapper = ({ children }: any) => (
      <SymbolSelectorProvider>
        <SymbolListProvider>{children}</SymbolListProvider>
      </SymbolSelectorProvider>
    );

    const { result } = renderHook(() => useSymbolList(), { wrapper });
    const spy = vi.spyOn(window, "alert");
    result.current.handleAddToList(["symbol-1", "symbol-2"]);
    expect(spy).toBeCalledWith("Required: List/Symbols Selecteds");
  });

  it(`should add symbol to list with success`, async () => {
    const wrapper = ({ children }: any) => (
      <SymbolSelectorProvider>
        <SymbolListProvider>{children}</SymbolListProvider>
      </SymbolSelectorProvider>
    );

    const { result, rerender } = renderHook(() => useSymbolList(), { wrapper });
		vi.spyOn(window, 'prompt').mockReturnValue('List A')
		result.current.handleCreateList()
		rerender()
		result.current.handleAddToList(["symbol-1", "symbol-2"]);
		rerender()
		expect(result.current.lists).toEqual([{
			label: "List A",
			value: "List A",
			symbols: ["symbol-1", "symbol-2"],
		}]);
  });
});
