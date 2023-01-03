import './CardDeck.css';
import Card from '../Card/Card'

function CardDeck(props)
{
    const cardItems = props.cardItems.map((card,index) => {
        return <Card cardItem={card} key={index} />
    });

    return (
        <div className="card-deck">
            {cardItems}
        </div>
    );
}

export default CardDeck;