import React from 'react';
import { Field, ErrorMessage } from 'formik';
import DropZone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export class FormPhoto extends React.Component {
    constructor() {
        super();
        this.handleDrop = this.handleDrop.bind(this);
        this.handleCropChange = this.handleCropChange.bind(this);
        this.imagePreviewCanvasRef = React.createRef();
        this.state = {
            src: null,
            crop: {
                x: 10,
                y: 10,
                width: 50,
                aspect: 3/4,
            }
        }
    }

    handleCropComplete = (crop, pixelCrop) => {
        console.log('handleCropComplete', crop, pixelCrop);
        console.log('complete', this.state.src);

        const canvas = this.imagePreviewCanvasRef.current;
        const src = this.state.src;

        updateCanvas(canvas, src, pixelCrop).then(fileUrl => console.log(fileUrl));
    };

    handleCropChange = (crop) => {
        this.setState({ crop });
        console.log('handleCropChange', this.state.crop );
    };

    handleDrop([{ preview }]) {
        this.setState({
            src: preview
        });
    }

    render() {
        return (
            <React.Fragment>
                <p>Upload een foto voor op je Cinevillepas</p>
                <p>Let bij de foto op de volgende dingen:</p>
                <ul>
                    <li>Scherpe foto</li>
                    <li>Recht van voren genomen</li>
                    <li>Niet te donker</li>
                    <li>Géén zonnebril, petjes of hoeden</li>
                </ul>
                <br />
                <DropZone accept="image/jpg, image/jpeg, image/png"
                          onDrop={this.handleDrop}
                          multiple={false}>
                    <p>Sleep hier een bestand naartoe of klik om een bestand te selecteren (.jpeg, .png).</p>
                </DropZone>
                { this.state.src && (
                    <ReactCrop src={this.state.src}
                               crop={this.state.crop}
                               onChange={this.handleCropChange}
                               onComplete={this.handleCropComplete} />
                )}
                <br />
                <p>Preview Canvas Crop</p>
                <canvas ref={this.imagePreviewCanvasRef} />
                <label>
                    <Field type="checkbox"
                           name="consentPhoto"/>
                    Ja, ik geef toestemming voor het gebruik van deze foto op mijn Cinevillepas
                    <ErrorMessage name="consentPhoto">
                        {msq => <div>{msq}</div>}
                    </ErrorMessage>
                </label>
            </React.Fragment>
        )
    }
}

function updateCanvas(canvas, image64, pixelCrop){
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = image64;
        image.onload = function() {
            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            );

            canvas.toBlob(file => {
                file.name = 'photo.jpg';
                resolve(URL.createObjectURL(file));
            }, 'image/jpeg');
        }
    })
}
