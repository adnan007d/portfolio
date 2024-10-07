---
title: My tsconfig and eslint configuration for Node.js
description: My tsconfig and eslint configuration I use for all my projects as a starting point.
type:
  - snippet
tags:
  - typescript
  - eslint
published: true
date: 'September 21 2024'
---

> Note: I will be using eslint 9 which uses the new [flat config](https://eslint.org/blog/2024/04/eslint-v9.0.0-released/)

Install the dependencies

```shell
pnpm i -D typescript typescript-eslint @eslint/js @types/eslint__js  eslint
```

File: **tsconfig.json**

You can remove some options depending on your use case

```json
{
	"compilerOptions": {
		/* Visit https://aka.ms/tsconfig to read more about this file */
		/* Projects */
		"incremental": true,
		/* Language and Environment */
		"target": "esnext",
		/* Modules */
		"module": "nodenext",
		"moduleResolution": "nodenext",
		"paths": {
			"@/*": ["src/*"]
		},
		// "typeRoots": [],
		"noUncheckedSideEffectImports": true,
		"resolveJsonModule": true,
		/* JavaScript Support */
		"allowJs": true,
		"checkJs": true,
		/* Emit */
		"baseUrl": "./",
		"outDir": "./dist",
		/* Interop Constraints */
		"allowSyntheticDefaultImports": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		/* Type Checking */
		"strict": true,
		"noImplicitAny": true,
		"noImplicitThis": true,
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"exactOptionalPropertyTypes": true, // Depends on you
		"noImplicitReturns": true,
		"noFallthroughCasesInSwitch": true,
		"noUncheckedIndexedAccess": true, // Depends on you
		"noImplicitOverride": true,
		"useUnknownInCatchVariables": true,
		/* Completeness */
		"skipLibCheck": true
	},
	"include": ["src/**/*.ts", "tests/**/*.ts"]
}
```

File: **eslint.config.mjs**

You can remove prettier if you don't use it 
```shell
pnpm i -D eslint-config-prettier
```

```js
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	prettier,
	{
		ignores: ['node_modules/', 'dist/']
	},
	{
		rules: {
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			],
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{ prefer: 'type-imports', fixStyle: 'inline-type-imports' }
			]
		}
	}
);
```

Some eslint packages may not work out of the box due eslint using the newer **flat config**. Eslint
provides a package [@eslint/compat](https://www.npmjs.com/package/@eslint/compat) that can somewhat
accurately convert the old config to the new one. You can read about it [here](https://eslint.org/blog/2024/05/eslint-compatibility-utilities/)
