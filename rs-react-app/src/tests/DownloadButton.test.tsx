import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DownloadButton from '@/components/DownloadButton';
import { type CardInfo } from '@/store/cartSlice';

describe('when click download CSV', () => {
  const mockCart: CardInfo = {
    name: '+2 Mace',
    id: 'e882c9f9-bf30-46b6-bedc-379d2c80e5cb',
    imageSrc:
      'https://cards.scryfall.io/normal/front/e/8/e882c9f9-bf30-46b6-bedc-379d2c80e5cb.jpg?1627701221',
    page: 1,
    search: '',
  };
  test('should not download when cart is empty', async () => {
    const createElementSpy = vi.spyOn(document, 'createElement');
    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');
    const user = userEvent.setup();

    render(<DownloadButton cart={[]} />);
    await user.click(screen.getByText('Download CSV'));

    expect(createElementSpy).not.toHaveBeenCalledWith('a');
    expect(createObjectURLSpy).not.toHaveBeenCalled();
  });

  test('should revoke URL preventing potential memory leaks', async () => {
    const revokeURLSpy = vi.spyOn(URL, 'revokeObjectURL');
    const mockURL = 'mock-url';
    vi.spyOn(URL, 'createObjectURL').mockReturnValue(mockURL);
    const user = userEvent.setup();

    render(<DownloadButton cart={[mockCart]} />);
    await user.click(screen.getByText('Download CSV'));

    expect(revokeURLSpy).toHaveBeenCalledWith(mockURL);
  });

  test('should generates correct CSV content', async () => {
    const user = userEvent.setup();
    let createdBlob: Blob | null = null;
    vi.spyOn(URL, 'createObjectURL').mockImplementation((blob) => {
      createdBlob = blob as Blob;
      return 'mock-url';
    });
    render(<DownloadButton cart={[mockCart]} />);
    await user.click(screen.getByText('Download CSV'));

    expect(createdBlob).toBeInstanceOf(Blob);
    const text = await createdBlob!.text();
    expect(text).toBe(
      'This file contains your selected card information.\r\nSuch as Name, ID and Description link to original art and details URL which is not impelemented yet for direct access from browser.\r\n\r\n------- Card 1 -------\r\nName: +2 Mace\r\nScryfall unique ID: e882c9f9-bf30-46b6-bedc-379d2c80e5cb\r\nOriginal Art: https://cards.scryfall.io/normal/front/e/8/e882c9f9-bf30-46b6-bedc-379d2c80e5cb.jpg?1627701221\r\nDetails URL: http://localhost:3000/search/cards?q=&page=1&details=e882c9f9-bf30-46b6-bedc-379d2c80e5cb.\r\n'
    );
  });
});
