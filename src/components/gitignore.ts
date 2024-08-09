import Component from "../structures/Component";
import fs from 'fs';
import Config from "../utils/Config";

const path = `${__dirname}/../assets/components/.gitignore`

export default new Component({
    name: 'gitignore',
    path: path,
    choice: {
        name: 'Gitignore',
        value: 'gitignore'
    },
    dependencies: [],
    create: () => {
        fs.cpSync(path, `${Config.dest}/.gitignore`)
    }
})