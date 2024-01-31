import crypto from "crypto";

export function comparePassword(
  originalPassword: string,
  storedPassword: string
): boolean {
  var salt = storedPassword.split("$")[0];
  var hash = storedPassword.split("$")[1];
  var hashVerify = crypto
    .pbkdf2Sync(originalPassword, salt, 1000, 512, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

export function hashPassword(password: string): string {
  var salt = crypto.randomBytes(128).toString("hex");
  var hash = crypto
    .pbkdf2Sync(password, salt, 1000, 512, "sha512")
    .toString("hex");
  return [salt, hash].join("$");
}
