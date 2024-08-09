#!/usr/bin/env node
/* eslint-disable no-console */
import { select, checkbox } from '@inquirer/prompts'
import Config from './utils/Config'
import Preset from './structures/Preset'
import Component from './structures/Component'
const cliProgress = require('cli-progress')

async function main() {
    const presetString = await select({
        message: 'Select a preset',
        choices: [
            {
                name: 'Default',
                value: 'default'
            },
            {
                name: 'Discord bot',
                value: 'discordBot',
                disabled: true
            }
        ]
    })

    const preset = (await import(`${__dirname}/presets/${presetString + __filename.slice(-3)}`)).default as Preset

    Config.preset = preset.name

    const components = await checkbox({
        message: 'Select components',
        choices: preset.componentChoices
    })

    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
    progressBar.start(components.length + 1, 0)

    preset.create()
    const dependencies = new Set(preset.dependencies)
    const devDependencies = new Set(preset.devDependencies)
    progressBar.increment(1)

    for (const componentString of components) {
        const component = (await import(`${__dirname}/components/${componentString + __filename.slice(-3)}`)).default as Component
        component.dependencies.forEach(dependencie => dependencies.add(dependencie))
        component.devDependencies.forEach(dependencie => devDependencies.add(dependencie))
        progressBar.increment(1)
    }
    progressBar.stop()

    console.log("To install the required dependencies run")
    if (dependencies.size != 0) console.log(`   npm install ${Array.from(dependencies).join(" ")}`)
    if (devDependencies.size != 0) console.log(`   npm install --save-dev ${Array.from(devDependencies).join(" ")}`)
}

main()