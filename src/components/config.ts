import fs from "fs";
import Component from "../structures/Component";
import Config from "../utils/Config";

const path = `${__dirname}/../assets/components/config`

export default new Component({
    name: 'config',
    path: path,
    choice: {
        name: 'Config',
        value: 'config'
    },
    dependencies: [],
    create: () => {
        switch(Config.preset) {
            case 'default':
                fs.cpSync(`${path}/config`, `${Config.dest}/config`, { recursive: true })
                fs.cpSync(`${path}/Config.ts`, `${Config.dest}/src/utils/Config.ts`)
        }
    }
})