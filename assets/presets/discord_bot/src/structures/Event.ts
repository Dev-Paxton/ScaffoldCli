import { ClientEvents } from "discord.js"
import ExtendedClient from "./ExtendedClient"

export default class Event<Key extends keyof ClientEvents> {
    name: Key
    once: boolean
    execute: (client: ExtendedClient, ...args: ClientEvents[Key]) => void

    constructor(optins: { 
        name: Key, 
        once: boolean, 
        execute: (client: ExtendedClient, ...args: ClientEvents[Key]) => void
    }) {
        this.name = optins.name
        this.once = optins.once
        this.execute = optins.execute
    }
}