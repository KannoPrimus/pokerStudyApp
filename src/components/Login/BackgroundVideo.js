import React from 'react';
import './BackgroundVideo.css'; // Importa el archivo CSS

const BackgroundVideo = () => {
    return (
        <div className="video-background">
            <video autoPlay loop muted className="video-background__content">
                <source src="../../assets/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="video-background__overlay">
                <h1>Your Content Here</h1>
                <p>This is an example of text overlay on a video background.</p>
            </div>
        </div>
    );
}

export default BackgroundVideo;
