module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "tsconfig.json",
		sourceType: "module"
	},
	plugins: [
		"@typescript-eslint/eslint-plugin",
		"eslint-plugin-import",
		"eslint-plugin-newline-destructuring",
		"eslint-plugin-unicorn"
	],
	extends: [
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended"
	],
	root: true,
	env: {
		node: true,
		jest: true
	},
	rules: {
		"array-bracket-newline": ["error", { "multiline": true }],
		"array-element-newline": [
			"error",
			{
				"ArrayExpression": { "minItems": 3, "multiline": true },
				"ArrayPattern": { "minItems": 3, "multiline": true },
			}
		],
		"@typescript-eslint/interface-name-prefix": "off",
		"space-before-blocks": "error",
		'@typescript-eslint/typedef': [
			'error',
			{
				parameter: true,
				arrowParameter: true,
				propertyDeclaration: true,
			},
		],
		"@typescript-eslint/explicit-function-return-type": "error",
		'@typescript-eslint/explicit-module-boundary-types': [
			'error',
			{
				allowArgumentsExplicitlyTypedAsAny: true,
				allowDirectConstAssertionInArrowFunctions: true,
				allowHigherOrderFunctions: true,
				allowTypedFunctionExpressions: true,
			},
		],
		"@typescript-eslint/no-explicit-any": "error",
		"newline-destructuring/newline" : "error",
		"import/order": [
			"error",
			{
				"groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
				"newlines-between": "always"
			}
		],
		"@typescript-eslint/padding-line-between-statements": [
			"error",
			{
				blankLine: "always",
				prev: "*",
				next: [
					"return",
					"throw",
					"break",
					"continue",
					"block-like",
					"multiline-expression",
					"singleline-const",
					"singleline-let",
					"multiline-const",
					"multiline-let",
				]
			},
			{
				blankLine: "always",
				next: "*",
				prev: [
					"block-like",
					"multiline-expression",
					"singleline-const",
					"singleline-let",
					"multiline-const",
					"multiline-let",
				]
			},
			{
				"blankLine": "any",
				"prev": ["singleline-const"],
				"next": ["singleline-const"]
			},
			{
				"blankLine": "any",
				"prev": ["singleline-let"],
				"next": ["singleline-let"]
			},
		],
		"unicorn/explicit-length-check": [
			"error",
		],
		"object-curly-spacing": ["error", "always"],
		"comma-spacing": ["error", { "before": false, "after": true }],
		quotes: ["error", "single", { avoidEscape: true }],
		semi: ["error", "always"],
		indent: ["error", "tab", { SwitchCase: 1, VariableDeclarator: 1 }],
		"no-unused-vars": "off",
		"no-unreachable": "error",
		"no-unused-expressions": "error",
		"no-unused-labels": "error",
		"@typescript-eslint/adjacent-overload-signatures": "error",
		"@typescript-eslint/array-type": [
			"error",
			{
				default: "array"
			}
		],
		"@typescript-eslint/ban-ts-comment": "error",
		/* ts\tsx 509 errors */
		"@typescript-eslint/ban-types": [
			"off",
			{
				types: {
					Object: {
						message: "Avoid using the `Object` type. Did you mean `object`?"
					},
					Function: {
						message: "Avoid using the `Function` type. Prefer a specific function type, like `() => void`."
					},
					Boolean: {
						message: "Avoid using the `Boolean` type. Did you mean `boolean`?"
					},
					Number: {
						message: "Avoid using the `Number` type. Did you mean `number`?"
					},
					String: {
						message: "Avoid using the `String` type. Did you mean `string`?"
					},
					Symbol: {
						message: "Avoid using the `Symbol` type. Did you mean `symbol`?"
					}
				}
			}
		],
		"@typescript-eslint/brace-style": ["error", "1tbs", { allowSingleLine: true }],
		"@typescript-eslint/consistent-type-assertions": [
			"error",
			{
				assertionStyle: "as",
				objectLiteralTypeAssertions: "never"
			}
		],
		"@typescript-eslint/consistent-type-definitions": ["error", "interface"],
		"@typescript-eslint/dot-notation": "error",
		"@typescript-eslint/member-delimiter-style": "error",
		"@typescript-eslint/member-ordering": [
			"error",
			{
				default: [
					"signature",
					"public-static-field",
					"protected-static-field",
					"private-static-field",
					"public-instance-field",
					"protected-instance-field",
					"private-instance-field",
					"constructor",
					"public-instance-method",
					"public-static-method",
					"protected-instance-method",
					"protected-static-method",
					"private-instance-method",
					"private-static-method"
				]
			}
		],
		"@typescript-eslint/naming-convention": [
			"off",
			{ selector: "default", format: ["camelCase"], leadingUnderscore: "forbid", trailingUnderscore: "forbid" },
			{ selector: "variable", format: ["camelCase", "UPPER_CASE"] },
			{ selector: "typeLike", format: ["PascalCase"] },
			{ selector: "enumMember", format: ["PascalCase"] },
			{ selector: "memberLike", modifiers: ["private"], leadingUnderscore: "require", format: ["camelCase"] },
			{ selector: "memberLike", modifiers: ["protected"], leadingUnderscore: "require", format: ["camelCase"] }
		],
		"@typescript-eslint/no-for-in-array": "error",
		"@typescript-eslint/no-inferrable-types": [
			"error",
			{
				ignoreParameters: true,
				ignoreProperties: true
			}
		],
		"@typescript-eslint/no-misused-new": "error",
		"@typescript-eslint/no-non-null-assertion": "error",
		"@typescript-eslint/no-this-alias": "error",
		"@typescript-eslint/no-unnecessary-qualifier": "error",
		"@typescript-eslint/no-unnecessary-type-assertion": "error",
		"@typescript-eslint/no-unused-expressions": "error",
		"@typescript-eslint/prefer-function-type": "error",
		"@typescript-eslint/prefer-namespace-keyword": "error",
		"@typescript-eslint/quotes": ["error", "single", { avoidEscape: true, allowTemplateLiterals: true }],
		"@typescript-eslint/semi": ["error", "always"],
		"@typescript-eslint/type-annotation-spacing": "error",
		"arrow-parens": ["error", "always"],
		"comma-dangle": [
			"error",
			{
				arrays: "always-multiline",
				exports: "always-multiline",
				functions: "never",
				imports: "always-multiline",
				objects: "always-multiline"
			}
		],
		complexity: ["error", 13]
	},
	ignorePatterns: ["*.js"]
};
