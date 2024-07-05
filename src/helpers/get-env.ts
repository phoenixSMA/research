import { env } from 'process';

export const getNumberEnv = (VAR_NAME: string): number |  null => {
	if (env.ENV_NAME !== undefined) {
		const result = Number(env.ENV_NAME);

		if (isNaN(result)) {
			return null;
		}

		return result;
	}

	return null;
}