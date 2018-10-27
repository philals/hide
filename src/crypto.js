import { decrypt as dee, encrypt as enn } from "caesar-encrypt";

const shitft = 1;

let decrypt = value => {
  return decodeURIComponent(dee(value + "", shitft));
};
let encrypt = value => {
  return encodeURIComponent(enn(value + "", shitft));
};

export { decrypt, encrypt };

