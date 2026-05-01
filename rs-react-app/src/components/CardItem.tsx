import { Component } from 'react';

class CardItem extends Component<{
  cardName: string;
  cardImageSrc: string | undefined;
}> {
  render() {
    return (
      <div className="flex flex-col items-center w-full text-gray-400 hover:text-gray-50">
        {this.props.cardImageSrc && (
          <img
            alt={`Image of ${this.props.cardName} Card`}
            className="w-full hover:border-2 hover:border-mist-800"
            src={this.props.cardImageSrc}
            width="480"
            height="680"
          ></img>
        )}
        {!this.props.cardImageSrc && (
          <div className="w-full h-full p-4 text-center">Image Not Found</div>
        )}
        <p>{this.props.cardName}</p>
      </div>
    );
  }
}

export default CardItem;
