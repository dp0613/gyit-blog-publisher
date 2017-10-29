tinymce.init({
  selector:'.editor',
  height: 500,
  theme: 'modern',
  plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
  toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
  image_advtab: true,
});

$(document).ready(function(){

  /*Trigger save WYSIWYG before submit form*/
  $('.add-new-btn').click(function(e){
    e.preventDefault();
    tinymce.triggerSave();
    $('.add-new-form').submit();
  });
});
