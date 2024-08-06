const IMAGE_WIDTH = 150;
const IMAGE_HEIGHT = 150;
const ATLAS_ROWS = 6;
const ATLAS_COLUMNS = 7;

const files = `tile_1.png
tile_2.png
tile_3.png
tile_4.png
tile_5.png
tile_6.png
tile_7.png
tile_8.png
tile_9.png
tile_10.png
tile_11.png
tile_12.png
tile_13.png
tile_14.png
tile_15.png
tile_16.png
tile_17.png
tile_18.png
tile_19.png
tile_20.png
tile_21.png
tile_22.png
tile_23.png
tile_24.png
tile_25.png
tile_26.png
tile_27.png
tile_28.png
tile_29.png
tile_30.png
tile_31.png
tile_32.png
tile_33.png
tile_34.png
tile_35.png
tile_36.png
tile_37.png
tile_38.png
tile_39.png
tile_40.png
tile_41.png
tile_42.png
tile_43.png
tile_44.png
tile_45.png
tile_46.png
tile_47.png
tile_48.png
tile_49.png
tile_50.png
tile_51.png
tile_52.png
tile_53.png
tile_54.png
tile_55.png
tile_56.png
`;

const output = files.replace(/\.png/g,'').
split('\n').
reduce((acc:any, curr, index) => {
    const column = Math.floor(index / ATLAS_COLUMNS);
    const row = index % ATLAS_COLUMNS;
    console.log("linha: " + row, "coluna: " + column);
    acc[curr] = {
        x: row * IMAGE_WIDTH,
        y: column * IMAGE_HEIGHT
    };
    return acc;
}, {});

console.log(JSON.stringify(output));