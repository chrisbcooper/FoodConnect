import SyncLoader from 'react-spinners/SyncLoader';
import styled, { useTheme } from 'styled-components';

const TotalDiv = styled.div`
    height: 100%;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
`;

const Loader = () => {
    const theme = useTheme();
    return (
        <TotalDiv>
            <SyncLoader loading={true} size={20} color={theme.dark_blue} />
        </TotalDiv>
    );
};

export default Loader;
