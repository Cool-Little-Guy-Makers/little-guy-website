const assets = {
    hero: {
        1: require("./hero.png")
    },
    arms: {
        1: require("./little-guys/arms/arms-01.png"),
    },
    body: {
        1: require("./little-guys/body/body-01.png"),
        2: require("./little-guys/body/body-02.png"),
        3: require("./little-guys/body/body-03.png"),
        4: require("./little-guys/body/body-04.png"),
        5: require("./little-guys/body/body-05.png"),
        6: require("./little-guys/body/body-06.png"),
    },
    face: {
        1: require("./little-guys/face/face-01.png"),
        2: require("./little-guys/face/face-02.png"),
        3: require("./little-guys/face/face-03.png"),
        4: require("./little-guys/face/face-04.png"),
        5: require("./little-guys/face/face-05.png"),
        6: require("./little-guys/face/face-06.png"),
        7: require("./little-guys/face/face-07.png"),
        8: require("./little-guys/face/face-08.png"),
        9: require("./little-guys/face/face-09.png"),
        10: require("./little-guys/face/face-10.png"),
        11: require("./little-guys/face/face-11.png"),
        12: require("./little-guys/face/face-12.png"),
        13: require("./little-guys/face/face-13.png"),
    },
    head: {
        1: require("./little-guys/head/head-01.png"),
        2: require("./little-guys/head/head-02.png"),
        3: require("./little-guys/head/head-03.png"),
        4: require("./little-guys/head/head-04.png"),
        5: require("./little-guys/head/head-05.png"),
        6: require("./little-guys/head/head-06.png"),
    },
    legs: {
        1: require("./little-guys/legs/legs-01.png"),
    },
}

// This function is 0 indexed for num
export const getGuyAsset = (bodyPart, num) => {
    if (typeof assets[bodyPart][num+1] == undefined) {return null}
    return assets[bodyPart][num+1];
}