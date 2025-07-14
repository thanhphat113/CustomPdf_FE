import AnimationZoom from "../Animation/AnimationZoom";

function CenterLayout({ children }) {
    return (
        <div className="bg-[rgba(0,0,0,0.3)] z-100 absolute w-full h-full flex justify-center items-center z-1">
            <AnimationZoom>{children}</AnimationZoom>
        </div>
    );
}

export default CenterLayout;
