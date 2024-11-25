export const EnvChecker = (value: string, type: string) : void => {
    if (!value) throw new Error(`${type} is not defined`);
};
