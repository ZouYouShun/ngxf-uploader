type DirectoryEntry = {
  isDirectory: boolean;
  file: (cb: (file: any) => any, failCallback: (reason?: any) => void) => any;
  createReader: () => any;
  name: string;
};

const getFilesFromEntry = async (entry: DirectoryEntry, path = '') =>
  entry.isDirectory
    ? await readDir(entry, path)
    : [await readFile(entry, path)];

const readFile = (entry: DirectoryEntry, path = '') => {
  return new Promise((resolve, reject) => {
    entry.file((file) => {
      file.filepath = path + file.name;
      resolve(file);
    }, reject);
  });
};

const readDir = async (entry: DirectoryEntry, path: string) => {
  const dirReader = entry.createReader();
  const newPath = `${path + entry.name}/`;

  let files: any[] = [];
  let newFiles: any[];

  do {
    newFiles = await dirReadEntries(dirReader, newPath);
    files = files.concat(newFiles);
  } while (newFiles.length > 0);

  return files;
};

const dirReadEntries = (dirReader: any, path: string) => {
  return new Promise<any[]>((resolve, reject) => {
    dirReader.readEntries(async (entries: any) => {
      let files: any[] = [];
      for (const entry of entries) {
        const itemFiles = await getFilesFromEntry(entry, path);
        files = files.concat(itemFiles);
      }
      resolve(files);
    }, reject);
  });
};

/** get files from `webkitGetAsEntry` */
export const getFilesFromGetAsEntry = async (e: DragEvent) => {
  const files: File[] = [];

  const { items } = e.dataTransfer || {};

  if (items) {
    for (let i = 0; i < items.length; i++) {
      const entry = items[i].webkitGetAsEntry();
      const result = await getFilesFromEntry(entry as any);

      files.push(...result);
    }
  }

  return files;
};
