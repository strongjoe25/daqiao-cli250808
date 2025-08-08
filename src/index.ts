#!usr/bin/env node
import  {Command} from 'commander';
import { version } from '../package.json';
import { create } from './command/create';


const program = new Command('daqiao')
program.version(version, "-V, --version")

program.command('create').description('创建一个新项目').argument('[name]', '项目名称').action(async (dirname) => {
    await create(dirname)
})

program.parse()