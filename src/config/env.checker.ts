export const EnvChecker = (value: string, type: string) => {
    if (!value) {
        throw new Error(`${type} must be defined`)
    }else{
        return `${type} defined`
    }
}