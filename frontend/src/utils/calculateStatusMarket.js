export function calculateStatusMarket(budget = 0, boxOffice = 0) {
  const rawBudget = Number(budget) || 0;
  const rawBoxOffice = Number(boxOffice) || 0;
  
  const breakEven = rawBudget * 2.5;
  const multiplicador = rawBudget > 0 ? rawBoxOffice / rawBudget : 0;

  let status = "Prejuízo";
  let statusClassName = "text-red-400 border border-red-500/30";

  if (multiplicador >= 4.0) {
    status = "Fenômeno";
    statusClassName = "text-sky-400";
  } else if (rawBoxOffice >= breakEven) {
    status = "Lucrativo";
    statusClassName = "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
  } else if (rawBoxOffice > rawBudget) {
    status = "Quase Pago";
    statusClassName = "bg-amber-500/20 text-amber-400 border border-amber-500/30";
  }

  return {
    status,
    statusClassName,
    breakEven,
    multiplicador: multiplicador.toFixed(2)
  };
}
