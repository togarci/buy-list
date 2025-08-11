import * as Yup from 'yup';

const schema = Yup.object({
  category: Yup.string().required('Campo obrigatório'),
  subCategory: Yup.string(),
  productName: Yup.string().required('Campo obrigatório'),
  type: Yup.string(),
  quantity: Yup.number()
    .min(1)
    .required('A quantidade deve ser superior a 0 !'),
  price: Yup.number().min(1).required('O preço deve ser superior a 0 !'),
});

export default schema;
