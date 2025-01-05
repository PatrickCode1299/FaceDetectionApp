import { useState, useRef, useEffect } from "react";
import './styles/component.css';

const Signup = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [isCameraEnabled, setIsCameraEnabled] = useState(false);
    const videoRef = useRef(null);

    const startCamera = () => {
        if(imageUrl === null){
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                    setIsCameraEnabled(true); 
                })
                .catch((err) => {
                    console.error("Camera access error:", err);
                });
        }
        }else{
            alert("Image Already Taking, lets register")
        }
    };

    const takePicture = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        videoRef.current.srcObject = null;
        setIsCameraEnabled(false); 
        setImageUrl(imageData); 
        console.log(imageUrl);
    };

    useEffect(() => {
        return () => {
            const stream = videoRef.current?.srcObject;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop()); 
            }
        };
    }, []);

    return (
        <div className="signup-form">
            <form onSubmit={(e) => { e.preventDefault(); }}>
                <div className="display-camera">
                    <video ref={videoRef} autoPlay></video> {}
                    {isCameraEnabled && (
                        <button type="button" className="camera-enabled" onClick={takePicture}>
                            Take Picture
                        </button>
                    )}
                </div>
                <input name="username" placeholder="Enter your username" />
                <button type="button" className="camera-start" onClick={startCamera}>
                    Start Registration
                </button>
                {imageUrl && <img src={imageUrl} alt="Captured" />}
            </form>
        </div>
    );
};

export default Signup;
