// TODO: find correct type of that
type DirectoryEntry = {
  isDirectory: boolean;
  file: (cb: (file: any) => any, failCallback: Function) => any;
  createReader: () => any;
  name: string;
};

const getFilesFromEntry = async (entry: DirectoryEntry, path = '', structure = false) =>
  entry.isDirectory
    ? await readDir(entry, path, structure)
    : [await readFile(entry, path)];

const readFile = (entry: DirectoryEntry, path = '') => {
  return new Promise((resolve, reject) => {
    entry.file(file => {
      file.filepath = path?.length > 0 ? `${path}/${file.name}` : file.name;
      resolve(file);
    }, reject);
  });
};

const readDir = async (entry: DirectoryEntry, path: string, structure: boolean) => {
  const dirReader = entry.createReader();
  const newPath = path?.length > 0 ? `${path}/${entry.name}` : entry.name;

  if (!structure) {
    return await dirReadEntries(dirReader, newPath, structure);
  }

  return [
    {
      name: entry.name,
      children: await dirReadEntries(dirReader, newPath, structure),
      isDirectory: true,
      parent: path
    }
  ];
};

const dirReadEntries = (dirReader, path: string, structure: boolean) => {
  return new Promise((resolve, reject) => {
    dirReader.readEntries(async entries => {
      let files = [];
      for (let entry of entries) {
        const itemFiles = await getFilesFromEntry(entry, path, structure);
        files = files.concat(itemFiles);
      }
      resolve(files);
    }, reject);
  });
};

/** get files from `webkitGetAsEntry` */
export const getFilesFromGetAsEntry = async (e: DragEvent, structure: boolean) => {
  let files: File[] = [];

  const { items } = e.dataTransfer;

  for (let i = 0; i < items.length; i++) {
    const entry = items[i].webkitGetAsEntry();
    const result = await getFilesFromEntry(entry, '', structure);

    files.push(...result);
  }

  return files;
};
