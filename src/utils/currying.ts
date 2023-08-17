export const curry = (fn: Function) => {
  const curried = (...args: any[]) =>
    args.length >= fn.length
      ? fn(...args)
      : (...moreArgs: any[]) => curried(...args, ...moreArgs)
  return curried
}
