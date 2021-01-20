import * as bodyParser from 'body-parser'
import * as express from 'express'
import { Logger } from "./logger/logger"
import Routes from './routes'

class App {

    public express: express.Application
    public logger: Logger

    public users: any[]

    constructor() {
        this.express = express()
        this.middleware()
        this.routes()
        this.users = []
        this.logger = new Logger()
    }

    // express middleware
    private middleware(): void {
        this.express.use(bodyParser.json())
        this.express.use(bodyParser.urlencoded({ extended: false }))
    }

    private routes(): void {
        this.express.get("/", (req, res, next) => {
            res.send("Backend works!!!")
        })

        this.express.use("/api", Routes)

        // undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct!!!")
        })
    }
}


export default new App().express