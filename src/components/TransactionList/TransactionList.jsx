import { useCashBook } from "../../state/context/CashBookContext";

export function TransactionList() {
  const { transactions, deleteTransaction } = useCashBook();

  const handleDelete = (id) => {
    deleteTransaction?.(id);
  };

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.description} - {transaction.amount}
            <button onClick={() => handleDelete(transaction.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
