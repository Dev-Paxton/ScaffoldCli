import { Entity } from "../types/Entity";

export type inquirerChoice<Value> = {
    name?: string;
    value: Value;
    short?: string;
    disabled?: boolean | string;
    checked?: boolean;
    type?: never;
};

export default class Component implements Entity {
    name: string;
    path: string;
    create: () => void;
    choice: inquirerChoice<string>; 
    dependencies: string[];

    constructor (options: {
        name: string;
        path: string
        create: () => void
        choice: inquirerChoice<string> 
        dependencies: string[];
    }) {
        this.name = options.name
        this.path = options.path
        this.create = options.create
        this.choice = options.choice
        this.dependencies = options.dependencies
    }
}