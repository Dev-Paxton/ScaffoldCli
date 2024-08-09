import Component from "../structures/Component";
import fs from 'fs';
import Config from "../utils/Config";

const path = `${__dirname}/../assets/components/logger.ts`

export default new Component({
    name: 'logger',
    path: path,
    choice: {
        name: 'Winston logger',
        value: 'logger'
    },
    dependencies: [],
    create: () => {
        fs.cpSync(path, `${Config.dest}/src/utils/logger.ts`)
    }
})