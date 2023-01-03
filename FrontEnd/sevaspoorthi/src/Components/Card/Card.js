import './Card.css'

function Card(props)
{
    return (
        <div className="card">
            <div className="card-image">
                <img src={props.cardItem.src} alt={props.cardItem.alt} />      
                <div className="mini-caption"> 
                    {props.cardItem.miniCaption}  
                </div>
            </div>2
            <div className="card-description">
                <div>{props.cardItem.description}</div>
                {/* <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero dolorum modi voluptate tempora, beatae quos! Pariatur optio eius tempora deleniti quo at quae quam! Porro quaerat in ex exercitationem eveniet?</p>     */}
            </div>
        </div>
    );
}

export default Card;