import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

const ghostUser = () => {
    return (
        <div
            style={{
                height: '15rem',
                width: '15rem',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                display: 'flex',
            }}
        >
            <FontAwesomeIcon style={{ margin: 'auto' }} size={'9x'} icon={faUser} />
        </div>
    );
};

export const GhostUsers = () => {
    return (
        <div
            style={{
                height: '15rem',
                width: '15rem',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                display: 'flex',
                margin: 'auto',
            }}
        >
            <FontAwesomeIcon style={{ margin: 'auto' }} size={'9x'} icon={faUsers} />
        </div>
    );
};

export default ghostUser;
