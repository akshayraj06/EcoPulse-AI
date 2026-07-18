import bcrypt from "bcryptjs";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, "..", "data");
const storePath = path.join(dataDir, "offline-users.json");

const readUsers = async () => {
  try {
    const raw = await fs.readFile(storePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const writeUsers = async (users) => {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(users, null, 2));
};

const toAuthUser = (user) => ({
  _id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const registerOfflineUser = async ({ name, email, password, role }) => {
  const users = await readUsers();
  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = users.find((user) => user.email === normalizedEmail);

  if (existingUser) {
    const error = new Error("An account with this email already exists");
    error.statusCode = 409;
    throw error;
  }

  const user = {
    id: crypto.randomUUID(),
    name,
    email: normalizedEmail,
    password: await bcrypt.hash(password, 10),
    role,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  await writeUsers(users);
  return toAuthUser(user);
};

export const loginOfflineUser = async ({ email, password }) => {
  const users = await readUsers();
  const normalizedEmail = email.toLowerCase().trim();
  const user = users.find((item) => item.email === normalizedEmail);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  return toAuthUser(user);
};

export const getOfflineUserById = async (id) => {
  const users = await readUsers();
  const user = users.find((item) => item.id === id);
  return user ? toAuthUser(user) : null;
};

export const isDatabaseAuthError = (error) => {
  const message = `${error?.message || ""} ${error?.reason || ""}`.toLowerCase();
  return (
    error?.name === "MongoNetworkError" ||
    error?.name === "MongoServerSelectionError" ||
    message.includes("ssl") ||
    message.includes("tls") ||
    message.includes("server selection") ||
    message.includes("buffering timed out") ||
    message.includes("querysrv") ||
    message.includes("etimeout") ||
    message.includes("enotfound") ||
    message.includes("timeout") ||
    message.includes("econnreset")
  );
};
