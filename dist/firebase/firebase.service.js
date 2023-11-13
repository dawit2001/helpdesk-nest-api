"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseService = exports.auth = exports.uploadBytesResumable = exports.storage = exports.app = void 0;
const common_1 = require("@nestjs/common");
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
Object.defineProperty(exports, "uploadBytesResumable", { enumerable: true, get: function () { return storage_1.uploadBytesResumable; } });
const auth_1 = require("firebase/auth");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
};
exports.app = (0, app_1.initializeApp)(firebaseConfig);
exports.storage = (0, storage_1.getStorage)(exports.app);
exports.auth = (0, auth_1.getAuth)(exports.app);
let FirebaseService = exports.FirebaseService = class FirebaseService {
    constructor() { }
    async uploadAttachments(files) {
        const urls = await Promise.all(files.map(async (file) => {
            return new Promise((resolve, reject) => {
                const emailAttachmentRef = (0, storage_1.ref)(exports.storage, `attachment/${file.filename}`);
                const content = Buffer.from(file.content);
                const fileblob = new Uint8Array(content);
                const uploadTask = (0, storage_1.uploadBytesResumable)(emailAttachmentRef, fileblob, {
                    contentType: file.contentType,
                });
                uploadTask.on('state_changed', (snapshot) => {
                    const progress = Math.round(((snapshot.bytesTransferred / snapshot.totalBytes) * 100) / 5) * 5;
                    console.log(progress);
                }, (Error) => {
                    switch (Error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                    }
                }, async () => {
                    try {
                        const url = await (0, storage_1.getDownloadURL)(uploadTask.snapshot.ref);
                        resolve(url);
                        return url;
                    }
                    catch (e) {
                        reject(e.message);
                    }
                });
            });
        }));
        return urls;
    }
};
exports.FirebaseService = FirebaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FirebaseService);
//# sourceMappingURL=firebase.service.js.map