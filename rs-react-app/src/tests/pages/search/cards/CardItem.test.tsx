import { render, screen } from '@testing-library/react';
import CardItem from '@/pages/search/cards/CardItem';

describe('CardItem -- when render', () => {
  test('should render correct item name and image', () => {
    render(
      <CardItem
        onActiveCardClick={vi.fn()}
        cardImageSrc="Card.png"
        cardName="Card"
      />
    );
    const image = screen.getByRole('img');
    const name = screen.getByText('Card');
    expect(image).toHaveAttribute('src', 'Card.png');
    expect(name).toBeInTheDocument();
  });

  test('should render placeholder on invalid API response', () => {
    render(
      <CardItem
        onActiveCardClick={vi.fn()}
        cardImageSrc={undefined}
        cardName={undefined}
      />
    );
    const image = screen.queryByRole('img');
    const placeholder = screen.getByText('Image Not Found');
    expect(image).not.toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();
  });
});
