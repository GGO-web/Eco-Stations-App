export function debounceFunction<T extends Function>(cb: T, wait = 300) {
  let h: NodeJS.Timeout;

  const callable = (...args: any) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };

  return <T>(<any>callable);
}
