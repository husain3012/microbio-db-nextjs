import { atom } from "recoil";

const uiAtom = atom({
  key: "ui",
  default: {
    isSearchModalVisible: false,
  },
});

export { uiAtom };
