export default function loadSvgImage(...imageFilenames){
    for(let filename of imageFilenames){
        d3
        .xml(`./src/images/${filename}.svg`)
        .mimeType('image/svg+xml')
        .get(function(error, xml) {
            if (error) throw error;
            document.body.appendChild(xml.documentElement);
        });
    }
}
