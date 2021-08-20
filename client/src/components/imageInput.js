import { Button } from 'react-bootstrap';

const ImageInput = ({ image, fileInput, setImage }) => {
    return (
        <>
            <Button
                style={{ display: 'block' }}
                onClick={(event) => {
                    fileInput.current.click();
                }}
            >
                {image ? image.name : 'Upload an image'}
            </Button>
            <input
                type='file'
                ref={fileInput}
                accept='image/jpeg, image/png, image/jpg'
                onChange={(event) => {
                    setImage(event.target.files[0]);
                }}
                style={{ display: 'none' }}
            />
        </>
    );
};

export default ImageInput;
