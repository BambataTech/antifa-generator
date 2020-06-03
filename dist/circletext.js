function writeBottomCircle(text, canvaId, diameter, color) {
  var canvas = document.getElementById(canvaId);
  writeCircularText(
    text.toUpperCase(),
    canvas,
    diameter,
    180,
    'center',
    '40',
    'Roboto',
    0,
    0,
    color
  );
}

function writeTopCircle(text, canvaId, diameter, color) {
  var canvas = document.getElementById(canvaId);
  writeCircularText(
    text.toUpperCase(),
    canvas,
    diameter,
    0,
    'center',
    '40',
    'Roboto',
    1,
    0,
    color
  );
}

function writeCircularText(
  text,
  mainCanvas,
  diameter,
  startAngle,
  align,
  fontSize,
  fontFamily,
  inwardFacing,
  kerning,
  color
) {
  // declare and intialize canvas, reference, and useful variables
  align = align.toLowerCase();
  var ctxRef = mainCanvas.getContext('2d');
  //   ctx.resetTransform();
  var clockwise = align == 'right' ? 1 : -1; // draw clockwise for aligned right. Else Anticlockwise
  startAngle = startAngle * (Math.PI / 180); // convert to radians

  // calculate height of the font. Many ways to do this
  // you can replace with your own!
  var textHeight = 60;

  // set text attributes
  ctxRef.font = `${fontSize}px ${fontFamily}`;
  ctxRef.fillStyle = color;

  // Reverse letters for align Left inward, align right outward
  // and align center inward.
  if (
    (['left', 'center'].indexOf(align) > -1 && inwardFacing) ||
    (align == 'right' && !inwardFacing)
  )
    text = text.split('').reverse().join('');

  // Setup letters and positioning
  ctxRef.translate(diameter / 2 - 5, diameter / 2); // Move to center
  startAngle += Math.PI * !inwardFacing; // Rotate 180 if outward
  ctxRef.textBaseline = 'middle'; // Ensure we draw in exact center
  ctxRef.textAlign = 'center'; // Ensure we draw in exact center

  // rotate 50% of total angle for center alignment
  if (align == 'center') {
    for (var j = 0; j < text.length; j++) {
      var charWid = ctxRef.measureText(text[j]).width;
      startAngle +=
        ((charWid + (j == text.length - 1 ? 0 : kerning)) /
          (diameter / 2 - textHeight) /
          2) *
        -clockwise;
    }
  }

  // Phew... now rotate into final start position
  ctxRef.rotate(startAngle);

  // Now for the fun bit: draw, rotate, and repeat
  for (var j = 0; j < text.length; j++) {
    var charWid = ctxRef.measureText(text[j]).width; // half letter
    // rotate half letter
    ctxRef.rotate((charWid / 2 / (diameter / 2 - textHeight)) * clockwise);
    // draw the character at "top" or "bottom"
    // depending on inward or outward facing

    ctxRef.fillText(
      text[j],
      0,
      (inwardFacing ? 1 : -1) * (0 - diameter / 2 + textHeight / 2)
    );

    ctxRef.rotate(
      ((charWid / 2 + kerning) / (diameter / 2 - textHeight)) * clockwise
    ); // rotate half letter
  }
  ctxRef.resetTransform();
}
