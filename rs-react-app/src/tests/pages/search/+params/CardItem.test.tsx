import { render, screen } from '@testing-library/react';
import CardItem from '@/pages/search/+params/CardItem';

test('should render correct item name and image', () => {
  render(
    <CardItem
      cardName="Card"
      cardImageSrc="Card.png"
      isInCart={false}
      handleToCart={vi.fn()}
      handleActiveCard={vi.fn()}
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
      cardName={undefined}
      cardImageSrc={undefined}
      isInCart={false}
      handleToCart={vi.fn()}
      handleActiveCard={vi.fn()}
    />
  );
  const image = screen.queryByRole('img');
  const placeholder = screen.getByText('Image Not Found');
  expect(image).not.toBeInTheDocument();
  expect(placeholder).toBeInTheDocument();
});
