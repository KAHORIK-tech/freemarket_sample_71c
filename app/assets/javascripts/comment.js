$(function(){
  function buildHTML(comment){
    var content = comment.comment.replace(/\n|\r\n|\r/g, '<br>');
    if (comment.user_id ==  comment.item_id){
      var html = 
        `<ul class= "item-comments__content__form__boxs">
          <li class= "item-comments__content__form__box">
            <div class= "item-comments__content__form__box__name">
              <a href =/users/${comment.user_id}>${comment.user_name}</a>
                <div class= "user_display">
                  出品者
                </div>
            </div>
            <div class= "item-comments__content__form__box__message">
              ${content}
              <div class= "item-comments__content__form__box__message__time">
              <i class="far fa-clock"></i>
                ${comment.created_at}
              </div>
            </div>
          </li>
        </ul>`
      return html;
    } else {
      var html =
        `<ul class= "item-comments__content__form__boxs">
          <li class= "item-comments__content__form__box">
            <div class= "item-comments__content__form__box__name">
              <a href =/users/${comment.user_id}>${comment.user_name}</a>
            </div>
            <div class= "item-comments__content__form__box__message">
              ${content}
              <div class= "item-comments__content__form__box__message__time">
              <i class="far fa-clock"></i>
                ${comment.created_at}
              </div>
            </div>
          </li>
        </ul>`
      return html;
    };
  }

  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.item-comments__content__form.clearfix').append(html);
      $('.textbox').val('');
      $('.button').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  })
});