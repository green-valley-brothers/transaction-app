import { describe, it, expect, vitest, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TransactionList from "../TransactionList";
import { useCashBook } from "../../../state/context/CashBookContext";

// Mock useCashBook hook
vitest.mock("../../../state/context/CashBookContext", () => ({
  useCashBook: vitest.fn(),
}));

describe("TransactionList", () => {
  beforeEach(() => {
    useCashBook.mockReturnValue({
      transactions: [
        { id: 1, description: 'Transaction 1', amount: 50 },
        { id: 2, description: 'Transaction 2', amount: -30 },
      ],
      addTransaction: vitest.fn(),
      deleteTransaction: vitest.fn(),
    });
  });

  it("renders without crashing", () => {
    render(<TransactionList />);

    expect(screen.queryByText("Transactions")).toBeInTheDocument();
  });
});
