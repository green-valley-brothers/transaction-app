import { createContext, useState, useContext, useReducer} from 'react';
import { cashBookReducer, initialState } from '../reducer';

export const CashBookContext = createContext();

export function CashBookProvider({children}){
  const [state, dispatch] = useReducer(cashBookReducer, initialState)

  const addTransaction = (transaction) => {
    dispatch({type: 'ADD_TRANSACTION', payload: transaction})
  }

  const deleteTransaction = (id) => {
    dispatch({type: 'DELETE_TRANSACTION', payload: id})
  }

  return (
    <CashBookContext.Provider value={{transactions: state.transactions, addTransaction, deleteTransaction}}>
      {children}
    </CashBookContext.Provider>
  )
}

export function useCashBook(){
  const context = useContext(CashBookContext);

  if(context === undefined){
    throw new Error('useCashBook must be used within a CashBookProvider')
  }

  return context
}