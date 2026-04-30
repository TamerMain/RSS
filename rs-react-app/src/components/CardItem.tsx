import { Component } from 'react';

class CardItem extends Component<{
  cardName: string;
  cardImageSrc: string | undefined;
}> {
  render() {
    return (
      <div className="flex flex-col items-center w-full">
        <p>{this.props.cardName}</p>
        <img
          alt={`Image of ${this.props.cardName} Card`}
          className="w-full"
          src={this.props.cardImageSrc}
          width="480"
          height="680"
        ></img>
      </div>
    );
  }
}

export default CardItem;
