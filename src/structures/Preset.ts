import { Separator } from "@inquirer/checkbox";
import { Entity } from "../types/Entity";
import { inquirerChoice } from "./Component";

export default class Preset implements Entity {
    name: string;
    path: string;
    create: () => void;
    componentChoices: readonly (Separator | inquirerChoice<string>)[]
    dependencies: string[];
    
    constructor(options: {
        name: string;
        path: string,
        create: () => void
        componentChoices: readonly (Separator | inquirerChoice<string>)[]
        dependencies: string[];
    }) {
        this.name = options.name
        this.path = options.path
        this.create = options.create
        this.componentChoices = options.componentChoices
        this.dependencies = options.dependencies
    }
}