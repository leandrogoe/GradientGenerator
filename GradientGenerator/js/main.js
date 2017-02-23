

$(document).ready(function(){

  gradientTypeEnum = {
    Radial : 0,
    Linear : 1
  }

  gradientDirectionEnum = {
      Center : 0,
      Top : 1,
      TopRight : 2,
      Right : 3,
      BottomRight : 4,
      Bottom : 5,
      BottomLeft : 6,
      Left : 7,
      TopLeft : 8
  }

  var gradientType = gradientTypeEnum.Radial;
  var gradientDirection = gradientDirectionEnum.Top;

  refreshGradient();

  function refreshGradient()
  {
    var color1 = $('#colorSelector2 div').css('backgroundColor');

    var color2 = $('#colorSelector1 div').css('backgroundColor');
    // We don't want to tokenize the style, so we use attr instead of css
    $("#cssGradientDiv").attr("style", "height:200px; width:100%;" + getGradientText(color1, color2, "", gradientDirection) );
    $("#cssGradientText").html(getGradientText(color1, color2, "</br>", gradientDirection));
  }

  window.changeGradientValues = function changeGradientValues(newcolor1, newcolor2, newgradientDirection, newgradientType)
  {
      $('#colorSelector2 div').css('backgroundColor', newcolor1);
      $('#colorSelector1 div').css('backgroundColor', newcolor2);
      gradientType = newgradientType;
      gradientDirection = newgradientDirection;
      var directionString = getNonStandardDirectionForDisplay(gradientDirection);
      $('#directionLinearButton,#directionRadialButton').html(directionString + " <span class=\"caret\"></span>");

      if (gradientType != gradientTypeEnum.Radial) {
          $('#gradientTypeButton').html("Linear Gradient<span class=\"caret\"></span>");
          $('#directionLinear').show();
          $('#directionRadial').hide();
      }
      else {
          $('#gradientTypeButton').html("Radial Gradient<span class=\"caret\"></span>");
          $('#directionLinear').hide();
          $('#directionRadial').show();
      }

      refreshGradient();
  }

  function getGradientText(color1, color2, newLine, direction)
  {
      var standardDir = getStandardDirection(direction);
      var nonStandandardDir = getNonStandardDirection(direction);

      if(gradientType == gradientTypeEnum.Radial)
      {
        return "background: " + color1 + "; /* Old Browsers */" + newLine + 
        "background: -webkit-radial-gradient(" + nonStandandardDir + "," + color1 + "," + color2 + "); /*Safari 5.1-6*/" + newLine + 
        "background: -o-radial-gradient(" + nonStandandardDir + "," + color1 + "," + color2 + "); /*Opera 11.1-12*/" + newLine + 
        "background: -moz-radial-gradient(" + nonStandandardDir + "," + color1 + "," + color2 + "); /*Fx 3.6-15*/" + newLine + 
        "background: radial-gradient(" + standardDir + "," + color1 + ", " + color2 + "); /*Standard*/" +  newLine;
      }
      else
      {
         return  "background: " + color1 + "; /* Old Browsers */" + newLine + 
        "background: -webkit-linear-gradient(" + nonStandandardDir + "," + color1 + "," + color2 + "); /*Safari 5.1-6*/" + newLine + 
        "background: -o-linear-gradient(" + nonStandandardDir + "," + color1 + "," + color2 + "); /*Opera 11.1-12*/" + newLine + 
        "background: -moz-linear-gradient(" + nonStandandardDir + "," + color1 + "," + color2 + "); /*Fx 3.6-15*/" + newLine + 
        "background: linear-gradient(" + standardDir + ", " + color1 + ", " + color2 + "); /*Standard*/" + newLine;
      }
  }

  function getNonStandardDirection(gradientDirection)
  {
    switch(gradientDirection)
    {
      case gradientDirectionEnum.Center:
            return "center";
      case gradientDirectionEnum.Top:
            return "top";
      case gradientDirectionEnum.TopRight:
            return "top right";
      case gradientDirectionEnum.Right:
            return "right";
      case gradientDirectionEnum.BottomRight:
            return "bottom right";
      case gradientDirectionEnum.Bottom:
            return "bottom";
      case gradientDirectionEnum.BottomLeft:
            return "bottom left";
      case gradientDirectionEnum.Left:
            return "left";
      case gradientDirectionEnum.TopLeft:
            return "top left";
    }
  }


  function getNonStandardDirectionForDisplay(gradientDirection) {
      switch (gradientDirection) {
          case gradientDirectionEnum.Center:
              return "Center";
          case gradientDirectionEnum.Top:
              return "Top";
          case gradientDirectionEnum.TopRight:
              return "Top Right";
          case gradientDirectionEnum.Right:
              return "Right";
          case gradientDirectionEnum.BottomRight:
              return "Bottom Right";
          case gradientDirectionEnum.Bottom:
              return "Bottom";
          case gradientDirectionEnum.BottomLeft:
              return "Bottom Left";
          case gradientDirectionEnum.Left:
              return "Left";
          case gradientDirectionEnum.TopLeft:
              return "Top Left";
      }
  }

  function getStandardDirection(gradientDirection)
  {
    switch(gradientDirection)
    {
      case gradientDirectionEnum.Center:
            return "ellipse at center";
      case gradientDirectionEnum.Top:
            return "to bottom";
      case gradientDirectionEnum.TopRight:
            return "top right";
      case gradientDirectionEnum.Right:
            return "to left";
      case gradientDirectionEnum.BottomRight:
            return "bottom right";
      case gradientDirectionEnum.Bottom:
            return "to top";
      case gradientDirectionEnum.BottomLeft:
            return "bottom left";
      case gradientDirectionEnum.Left:
            return "to right";
      case gradientDirectionEnum.TopLeft:
            return "top left";
    }
  }


  var widt = false;
  function setupColorWidget(colorPickerHolder, colorSelector) {

    $('#' + colorPickerHolder).ColorPicker({
      flat: true,
      color: '#00ff00',
      onSubmit: function(hsb, hex, rgb) {
        $('#' + colorSelector + ' div').css('backgroundColor', '#' + hex);
        refreshGradient();
      }
    });
    $('#' + colorPickerHolder + '>div').css('position', 'absolute');
    
    $('#' + colorSelector).bind('click', function() {
      $('#' + colorPickerHolder).stop().animate({height: widt ? 0 : 173}, 500);
      widt = !widt;
    });
  };
  
  setupColorWidget("colorPickerHolder1","colorSelector1");

  setupColorWidget("colorPickerHolder2","colorSelector2");

  $('#gradientTypeList li').on('click', function(){
    $('#gradientTypeButton').html($(this).text() + " <span class=\"caret\"></span>" );

    if($(this).text() == 'Linear Gradient')
    {
      gradientType = gradientTypeEnum.Linear;
      $('#directionLinear').show();
      $('#directionRadial').hide();
    }
    else
    {
      gradientType = gradientTypeEnum.Radial;
      $('#directionLinear').hide();
      $('#directionRadial').show();
    }

    $('#directionLinearButton,#directionRadialButton').html("Top <span class=\"caret\"></span>");
    gradientDirection = gradientDirectionEnum.Top;

    refreshGradient();
  });

  $('#directionLinearList li, #directionRadialList li').on('click', function(){

    $('#directionLinearButton,#directionRadialButton').html($(this).text() + " <span class=\"caret\"></span>");

    if($(this).text() == 'Center' )
    {
      gradientDirection = gradientDirectionEnum.Center;
    }
    else if($(this).text() == 'Top' )
    {
      gradientDirection = gradientDirectionEnum.Top;
    }
    else if($(this).text() == 'Top Right' )
    {
      gradientDirection = gradientDirectionEnum.TopRight;
    }
    else if($(this).text() == 'Right' )
    {
      gradientDirection = gradientDirectionEnum.Right;
    }
    else if($(this).text() == 'Bottom Right' )
    {
      gradientDirection = gradientDirectionEnum.BottomRight;
    }
    else if($(this).text() == 'Bottom' )
    {
      gradientDirection = gradientDirectionEnum.Bottom;
    }
    else if($(this).text() == 'Bottom Left' )
    {
      gradientDirection = gradientDirectionEnum.BottomLeft;
    }
    else if($(this).text() == 'Left' )
    {
      gradientDirection = gradientDirectionEnum.Left;
    }
    else if($(this).text() == 'Top Left')
    {
      gradientDirection = gradientDirectionEnum.TopLeft;
    }
    
    refreshGradient();
  });

  var servicePath = $('#loader').data('request-url');
  var uri = 'ws://' + window.location.hostname + servicePath;
 websocket = new WebSocket(uri);

 websocket.onopen = function () {
     $('#messages').prepend('<div>Connected.</div>');

     $('#publishform').submit(function (event) {
         var fancyName = prompt('Provide a fancy name!:');
         var color1 = $('#colorSelector2 div').css('backgroundColor');
         var color2 = $('#colorSelector1 div').css('backgroundColor');

         var xmlDoc = document.implementation.createDocument(null, "Gradient");

         var color1Node = xmlDoc.createElement("Color1");
         color1Node.appendChild(xmlDoc.createTextNode(color1));
         xmlDoc.documentElement.appendChild(color1Node);
         
         var color2Node = xmlDoc.createElement("Color2");
         color2Node.appendChild(xmlDoc.createTextNode(color2));
         xmlDoc.documentElement.appendChild(color2Node);

         var gradientDirectionNode = xmlDoc.createElement("GradientDirection");
         gradientDirectionNode.appendChild(xmlDoc.createTextNode(gradientDirection));
         xmlDoc.documentElement.appendChild(gradientDirectionNode);

         var gradientTypeNode = xmlDoc.createElement("GradientType");
         gradientTypeNode.appendChild(xmlDoc.createTextNode(gradientType));
         xmlDoc.documentElement.appendChild(gradientTypeNode);

         var nameNode = xmlDoc.createElement("Name");
         nameNode.appendChild(xmlDoc.createTextNode(fancyName));
         xmlDoc.documentElement.appendChild(nameNode);
         
         var xml = new XMLSerializer().serializeToString(xmlDoc.documentElement);
         websocket.send(xml);
         event.preventDefault();
     });
 };

 websocket.onerror = function (event) {
     $('#messages').prepend('<div>Ups... No connection?</div>');
 };

 websocket.onmessage = function (event) {
     $('#messages').prepend('<div>' + event.data + '</div>');
 };
});