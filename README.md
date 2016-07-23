# simpleFileUploader
simple javascript file uploader for image or text or binary others files.

##how to use
```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="css/jquery-ui.min.css">
<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/simeta.js"></script>
<script src="js/sfuploader.js"></script>
.......
<style type="text/css">
div._hidden {
	 width: 0;height: 0;
  visibility:hidden;
  overflow: hidden;
}
div._csv_input {
	color:blue;
	display: inline-block;
	overflow: hidden;
	position: relative;
	padding: 0.2em 0;
}

._csv_input input[type="file"] {
	opacity: 0;
	filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0);
	position: absolute;
	cursor: pointer;
	right: 0;
	top: 0;
	margin: 0;
}
div._csv_input:before {
	content: "upload file";
}

div._csv_input:hover {
	color:#64B0EA; /*cornflowerblue; */
}
/**/
div._img_input {
	color:blue;
	display: inline-block;
	overflow: hidden;
	position: relative;
	padding: 0.2em 0;
}

._img_input input[type="file"] {
	opacity: 0;
	filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0);
	position: absolute;
	cursor: pointer;
	right: 0;
	top: 0;
	margin: 0;
}
div._img_input:before {
	content: "upload photo";
}

div._img_input:hover {
	color:#64B0EA; /*cornflowerblue; */
}
</style>
</head>
<body>

<div><div class='_csv_input'>
<input type="file" accept="text/csv" name="input_file" > 
</div></div>

<div class='_hidden'>
  <canvas class='_img_input' style='display:none'></canvas>
</div>

<div class='_img_input'>
  <input type='file' accept='image/*' capture >
</div>


<script>
  $(window).load(function(){
    //you must to change to accept attribute. 
    setev_change_inputfile($("input[type='file'][accept='text/csv']"),
                           my_callback_file);
    setev_change_inputimg($("input[type='file'][accept='image/*']"),
                           my_callback_img);
  });
  
  function my_callback_file(data, file) {
    ...........
  }
  
  function my_callback_img(image, file, $input) {
    ...........
  }

</script>

</body>
</html>
```

## server side examples
sample code for java servlet
```
public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws IOException, ServletException{
    String path = request.getPathInfo();
    String res_str = "ng";
    if (path.equals("/upload/file")) {
      String csv = request.getParameter("data");
      String filename = request.getParameter("falename");
      String[] ary_csv = csv.split("\n", 0);
      .........
      res_str= "ok";
    }else if (path.equals("/upload/img")) {
      String dataurl = request.getParameter("data");
      byte[] buf = Base64.getDecoder().decode(dataurl.getBytes());
      BufferedOutputStream out = null;
      String image_file = "sample.img";
      try {
        File destImage = new File(image_file);
        out = new BufferedOutputStream(new FileOutputStream(destImage));
        out.write(buf);
        out.flush();
      }catch (Exception e) {
      } finally {
        if (out != null)
          out.close();
      }
      .........
      res_str= "ok";
     }
      Util.setJsonResponse(response, res_str);
      .........
```

