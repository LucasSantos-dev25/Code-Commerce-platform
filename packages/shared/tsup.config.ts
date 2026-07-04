import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: process.env.NODE_ENV === 'production',
  clean: true,
  sourcemap: true,
})