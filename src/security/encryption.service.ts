import * as crypto from 'crypto';

/**
 * ENCRYPTION_KEY environment variable must be a 32-character string (32 bytes) for aes-256-gcm.
 * Example: export ENCRYPTION_KEY="0123456789abcdef0123456789abcdef"
 * If not set or incorrect length, a default insecure key will be used (not recommended for production).
 */
export class EncryptionService {
  private algorithm = 'aes-256-gcm';
  private key: Buffer;

  constructor() {
    // The key must be 32 bytes for aes-256-gcm
    this.key = Buffer.from(
      (process.env.ENCRYPTION_KEY && process.env.ENCRYPTION_KEY.length === 32)
        ? process.env.ENCRYPTION_KEY
        : '0123456789abcdef0123456789abcdef' // 32-byte fallback
    );
  }

  encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;
  }

  decrypt(encrypted: string): string {
    const [ivHex, authTagHex, encryptedText] = encrypted.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

export const encryptionService = new EncryptionService();
