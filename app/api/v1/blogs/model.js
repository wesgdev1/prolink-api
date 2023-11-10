import { hash, compare } from "bcrypt";

export const fields = [
  "id",
  "title",
  "content",
  "createdAt",
  "updatedAt",
  "url_foto",
];

export const encryptPassword = (password) => {
  return hash(password, 10);
};

export const verifyPassword = (password, encryptPassword) => {
  return compare(password, encryptPassword);
};
