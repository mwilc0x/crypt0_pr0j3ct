import React, { ChangeEvent } from 'react';
import './style.scss';

type Props = {
    handleFileUpload: any;
}

const FileUpload = (props: Props) => {
    const dropArea = React.useRef<HTMLDivElement>(null);
    const [isDropping, setDropping] = React.useState(false);
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const [canvasImageLoaded, setCanvasImageLoaded] = React.useState(false);

    React.useEffect(() => {
        if (dropArea && dropArea.current) {
            dropArea.current.addEventListener('dragenter', dropIn, false);
            dropArea.current.addEventListener('dragover', dropIn, false);

            dropArea.current.addEventListener('dragleave', dropOut, false);
            dropArea.current.addEventListener('drop', dropOut, false);
        }

        return () => {
            if (dropArea && dropArea.current) {
                dropArea.current.removeEventListener("dragenter", dropIn);
                dropArea.current.removeEventListener("dragover", dropIn);

                dropArea.current.removeEventListener("dragleave", dropOut);
                dropArea.current.removeEventListener("drop", dropOut);
            }
        };
    });

   function dropIn(event: any) {
    event.preventDefault();
    event.stopPropagation();
    setDropping(true);
   } 

    function dropOut(event: any) {
        event.preventDefault();
        event.stopPropagation();
        setDropping(false);

        const dataTransfer = event.dataTransfer;
        const files = dataTransfer.files;
        const file: File = files?.item(0) as File;

        if (file) {
            props.handleFileUpload(file);
            previewImage(file);
        }
    }

    function handleManualUpload(event: ChangeEvent<HTMLInputElement>) {
        const file: File = event.target.files?.item(0) as File;
        if (file) {
            props.handleFileUpload(file);
            previewImage(file);
        }
    }

    function previewImage(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const image = new Image();
            image.src = reader.result as string;
            image.onload = () => {
                if (canvasRef && canvasRef.current) {
                    canvasRef.current.width = image.width;
                    canvasRef.current.height = image.height;
                    const context = canvasRef.current.getContext('2d');
                    if (context) {
                        context.drawImage(image, 0, 0);
                        setCanvasImageLoaded(true);
                    }
                }
            }
        }
    }

    function removePreview() {
        setCanvasImageLoaded(false);
    }

    return (
        <div id="drop-area" className={isDropping ? 'highlight' : ''} ref={dropArea}>
            <form>
                <p className={`${canvasImageLoaded && 'image-preview-loaded'}`}>
                    Drop image here
                </p>
                <input 
                    type="file"
                    accept="image/*"
                    onChange={handleManualUpload}
                    className="upload-btn"
                />
                <div className={`image-preview ${canvasImageLoaded && 'loaded'}`}>
                    <button onClick={removePreview}>X</button>
                    <canvas ref={canvasRef} />
                </div>
            </form>
        </div>
    );
}

export default FileUpload;
