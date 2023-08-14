import {PixelStore3} from "@/stores/PixelStore3";
import {PixelStore} from "@/stores/PixelStore";

export type RootStoreHydration = {
    [key: string]: {
        hydrateFromLocalStore: () => void
    }
};

export class RootStore {

    pixelStore: PixelStore;
    pixelStore3: PixelStore3;

    constructor() {
        this.pixelStore = new PixelStore(this);
        this.pixelStore3 = new PixelStore3(this);
    }


    hydrate(data: RootStoreHydration) {
    }


}
