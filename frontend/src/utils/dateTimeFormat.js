export const runtimeFormat = (time) => {
  const hour = Math.floor(time / 60);
  const minutes = time % 60

  return `${hour}h ${minutes}m`
}

export const dateFormat = (date) => {
  const dateFormated = new Date(date).toLocaleDateString('pt-BR');
  
  return dateFormated;
}

export const yearFormat = (date) => {
  const dateFormated = new Date(date).getFullYear();
  
  return dateFormated;
}

export const currencyFormat = (valor) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
};