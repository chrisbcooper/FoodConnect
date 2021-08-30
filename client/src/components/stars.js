import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';

import styled from 'styled-components';

const HoverDiv = styled.div`
    display: inline-block;
    ${(props) =>
        props.form &&
        `&:hover {
        cursor: pointer;
    }`}
`;

const stars = ({ stars, form, setStars, outline }) => {
    const nums = [1, 2, 3, 4, 5];
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            {nums.map((item) => (
                <HoverDiv
                    form={form}
                    outline={stars < item}
                    onClick={(event) => {
                        form && setStars(item);
                    }}
                >
                    {outline && stars < item ? (
                        <FontAwesomeIcon icon={faStarOutline} color={'#D3D3D3'} size={'2x'} />
                    ) : (
                        <FontAwesomeIcon icon={faStar} color={stars < item ? 'white' : 'gold'} size={'2x'} />
                    )}
                </HoverDiv>
            ))}
        </div>
    );
};

export default stars;
