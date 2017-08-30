export default function renderShapes(columnPartitionsWithShapes, canvas){
    for(let row of columnPartitionsWithShapes){
        for(let element of row){
            element && element.Render(canvas);
        }
    }
}
