/*******************************
* binary or text files uploader 
*/
function setev_change_inputfile($input, $func) {

  $input.unbind();
  $input.change(function(evt) {
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function(event) {
      var result = event.target.result;
      if ($func)
        $func(result, file);
      else
        def_callback_file(result, file);
    };
    reader.onerror = function() {
      console.log('file read error!' + file.fileName);
    };
    this.value=null;
  });
}

///default callback function
function def_callback_file(data, file) {
  try{
    $.ajaxSetup({scriptCharset:'utf-8'});
    ajax_res = $.ajax({
      type: 'POST',
      async: false,
      url: "upload/file,
      dataType: 'json',
      data:{
          data: data,
          filename: file.name,
      },
      success: function(data) {
        console.log('success!');
       }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log('error!');
      }
  }).responseText;
  }catch(e){}
  }
}


/*****************************
* image files uploader 
*/

function setev_change_inputimg($input, $func) {
  $input.unbind();
  $input.change(function(evt) {
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      var result = event.target.result;
      var image = new Image();
      image.onload = function() {
        if ($func)
          $func(image, file, $input);
        else
          def_callback_image(image, file, $input);
      };
      image.src = reader.result;
    };
    reader.onerror = function() {
      console.log('file read error!' + file.fileName);
    };
    reader.readAsDataURL(file);
    this.value=null;
  });
}

///default callback function
function def_callback_image(image, file, $input) {
  var canvas = document.querySelector('canvas._img_input');
  var ctx = canvas.getContext('2d');
  
  var meta = new SimpleImageMeta(image.src); //please refarence to my other project (=SimpleImageMeta)
  var info = meta.readInfo();
  // resize & rotate
  correct_image(image, canvas, ctx, {orientation:info['exif']['Orientation'], width:480, height:640});
  
  // for example, draw timestamp to the image. 
  //ctx.font="20px bold Arial"
  //ctx.fillStyle = 'orange';
  //ctx.textBaseline="bottom";
  //var date = info['exif']['DateTimeOriginal'] || info['exif']['DateTime'];
  //if (date)
  //  ctx.fillText(date, 10, canvas.height-10);
  
  var dataurl = canvas.toDataURL("image/jpeg");
  dataurl = dataurl.replace(/^data:image\/[^;]*;base64,/, '');
  try{
    $.ajaxSetup({scriptCharset:'utf-8'});
    ajax_res = $.ajax({
      type: 'POST',
      async: false,
      url: "upload/img,
      dataType: 'json',
      data:{
          data: dataurl,
      },
      success: function(data) {
        console.log('success!');
       }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log('error!');
      }
  }).responseText;
  }catch(e){}
  }
  
}
  

// correct resize & orientation
//  ex. option={{orientation:6, width:480, height:640}
function correct_image(image, canvas, ctx, option) {
  var max_height = option.height;
  var max_width = option.width;
  var orientation = option.orientation;
  canvas.width = canvas.height = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var width , higth;
  var rotate = 0;

  if (orientation==6) {
    rotate = 90;
    height = image.width;
    width = image.height;
  }else{
    height = image.height;
    width = image.width;
  }

  if (height>max_height) {
    width = width * (max_height/height);
    height = max_height;
  }else
  if (width>max_width) {
    height = height * (max_width/width);
    width = max_width;
  }
  canvas.height = height;
  canvas.width = width;
  if (rotate == 90) {
    ctx.save();
    ctx.rotate(rotate * Math.PI / 180);
    ctx.translate(0, -width);
    ctx.drawImage(image, 0, 0, height, width);
    ctx.restore();
  }else{
    ctx.drawImage(image, 0, 0, width, height);
  }
}
  
