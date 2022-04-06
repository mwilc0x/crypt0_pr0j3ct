import React, { ChangeEvent } from 'react';
import './style.scss';

type Props = {
    handleFileUpload: any;
}

const FileUpload = (props: Props) => {
    const dropArea = React.useRef<HTMLDivElement>(null);
    const [isDropping, setDropping] = React.useState(false);

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

        const dt = event.dataTransfer;
        const files = dt.files;
        if (files.length) {
            props.handleFileUpload(files?.item(0));
        }
    }

    function handleManualUpload(event: ChangeEvent<HTMLInputElement>) {
        props.handleFileUpload(event.target.files?.item(0));
    }

    return (
        <div id="drop-area" className={isDropping ? 'highlight' : ''} ref={dropArea}>
            <form>
                <p>Drop image here</p>
                <input 
                    type="file"
                    accept="image/*"
                    onChange={handleManualUpload}
                    className="upload-btn"
                />
            </form>
        </div>
    );
}

export default FileUpload;
