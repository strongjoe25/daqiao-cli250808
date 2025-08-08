import logSymbols from "log-symbols"

// 提供四个符号
const log = {
    success: (message:string) => {
        console.log(logSymbols.success, message)
    },
    warn: (message:string) => {
        console.log(logSymbols.warning, message)
    },
    error: (message:string) => {
        console.log(logSymbols.error, message)
    },
    info: (message:string) => {
        console.log(logSymbols.info, message)
    }
}

export default log