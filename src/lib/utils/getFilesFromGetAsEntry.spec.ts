import { getFilesFromGetAsEntry } from "./getFilesFromGetAsEntry";

const FAKE_DRAG_EVENT = {
  dataTransfer: {
    items: [
      {
        webkitGetAsEntry: () => ({
          isDirectory: false,
          file: (cb: (file:File) => void) => {
            cb(new File([], 'a.txt'))
          }
        })
      },
      {
        webkitGetAsEntry: () => ({
          name: 'b',
          isDirectory: true,
          createReader: () => ({
            readEntries: async(cb: (entries: any[]) => Promise<any>) =>  {
              await cb([
                {
                  isDirectory: false,
                  file: (cb: (file:File) => void) => {
                    cb(new File([], 'b1.txt'))
                  }
                },
                {
                  isDirectory: false,
                  file: (cb: (file:File) => void) => {
                    cb(new File([], 'b2.txt'))
                  }
                }
              ])
            }
          })
        })
      }
    ]
  }
} as unknown as DragEvent;

describe('getFilesFromGetAsEntry', () => {

  it('should be return flat files when structure parameter is false', async() => {
    const files = await getFilesFromGetAsEntry(FAKE_DRAG_EVENT, false) as Array<File & { filepath : string }>;

    expect(files.find(f => f.filepath === 'a.txt')).toBeTruthy();
    expect(files.find(f => f.filepath === 'b/b1.txt')).toBeTruthy();
    expect(files.find(f => f.filepath === 'b/b2.txt')).toBeTruthy();
    expect(files.length).toBe(3);
  });

  it('should be return structure folders and files when structure parameter is true', async() => {
    const files = await getFilesFromGetAsEntry(FAKE_DRAG_EVENT, true) as Array<File & { filepath : string, children: any[] }>;

    expect(files.find(f => f.filepath === 'a.txt')).toBeTruthy();
    expect(files.length).toBe(2);

    expect(files.find(f => f.name == 'b')!.children.length).toBe(2);
    expect(files.find(f => f.name == 'b')!.children.find(f => f.filepath === 'b/b1.txt')).toBeTruthy();
    expect(files.find(f => f.name == 'b')!.children.find(f => f.filepath === 'b/b2.txt')).toBeTruthy();
  });

})
