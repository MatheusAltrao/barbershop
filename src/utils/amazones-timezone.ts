const amazonesTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const CURRENT_TIME = new Date().toLocaleTimeString("pt-BR", {
  timeZone: amazonesTimeZone,
});
