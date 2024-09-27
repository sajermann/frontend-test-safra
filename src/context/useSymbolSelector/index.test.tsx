import { renderHook, waitFor } from "@testing-library/react";
import { it, describe, expect, vi } from "vitest";
import { SymbolSelectorProvider, useSymbolSelector } from ".";
import { SymbolListProvider } from "../useSymbolList";

describe("Context/UseSymbolSelector", async () => {
  it(`should add symbol to symbols selected list, after remove`, async () => {
    const wrapper = ({ children }: any) => (
      <SymbolSelectorProvider>
        <SymbolListProvider>{children}</SymbolListProvider>
      </SymbolSelectorProvider>
    );

    const { result, rerender } = renderHook(() => useSymbolSelector(), { wrapper });
    result.current.handleToggleSymbol("symbol-1");
    rerender()
    expect(result.current.symbolsSelected).toEqual(["symbol-1"]);
    result.current.handleToggleSymbol("symbol-1");
    rerender()
    expect(result.current.symbolsSelected).toEqual([]);
  });

  it(`should load symbols with success`, async () => {
    const wrapper = ({ children }: any) => (
      <SymbolSelectorProvider>
        <SymbolListProvider>{children}</SymbolListProvider>
      </SymbolSelectorProvider>
    );

    vi.spyOn(window, 'fetch').mockResolvedValue({
      ok: true,
      json:()=>({
        symbols: [{symbol: 'test-1'}, {symbol: 'test-2'}]
      })
    } as any)

    const { result } = renderHook(() => useSymbolSelector(), { wrapper });
    await waitFor(()=>{
      expect(result.current.symbols).toEqual(['test-1', 'test-2'])
    })

  });
});
