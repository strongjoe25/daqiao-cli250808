import simpleGit, {SimpleGit, SimpleGitOptions} from "simple-git" // git clone远程仓库地址
import log from "./log" // 日志打印
import createLogger from "progress-estimator" // 进度条
import chalk from "chalk" // 字体颜色
const figlet = require( "figlet") // 字体优化
import logSymbols from "log-symbols"

// 配置进度动画样式和间隔
const logger = createLogger({
    spinner: {
        interval: 100,
        frames: ["+", "=", "-", "*"].map(item => chalk.yellow(item))
    }
})

const goodSpinner = async () =>{
    const data = await figlet('daqiao-cli')
    console.log(chalk.green.visible(data))
}

// 配置git 克隆代码
const gitOptions:Partial<SimpleGitOptions> = {
    baseDir: process.cwd(),
    binary: "git",
    maxConcurrentProcesses: 6
}


export async function clone(url: string, prjName: string, options: string[]): Promise<any>{
    const git:SimpleGit = simpleGit(gitOptions)
    try {
        await logger(git.clone(url, prjName, options), '正在下载中...', {estimate: 5000})
        goodSpinner()
        console.log(chalk.blue('下载成功'))
        console.log(chalk.blue('=============================='))
        console.log(chalk.blue('==欢迎使用daqiao-cli 脚手架==-==='))
        console.log(chalk.blue('=============================='))
        console.log(logSymbols.success,logSymbols.error,logSymbols.warning,logSymbols.info)

        log.success(chalk.blue(`项目创建成功 ${chalk.blueBright(prjName)}`))
        log.success(chalk.blue('执行以下命令启动项目'))
        log.info(`cd ${chalk.blue('构建vue模版')}`)
        log.warn(`${chalk.yellowBright('pnpm')} install`)
        log.error(`${chalk.yellowBright('pnpm')} run dev`)

    }catch {
        log.error('出错了')
    }
}