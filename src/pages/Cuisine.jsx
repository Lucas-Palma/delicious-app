import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

function Cuisine() {
    const [ cuisine, setCuisine ] = useState([]);
    let params = useParams();

    const getCuisine = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`)
        const recipes = await data.json()
        console.log(recipes)
        setCuisine(recipes.results)
    };

    useEffect(() => {
        getCuisine(params.type)
    },[params.type]);

  return (
    <Grid
        animate={{opacity: 1}}
        initial={{opacity: 0}}
        exit={{opacity: 0}}
        transition={{duration: 0.5}}
    >
        {cuisine.map((item) => {
            return (
                <Card key={item.id}>
                    <Link to={"/recipe/" + item.id}>
                        <img src={item.image} alt={item.title} />
                        <h4>{item.title}</h4>
                    </Link>
                </Card>
            )
        })}
    </Grid>
  )
}

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    grid-gap: 0.5rem;
`;

const Card = styled.div`
    transition: all .4s ease-in-out;
    img{
        width: 100%;
        border-radius: 0.5rem;
        object-fit: cover;
    }
    a{
        text-decoration: none;
    }
    h4{
        text-align: center;
        padding-top: 0.5rem;
        padding-bottom: 1.5rem;
    }
    &:hover{
        transform: scale(0.95);
      }
`;

export default Cuisine