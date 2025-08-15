export default defineEventHandler(() => {
  const categorys = [
    {
      category: 'Bebidas',
      subCategorys: [
        'Água',
        'Refrigerantes',
        'Sucos e Néctares',
        'Energéticos',
        'Cervejas',
        'Vinhos',
        'Destilados',
        'Bebidas Lácteas',
      ],
    },
    {
      category: 'Hortifruti',
      subCategorys: ['Frutas', 'Verduras', 'Legumes', 'Temperos e Ervas', 'Orgânicos'],
    },
    {
      category: 'Padaria e Confeitaria',
      subCategorys: ['Pães', 'Bolos', 'Tortas', 'Biscoitos e Bolachas', 'Salgados', 'Doces e Sobremesas'],
    },
    {
      category: 'Carnes e Peixes',
      subCategorys: ['Carnes Bovinas', 'Carnes Suínas', 'Aves', 'Peixes', 'Frutos do Mar', 'Linguiças e Embutidos'],
    },
    {
      category: 'Laticínios e Frios',
      subCategorys: ['Leites', 'Queijos', 'Iogurtes', 'Manteigas e Margarinas', 'Requeijão', 'Presuntos e Mortadelas'],
    },
    {
      category: 'Mercearia',
      subCategorys: [
        'Arroz',
        'Feijão',
        'Massas',
        'Farinha',
        'Açúcar',
        'Óleos e Azeites',
        'Enlatados',
        'Molhos e Temperos',
        'Cereais e Aveias',
      ],
    },
    {
      category: 'Congelados',
      subCategorys: [
        'Legumes Congelados',
        'Pizzas Congeladas',
        'Hambúrgueres e Empanados',
        'Pratos Prontos',
        'Sorvetes e Picolés',
      ],
    },
    {
      category: 'Limpeza',
      subCategorys: [
        'Desinfetantes',
        'Detergentes',
        'Sabão em Pó e Líquido',
        'Amaciantes',
        'Esponjas e Panos',
        'Limpadores Multiuso',
      ],
    },
    {
      category: 'Higiene e Cuidados Pessoais',
      subCategorys: [
        'Sabonetes',
        'Shampoos e Condicionadores',
        'Papel Higiênico',
        'Creme Dental',
        'Desodorantes',
        'Absorventes',
      ],
    },
    {
      category: 'Pets',
      subCategorys: ['Ração para Cães', 'Ração para Gatos', 'Petiscos', 'Areia Sanitária', 'Acessórios para Pets'],
    },
  ];

  return categorys;
});
