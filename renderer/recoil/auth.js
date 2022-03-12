import { atom } from "recoil";

const authAtom = atom({
  key: "auth",
  default: null,
});

export { authAtom };
