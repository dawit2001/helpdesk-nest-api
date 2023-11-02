declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private static authSerivce;
    constructor();
    private static extractJWTFromCookie;
    validate(payload: any): Promise<{
        userId: any;
        username: any;
    }>;
}
export {};
