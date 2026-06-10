export const runtimeFormat = (time) => {
  const hour = Math.floor(time / 60);
  const minutes = time % 60

  return `${hour}h ${minutes}m`
}

export const dateFormat = (date) => {
  const dateFormated = new Date(date).getFullYear();
  
  return dateFormated;
}