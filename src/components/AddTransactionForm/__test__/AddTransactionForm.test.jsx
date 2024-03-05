import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vitest, beforeEach } from "vitest";
import AddTransactionForm from "../AddTransactionForm";
import { useCashBook } from "../../../state/context/CashBookContext";

// Mock useCashBook hook
vitest.mock("../../../state/context/CashBookContext", () => ({
  useCashBook: vitest.fn(),
}));

describe("AddTransactionForm", () => {
  beforeEach(() => {
    useCashBook.mockReturnValue({
      addTransaction: vitest.fn(),
    });
  })
  it("renders the form", () => {
    render(<AddTransactionForm />);
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Amount")).toBeInTheDocument();
  });

  it("validates form inputs", async () => {
    render(<AddTransactionForm />);
    fireEvent.submit(screen.getByText("Add Transaction"));
    expect(await screen.findByText("Description is required")).toBeInTheDocument();
    // expect(await screen.findByText("Amount is required")).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    const addTransactionMock = vitest.fn();
    useCashBook.mockReturnValue({ addTransaction: addTransactionMock });

    render(<AddTransactionForm />);
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test description" },
    });
    fireEvent.change(screen.getByLabelText("Amount"), { target: { value: "100" } });
    fireEvent.click(screen.getByText("Add Transaction"));

    await waitFor(() => {
      expect(addTransactionMock).toHaveBeenCalledWith({
        description: "Test description",
        amount: 100,
        id: expect.any(Number),
      });
    });
  });
});
