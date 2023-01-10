import './Card.css'

function Card(props)
{
    return (
        <div className="card">
            <div className="card-image">
                <img src={props.cardItem.image} alt="Image" />      
                <div className="mini-caption"> 
                    {props.cardItem.caption}  
                </div>
            </div>
            <div className="card-description">
                <div>{props.cardItem.description}</div>
            </div>
        </div>
    );
}

export default Card;