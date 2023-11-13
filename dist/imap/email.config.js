"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
});
//# sourceMappingURL=email.config.js.map