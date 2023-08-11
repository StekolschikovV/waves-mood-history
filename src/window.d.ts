declare global {
    interface Window {
        app: {
            onMouseDown: boolean
        };
    }
}

// but make sure to export that as default so Typescript will consider it automatically on the project
export default global;