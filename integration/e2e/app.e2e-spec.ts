import { FileUploadTestPage } from './app.po';

describe('file-upload-test App', () => {
  let page: FileUploadTestPage;

  beforeEach(() => {
    page = new FileUploadTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
