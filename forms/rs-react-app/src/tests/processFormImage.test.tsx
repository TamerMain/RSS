import { processFormImage, fileToBase64 } from '@/utils/processFormImage';

describe('fileToBase64', () => {
  it('converts file to base64', async () => {
    const file = new File(['x'], 'img.jpg', { type: 'image/jpeg' });
    expect(await fileToBase64(file)).toMatch(/^data:image\/jpeg;base64,/);
  });
});

describe('processFormImage', () => {
  it('returns empty string for no file', async () => {
    expect(await processFormImage({ length: 0 } as FileList)).toBe('');
  });

  it('converts first file', async () => {
    const file = new File(['x'], 'img.jpg', { type: 'image/jpeg' });
    const fileList = [file] as unknown as FileList;
    expect(await processFormImage(fileList)).toMatch(
      /^data:image\/jpeg;base64,/
    );
  });
});
