export interface Entity {
    name: string
    path: string
    dependencies: string[]
    create: () => void
}