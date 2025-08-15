export default defineEventHandler(() => {
  const types = [
    { tipo: 'unidade', sigla: 'un' },
    { tipo: 'pacote', sigla: 'pac' },
    { tipo: 'caixa', sigla: 'cx' },
    { tipo: 'quilo', sigla: 'kg' },
    { tipo: 'grama', sigla: 'g' },
    { tipo: 'litro', sigla: 'l' },
    { tipo: 'mililitro', sigla: 'ml' },
    { tipo: 'metro', sigla: 'm' },
    { tipo: 'sachê', sigla: 'sachê' },
    { tipo: 'dúzia', sigla: 'dz' },
    { tipo: 'par', sigla: 'par' },
    { tipo: 'a granel (balança)', sigla: 'balança' },
  ];

  return types;
});
