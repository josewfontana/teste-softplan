import './card.css';
import { render } from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';


function Card(props) {
  return (
    <Link to={'/detail/' + props.alphaCode} className="card" data-testid={`${props.alphaCode}-btn-redirect`}>
      <div>
        <p className="countryName">{props.name} - {props.alphaCode}</p>
        {props.capital != '' &&
          <p className="capital">Capital: {props.capital}</p>
        }
        <img src={props.flag} />
      </div>
    </Link>
  );
}

export default Card;
