var canvas, ctx, sampleText = "Sample", xAxis = 430, yAxis = 470, fontSize = 36, fontColor = "#000";

$(document).ready(function() {
    
    renderImageOnCanvas();
    renderTextOnCanvase({x: xAxis, y: yAxis, sampleText: sampleText, fontSize: fontSize, fontColor: fontColor});

    $(document).on('input','#inp',function() {
        sampleText = $(this).val();
        renderTextOnCanvase({x: xAxis, y: yAxis, sampleText: $(this).val(), fontSize: fontSize, fontColor: fontColor});
    });

    $(document).on('input', '#xaxis', function() {
        xAxis = $(this).val();
        renderTextOnCanvase({x: $(this).val(), y: yAxis, sampleText: sampleText, fontSize: fontSize, fontColor: fontColor});
    });

    $(document).on('input', '#yaxis', function() {
        yAxis = $(this).val();
        renderTextOnCanvase({x: xAxis, y: $(this).val(), sampleText: sampleText, fontSize: fontSize, fontColor: fontColor});
    });

    $(document).on('input', '#fontSize', function() {
        fontSize = $(this).val();
        renderTextOnCanvase({x: xAxis, y: yAxis, sampleText: sampleText, fontSize: $(this).val(), fontColor: fontColor});
    });

    $(document).on('input', '#fontColor', function() {
        fontColor = $(this).val();
        renderTextOnCanvase({x: xAxis, y: yAxis, sampleText: sampleText, fontSize: fontSize, fontColor: $(this).val()});
    });

    $(document).on('input','#imgUrl',function() {
        const imgUrl = $(this).val();
        $('img').attr('src', imgUrl || 'template.png');
        renderImageOnCanvas();
    });

    $('button').click(async function(e){
        e.preventDefault();
        const codeList = $("#tarea").val().split('\n');
        recurLoop(codeList, codeList.length-1);
    });
});

function recurLoop(codeList, i) {
    if(i < 0) {
        return;
    } else {
        setTimeout(function() {
            const code = codeList[i];
            addTextOnImage(code).then(function() {
                downloadImage(i);
                recurLoop(codeList, i-1);
            });
        }, 100);
    }
}

function renderImageOnCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = $('img').width();
    canvas.crossOrigin = "Anonymous";
    canvas.height = $('img').height();
    ctx.drawImage($('img').get(0), 0, 0);
}

function renderTextOnCanvase(config) {
    const x = config.x,
          y = config.y,
          sampleText = config.sampleText,
          fontSize = config.fontSize,
          fontColor = config.fontColor;

    ctx.font = fontSize + "pt monospace";
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage($('img').get(0), 0, 0);
    ctx.fillStyle = fontColor;
    ctx.fillText(sampleText, x, y);
    
}

async function addTextOnImage(text) {
    return new Promise(function(resolve, reject) {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage($('img').get(0), 0, 0);
        ctx.fillStyle = "#000";
        ctx.fillText(text, xAxis, yAxis);
        resolve();
    });
}

async function downloadImage(i) {
    var image = canvas.toDataURL();
    var tmpLink = document.createElement( 'a' );  
    tmpLink.download = 'code' + i + '.png';
    tmpLink.href = image;
    document.body.appendChild( tmpLink );  
    tmpLink.click();  
    document.body.removeChild( tmpLink );
}

async function pause(i) {
    console.log("pausing");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, i*1000);
    })
}