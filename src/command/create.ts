import {input, select} from "@inquirer/prompts"
import {clone} from "../utils/clone"
import path from "path"
import fs from 'fs-extra';
import { gt } from "lodash";
import axios from "axios";

interface TemplateInfo {
    name: string,
    downloadUrl: string,
    description: string,
    branch: string
}

const templateList:Map<string,TemplateInfo> = new Map([
    [
        'VITE-VUE3-TYPESCRIPT-template',
        {
            name: 'Vite-Vue3-Typescript-tempalte',
            downloadUrl: "https://gitee.com/strongjoe/daqiao-cli.git",
            description: "这是构建vue的模版",
            branch: "main"
        }
    ],
    [
        'VITE-VUE3-H5-template',
        {
            name: 'Vite-Vue3-Typescript-tempalte',
            downloadUrl: "https://github.com/vuejs/vue-cli.git",
            description: "这是构建h5的模版",
            branch: "main"
        }
    ]
])

console.log('templateList=', templateList.get('VITE-VUE3-TYPESCRIPT-template'))
console.log('templateList object entries=', Object.entries(templateList))
console.log('templateList object keys=', Object.keys(templateList))

const templates = Array.from(templateList).map((item: [string, TemplateInfo]) => {
    const [name, info] = item
    return {
        name,
        value: name,
        description: info.description,
    }
})

function isOverWriten(){
    return select({
        message: "检测到项目已经存在，是否覆盖?",
        choices: [
            {name: "覆盖",value: true},
            {name: '取消', value: false}
        ]
    })

}

async function getNpmVersion(){
    const url = 'https://www.npmjs.com/package/@strongjoe/vuecli'
    const data = await axios.get(url)
    console.log(data)
}
async function checkVersion(){
    await getNpmVersion()
}

export async function create(dirname: string){
    if(!dirname) dirname = await input({message: '请输入项目名称'})
    
    // 先检查是否存在模版，如果存在，是否覆盖，重新下载；
    // 再检查本地版本和远程版本号是否一致，不一致提示用户更新；    
    const filePath = path.resolve(process.cwd(), dirname)  
    if(filePath){
        const run = await isOverWriten()
        if(run){
            fs.remove(filePath)
        } else {
            //
        }
    } 

    await checkVersion()

    const templateName = await select({
        message: '请选择模版',
        choices: templates
    })

    const gitRepoInfo = templateList.get(templateName)
    console.log('info',gitRepoInfo)

    if(gitRepoInfo){
        await clone(gitRepoInfo.downloadUrl, dirname, ['-b', gitRepoInfo.branch])
    } else {
        // log.error('请输入项目名称')
    }
}