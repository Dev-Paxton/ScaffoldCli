#!/usr/bin/env node
import { select, checkbox } from '@inquirer/prompts'
import Config from './utils/Config'
import Preset from './structures/Preset'
import Component from './structures/Component'

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

    preset.create()
    for (const componentString of components) {
        const component = (await import(`${__dirname}/components/${componentString + __filename.slice(-3)}`)).default as Component
        component.create()
    }
}

main()