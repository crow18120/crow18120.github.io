export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function jsUcfirst(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
