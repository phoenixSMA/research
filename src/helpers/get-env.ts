import { env } from 'process';

export const getNumberEnv = (VAR_NAME: string): number |  null => {
	if (env[VAR_NAME] !== undefined) {
		const result = Number(env[VAR_NAME]);

		if (isNaN(result)) {
			return null;
		}

		return result;
	}

	return null;
}