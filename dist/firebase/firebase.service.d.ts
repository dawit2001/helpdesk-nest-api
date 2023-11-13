import { uploadBytesResumable } from 'firebase/storage';
export declare const app: import("@firebase/app").FirebaseApp;
export declare const storage: import("@firebase/storage").FirebaseStorage;
export { uploadBytesResumable };
export declare const auth: import("@firebase/auth").Auth;
export declare class FirebaseService {
    constructor();
    uploadAttachments(files: any[]): Promise<unknown[]>;
}
