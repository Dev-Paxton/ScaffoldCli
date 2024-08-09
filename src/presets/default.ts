import config from "../components/config";
import Preset from "../structures/Preset";
import fs from 'fs';
import Config from "../utils/Config";
import gitignore from "../components/gitignore";
import logger from "../components/logger";

const path = `${__dirname}/../assets/presets/default`

export default new Preset({
    name: 'default',
    path: path, 
    componentChoices: [
        config.choice, gitignore.choice, logger.choice
    ],
    dependencies: [],
    devDependencies: [ 'typescript', 'ts-node'],
    create: () => {
        fs.cpSync(path, Config.dest, { recursive: true })
    }
})
