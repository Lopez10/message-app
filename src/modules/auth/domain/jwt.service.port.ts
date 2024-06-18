export interface JwtServicePort {
	sign(payload: object): string;
	verify<T extends object>(token: string): T;
}
