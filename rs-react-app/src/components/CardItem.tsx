import { Component } from 'react';
import cardImage from '../temp/cardImage.jpg';

type Props = {
  index: number;
};

class CardItem extends Component<Props> {
  render() {
    return (
      <div key={this.props.index} className="flex flex-col items-center w-full">
        <p>Burgeoning</p>
        <img className="w-full" src={cardImage} width="480" height="680"></img>
      </div>
    );
  }
}

export default CardItem;
