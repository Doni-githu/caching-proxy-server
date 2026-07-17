#!/usr/bin/env node

import { Command } from "commander"
import server from "./server.js";
import redis from "./redis.js";

const program = new Command("something")

program
    .version("1.0.0")
    .description("Caching Proxy Server for learning")
    .option("--port <number>", "Specify the port number")
    .option("--origin <url>", "Specify the origin URL")
    .action(({port, origin}) => {
        try {
            if(!port && !origin) {
                console.log("Port or Origin not provided")
                process.exit(0)
            }
            server(port, origin).startServer()
        } catch (error) {
            console.log( "Error in starting server", error)
        }
    });
program 
    .command("clear")
    .action(() => {
        redis.flushall()
        console.log("Cache cleaned")
        process.exit()
    })

program.parse();