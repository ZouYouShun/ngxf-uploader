import type { NgxfDirectoryStructure } from '../ngxf-uploader.model';

type AdditionFileAttr = {
  // * with select
  webkitRelativePath: string;
  // * use drop
  filepath: string;
};

/**
 * get files with structure
 * @param files source files
 * @returns structure file
 */
export function getStructureFiles(files: File[]) {
  return files.reduce<NgxfDirectoryStructure[]>((acc, curr) => {
    const { webkitRelativePath, filepath } = curr as File & AdditionFileAttr;
    const currentFullPath = filepath || webkitRelativePath;

    if (currentFullPath) {
      const paths = currentFullPath.split('/');
      // remove file name
      paths.pop();
      const tmp = [...paths];

      let index = 0;
      let currParent = acc;

      while (tmp.length > 0) {
        const name = tmp.shift();
        index++;

        let currP: any = currParent.find((x) => x.name === name);

        if (!currP) {
          currP = {
            name: name,
            path: paths.slice(0, index).join('/'),
            children: [],
            isDirectory: true,
          };

          currParent.push(currP);
        }

        currParent = currP.children;

        if (tmp.length === 0) {
          currParent.push(curr as any);
        }
      }
    }
    return acc;
  }, []);
}
