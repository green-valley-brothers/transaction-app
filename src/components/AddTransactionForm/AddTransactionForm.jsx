import { useCashBook } from "../../state/context/CashBookContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  amount: Yup.number().required("Amount is required").positive("Amount must be positive"),
});

export function AddTransactionForm() {
  const {addTransaction} = useCashBook()

  const handleSubmit = (values, {resetForm}) => {
    addTransaction({...values, id: Date.now()})
    resetForm()
  }

  return (
    <Formik
      initialValues={{description: '', amount: 0}}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({errors, touched}) => (
        <Form>
          <Field name="description" />
          {errors.description && touched.description ? (
            <div>{errors.description}</div>
          ): null}
          <Field name="amount" type="number" />
          {errors.amount && touched.amount ? (
            <div>{errors.amount}</div>
          ): null}
          <button type="submit">Add Transaction</button>
        </Form>
      )}
    </Formik>
  )
}

export default AddTransactionForm
