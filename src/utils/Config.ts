export default class Config {
    static dest: string
    static preset: string

    constructor () {
        if (process.argv[2] === undefined) {
            if (process.env.PWD === undefined) throw new Error("No path specified")
            else Config.dest = process.env.PWD
        } else Config.dest = process.argv [2]
    }
}

new Config()