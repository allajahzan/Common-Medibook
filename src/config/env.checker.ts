export const EnvChecker = (value: string, type: string) => {
    return value ? `${type} is defined` : `${type} is not defined`
}