import { Client, Collection, ClientEvents, GatewayIntentBits } from "discord.js"
import Config from "../utils/Config"
import path from "path"
import fs from "fs"
import Command from "./Command"
import Event from "./Event"

const intents: GatewayIntentBits[] = [
    GatewayIntentBits.Guilds,
]

export default class ExtendedClient extends Client {
    commands: Collection<string, Command> = new Collection()

    constructor() {
        super({ intents })
    }

    start() {
        this.importCommandsAndEvents()
        this.login(Config.bot.token)
    }

    async importCommandsAndEvents() {
        const fileExtension = __filename.slice(-3)
        
        // Commands
        const commandDirPath = path.join(__dirname, "..", "commands")
        const commandFiles = fs.readdirSync(commandDirPath).filter(file => file.endsWith(fileExtension))

        for (const file of commandFiles) {
            const command = (await import(path.join(commandDirPath, file))).default as Command
            this.commands.set(command.data.name, command)
        }

        // Events
        const eventDirPath = path.join(__dirname, "..", "events")
        const eventFiles = fs.readdirSync(eventDirPath).filter(file => file.endsWith(fileExtension))

        for (const file of eventFiles) {
            const event = (await import(path.join(eventDirPath, file))).default as Event<keyof ClientEvents>
            if (event.once) this.once(event.name, (...args) => event.execute(this, ...args))
            else this.on(event.name, (...args) => event.execute(this, ...args))
        }
    }
}