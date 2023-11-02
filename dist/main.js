"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app_module_1 = require("./app.module");
const dotenv_1 = __importDefault(require("dotenv"));
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
async function bootstrap() {
    dotenv_1.default.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    app.enableCors({
        origin: ['http://localhost:3000', 'https://kns-support.vercel.app'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        credentials: true,
        exposedHeaders: ['Authorization'],
    });
    app.use((0, cookie_parser_1.default)());
    await app.listen(8000);
}
bootstrap();
//# sourceMappingURL=main.js.map