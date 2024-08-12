import Event from "../structures/Event"
import { logger } from "../utils/logger"

export default new Event({
    name: "ready",
    once: true,
    execute: (client) => {
        if (client.isReady()) {
            logger.info(`Logged in as ${client.user.tag}`)
        }
    }
})