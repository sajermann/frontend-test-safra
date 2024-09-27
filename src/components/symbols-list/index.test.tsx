/**
 * @vitest-environment jsdom
 */
import { fireEvent, render } from "@testing-library/react";
import { it, describe, expect, vi } from "vitest";
import { SymbolList } from "./";
import { SymbolSelectorProvider } from "../../context/useSymbolSelector";
import { SymbolListProvider } from "../../context/useSymbolList";
import * as useSymbolListOriginal from "../../context/useSymbolList";
import { SymbolListContext } from "../../types/symbol-list-context.type";

function Mock() {
  return (
    <SymbolSelectorProvider>
      <SymbolListProvider>
        <SymbolList />
      </SymbolListProvider>
    </SymbolSelectorProvider>
  );
}

describe("Components/SymbolsList", () => {
  it(`should change list`, () => {
    const mockSet = vi.fn();
    const mockText = "List B";
    vi.spyOn(useSymbolListOriginal, "useSymbolList").mockImplementation(
      () =>
        ({
          biances: [
            {
              stream: "ltcbtc@ticker",
              data: {
                e: "24hrTicker",
                E: 1727276791001,
                s: "LTCBTC",
                p: "0.00000400",
                P: "0.382",
                w: "0.00104017",
                x: "0.00104800",
                c: "0.00105200",
                Q: "0.70000000",
                b: "0.00105100",
                B: "336.45200000",
                a: "0.00105200",
                A: "578.74400000",
                o: "0.00104800",
                h: "0.00105500",
                l: "0.00103100",
                v: "52078.52200000",
                q: "54.17026782",
                O: 1727190391001,
                C: 1727276791001,
                F: 99990469,
                L: 100008743,
                n: 18275,
              },
            },
          ],
          lists: [
            { label: `List A`, value: `List A`, symbols: [] },
            { label: `List B`, value: `List B`, symbols: [] },
          ],
          setListSelected: mockSet,
        } as unknown as SymbolListContext)
    );

    // vi.spyOn(window, 'prompt').mockReturnValue('List B')

    const { getByTestId } = render(<Mock />);
    const result = getByTestId("select-list");
    fireEvent.change(result, { target: { value: mockText } });
    expect(mockSet).toBeCalledWith({
      label: mockText,
      value: mockText,
      symbols: [],
    });
  });

  it(`should change list`, () => {
    vi.spyOn(useSymbolListOriginal, "useSymbolList").mockImplementation(
      () =>
        ({
          biances: [],
          lists: [],
        } as unknown as SymbolListContext)
    );
    const { getByText } = render(<Mock />);
    expect(getByText("Please, add symbols and wait...")).not.toBeNull();
  });
});
