import {PixelStore} from "@/stores/PixelStore";

export type RootStoreHydration = {
    [key: string]: {
        hydrateFromLocalStore: () => void
    }
};

export class RootStore {

    pixelStore: PixelStore;

    constructor() {
        this.pixelStore = new PixelStore(this);
    }


    hydrate(data: RootStoreHydration) {
    }


}
