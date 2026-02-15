/* eslint-disable @typescript-eslint/no-explicit-any */
type RouteFn = (...args: any[]) => string

type RouteDef<A extends any[] = any[]> = {
  path: string
  to: (...args: A) => string
}

type RoutesShape = {
  [key: string]: string | RouteFn | RouteDef<any> | RoutesShape
}

type Join<Base extends string, P extends string> = P extends `/${string}`
  ? `${Base}${P}`
  : `${Base}/${P}`

type CreateRoutes<T extends RoutesShape, Base extends string = ''> = {
  [K in keyof T]: T[K] extends string
    ? Join<Base, T[K]>
    : T[K] extends (...args: infer A) => infer R
      ? (...args: A) => Join<Base, Extract<R, string>>
      : T[K] extends {
            path: infer P extends string
            to: (...args: infer A) => infer R
          }
        ? {
            path: Join<Base, P>
            to: (...args: A) => Join<Base, Extract<R, string>>
          }
        : { root: `${Base}/${Extract<K, string>}` } & CreateRoutes<
            Extract<T[K], RoutesShape>,
            `${Base}/${Extract<K, string>}`
          >
}

export function createRoutes<T extends RoutesShape>(
  base: string,
  shape: T,
): { root: string } & CreateRoutes<T, typeof base> {
  const join = (prefix: string, value: string) =>
    value.startsWith('/') ? prefix + value : `${prefix}/${value}`

  const isRouteDef = (v: unknown): v is RouteDef<any> =>
    !!v &&
    typeof v === 'object' &&
    'path' in v &&
    'to' in v &&
    typeof (v as any).path === 'string' &&
    typeof (v as any).to === 'function'

  const build = (prefix: string, tree: RoutesShape) => {
    const result: Record<string, unknown> = { root: prefix }

    for (const [key, value] of Object.entries(tree)) {
      if (typeof value === 'string') {
        result[key] = join(prefix, value)
        continue
      }

      if (typeof value === 'function') {
        result[key] = (...args: any[]) => join(prefix, value(...args))
        continue
      }

      if (isRouteDef(value)) {
        result[key] = {
          path: join(prefix, value.path),
          to: (...args: any[]) => join(prefix, value.to(...args)),
        }
        continue
      }

      result[key] = build(`${prefix}/${key}`, value)
    }

    return result
  }

  return build(base, shape) as any
}
