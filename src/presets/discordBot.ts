import Preset from "../structures/Preset";
import fs from 'fs';
import Config from "../utils/Config";
import gitignore from "../components/gitignore";

const path = `${__dirname}/../assets/presets/discord_bot`

export default new Preset({
    name: 'discordBot',
    path: path, 
    componentChoices: [
        gitignore.choice
    ],
    dependencies: [ 'disocord.js', 'winston' ],
    devDependencies: [ 'typescript'],
    text: `Recommended scripts:
    "scripts": {
        "start": "node build/index.js",
        "deploy": "npm install && npm run build && npm run deploy-commands && npm start",
        "build": "tsc",
        "deploy-commands": "node build/deploy-commands.js",
        "dev": "ts-node src/index.ts",
        "deploy-dev-commands": "ts-node src/deploy-commands.ts"
    },`,
    create: () => {
        fs.cpSync(path, Config.dest, { recursive: true })
    }
})
