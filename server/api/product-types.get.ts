export default defineEventHandler(() => {
  const types = [
    { type: 'unidade', shortType: 'un' },
    { type: 'pacote', shortType: 'pac' },
    { type: 'caixa', shortType: 'cx' },
    { type: 'quilo', shortType: 'kg' },
    { type: 'grama', shortType: 'g' },
    { type: 'litro', shortType: 'l' },
    { type: 'mililitro', shortType: 'ml' },
    { type: 'metro', shortType: 'm' },
    { type: 'sachê', shortType: 'sachê' },
    { type: 'dúzia', shortType: 'dz' },
    { type: 'par', shortType: 'par' },
    { type: 'a granel (balança)', shortType: 'balança' },
  ];

  return types;
});
