import * as Yup from 'yup';

const productFormSchema = Yup.object({
  category: Yup.string().required('Campo obrigatório'),
  subCategory: Yup.string(),
  productName: Yup.string().required('Campo obrigatório'),
  type: Yup.string(),
  quantity: Yup.number().min(1).required('A quantidade deve ser superior a 0!'),
  price: Yup.string()
    .test('is-greater-than-zero', 'O valor deve ser maior que 0', (value) => {
      if (!value) return false;
      const numeric = parseFloat(value.replace(/\./g, '').replace(',', '.'));
      return numeric > 0;
    })
    .required('Campo obrigatório'),
});

export default productFormSchema;
