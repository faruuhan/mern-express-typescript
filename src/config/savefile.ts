import fs from "fs-extra";

export const savefile = async (dest: any, file: any) => {
  try {
    await fs.move("src/temp/" + file.split(".")[0], dest + "/" + file, { overwrite: true });
  } catch (error: any) {
    console.log(error);
  }
};
