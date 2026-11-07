// Node 原生运行 TypeScript 时要求显式扩展名；
// 该钩子为无扩展名的相对导入补上 .ts/.tsx/index.ts，供 tests 与 scripts 使用。
import { register } from 'node:module';

register(import.meta.url);

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('.') && context.parentURL?.startsWith('file:')) {
    try {
      return await nextResolve(specifier, context);
    } catch (error) {
      if (error?.code !== 'ERR_MODULE_NOT_FOUND') {
        throw error;
      }

      const candidates = [`${specifier}.ts`, `${specifier}.tsx`, `${specifier}/index.ts`];
      for (const candidate of candidates) {
        try {
          return await nextResolve(candidate, context);
        } catch {
          // 继续尝试下一个候选
        }
      }

      throw error;
    }
  }

  return nextResolve(specifier, context);
}
