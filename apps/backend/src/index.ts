import { databaseConnection } from '@repo/database';
import dotenv from 'dotenv';
import app from './app';
import { ConversationWebSocketServer } from './websockets/servers/conversation.websocket';

// Load environment variables
dotenv.config({ path: '../.env' });

const startServer = async () => {
    try {
        console.log("starting server ...")
        const connectionInstance = await databaseConnection();
        if (connectionInstance) {
            const port = process.env.PORT || 5000;
            // console.log(connectionInstance)
            console.log(`✅ MongoDB connected: ${connectionInstance.host}`);


            const server = app.listen(port, () => {
                console.log(`🚀HTTP Server is running on port ${port}`);
            });
            
            ConversationWebSocketServer.initialize(server);
            return server;
        }
    } catch (error) {
        console.error("❌ Database connection failed, retrying in 5 seconds...", error);
        setTimeout(startServer, 5000);
    }
};

// Start the server
startServer();