import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RestaurantCard = styled(Card)`
    width: 15rem;
    height: 21rem;
    margin: auto;
    margin-bottom: 
    -moz-box-shadow: 0 0 3px #ccc;
    -webkit-box-shadow: 0 0 3px #ccc;
    box-shadow: 0 0 3px #ccc;
`;

export const TransparentCard = styled(Card)`
    width: 15rem;
    height: 21rem;
    margin: auto;
    margin-bottom: 20px;
    background-color: transparent;
    border: none;
`;

export const CardBody = styled(Card.Body)`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-align: center;
    padding: 0;
    margin: 1rem 1rem;
`;

export const CardImage = styled(Card.Img)`
    height: 15rem;
    width: 15rem;
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

export const RoundImage = styled(Card.Img)`
    height: 15rem;
    width: 15rem;
    border-radius: 50%;
`;

export default RestaurantCard;
