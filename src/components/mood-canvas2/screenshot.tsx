import {useEffect} from "react";
import {useThree} from "@react-three/fiber";
import {useRootStore} from "@/providers/RootStoreProvider";

const Screenshot = ({isNeedScreen}: { isNeedScreen: number }) => {
    const {
        gl,                           // WebGL renderer
        scene,                        // Default scene
        camera,                       // Default camera
    } = useThree();
    const store = useRootStore();

    function renderToJPG() {
        gl.domElement.getContext('webgl', {preserveDrawingBuffer: true});
        gl.render(scene, camera);
        gl.domElement.toBlob(
            function (blob) {
                var a = document.createElement('a');
                // @ts-ignore
                var url = URL.createObjectURL(blob);
                a.href = url;
                a.download = 'canvas.jpg';
                a.click();
                console.log('function is actually being used');
            },
            'image/jpg',
            1.0
        )
        gl.domElement.getContext('webgl', {preserveDrawingBuffer: false});
    }

    useEffect(() => {
        if (isNeedScreen > 0) {
            store.pixelStore3.isScreenshotMode = true
            setTimeout(() => {
                renderToJPG()
                store.pixelStore3.isScreenshotMode = false
            }, 100)
        }
    }, [isNeedScreen])
    return <></>
}

export default Screenshot
