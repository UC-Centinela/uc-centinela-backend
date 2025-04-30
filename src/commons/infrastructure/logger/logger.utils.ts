function safeStringify (obj: any, indent: number): string {
  let cache: any[] = []
  
  const stringified = JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === 'object' && value !== null) {
        // Detectar referencias circulares
        if (cache.includes(value)) {
          return '[Circular Reference]'
        }
        cache.push(value)
      }
      return value
    },
    indent
  )
  
  cache = null // Limpiar caché
  return stringified
}

export { safeStringify }