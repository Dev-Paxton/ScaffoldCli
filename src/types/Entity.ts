export interface Entity {
    name: string
    path: string
    dependencies: string[]
    devDependencies: string[]
    create: () => void
}