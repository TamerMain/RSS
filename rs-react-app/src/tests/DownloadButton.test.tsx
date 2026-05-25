import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DownloadButton from '@/components/DownloadButton';

describe('when click download CSV', () => {
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

    render(
      <DownloadButton
        cart={['+2 Mace', 'Aang, Airbending Master', 'Aang, Air Nomad']}
      />
    );
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
    render(
      <DownloadButton
        cart={['+2 Mace', 'Aang, Airbending Master', 'Aang, Air Nomad']}
      />
    );
    await user.click(screen.getByText('Download CSV'));

    expect(createdBlob).toBeInstanceOf(Blob);
    const text = await createdBlob!.text();
    expect(text).toBe('+2 Mace\r\nAang, Airbending Master\r\nAang, Air Nomad');
  });
});
