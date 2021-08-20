import SyncLoader from 'react-spinners/SyncLoader';
import styled from 'styled-components';

const TotalDiv = styled.div`
    height: 100%;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
`;

const loader = () => {
    return (
        <TotalDiv>
            <SyncLoader loading={true} size={20} color='white' />
        </TotalDiv>
    );
};

export default loader;
