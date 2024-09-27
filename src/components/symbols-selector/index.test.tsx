/**
 * @vitest-environment jsdom
 */
import { fireEvent, render } from "@testing-library/react";
import { it, describe, expect, vi } from "vitest";
import { SymbolsSelector } from "./";
import { SymbolSelectorProvider } from "../../context/useSymbolSelector";
import { SymbolListProvider } from "../../context/useSymbolList";
import * as useSymbolListOriginal from "../../context/useSymbolList";
import * as useSymbolSelectorOriginal from "../../context/useSymbolSelector";
import { SymbolSelectorContext } from "../../types/symbol-selector-context.type";
import { SymbolListContext } from "../../types/symbol-list-context.type";

function Mock() {
  return (
    <SymbolSelectorProvider>
      <SymbolListProvider>
        <SymbolsSelector />
      </SymbolListProvider>
    </SymbolSelectorProvider>
  );
}

describe("Components/SymbolsSelector", () => {
  it(`should select symbol`, () => {
    const mockToggle = vi.fn();
    vi.spyOn(useSymbolSelectorOriginal, "useSymbolSelector").mockImplementation(
      () =>
        ({
          symbols: ["symbol-1", "symbol-2"],
          handleToggleSymbol: mockToggle,
          symbolsSelected: {
            findIndex: () => 0,
          },
        } as unknown as SymbolSelectorContext)
    );

    const { container } = render(<Mock />);
    const result = container.querySelectorAll("input[type='checkbox'");
    expect(result.length).toBe(2);
    fireEvent.click(result[0]);
    expect(mockToggle).toBeCalledWith("symbol-1");
  });

  it(`should add symbols to list`, () => {
    const mockAddToList = vi.fn();
    vi.spyOn(useSymbolSelectorOriginal, "useSymbolSelector").mockImplementation(
      () =>
        ({
          symbols: ["symbol-1", "symbol-2"],
          symbolsSelected: ["symbol-1", "symbol-2"],
        } as unknown as SymbolSelectorContext)
    );
    vi.spyOn(useSymbolListOriginal, "useSymbolList").mockImplementation(
      () =>
        ({
          lists: [
            { label: `List A`, value: `List A`, symbols: [] },
            { label: `List B`, value: `List B`, symbols: [] },
          ],
          handleAddToList: mockAddToList,
        } as unknown as SymbolListContext)
    );

    const { getByText } = render(<Mock />);
    const result = getByText("Add to List");
    fireEvent.click(result);
    expect(mockAddToList).toBeCalledWith(["symbol-1", "symbol-2"]);
  });
});
