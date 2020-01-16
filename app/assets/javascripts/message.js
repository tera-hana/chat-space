$(function() { 
  function buildHTML(message){
   if (message.content && message.image) {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="message__upper-info">
           <div class="message__upper-info__talker">
             ${message.user_name}
           </div>
           <div class="message__upper-info__date">
             ${message.created_at}
           </div>
         </div>
         <div class="message__text">
           <p class="message__text">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else if (message.content) {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="message__upper-info">
           <div class="message__upper-info__talker">
             ${message.user_name}
           </div>
           <div class="message__upper-info__date">
             ${message.created_at}
           </div>
         </div>
         <div class="message__text">
           <p class="message__text">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   } else {
     var html = 
     `<div class="message" data-message-id=${message.id}></div>
         <div class="message__upper-info">
           <div class="message__upper-info__talker">
             ${message.user_name}
           </div>
           <div class="message__upper-info__date">
             ${message.created_at}
           </div>
         </div>
         <div class="message__text">
           <p class="message__text">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
       return html;
      //  $('.messages').append(html);
   }
 }
//  インクリメンタルサーチ機能
$(function(){
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
    .always(function(){
      $('.submit-btn').prop("disabled",false);
    })
  })
});

// 自動更新機能
    var reloadMessages = function() {
      last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $("#new_message")[0].reset();
      $(".submit-btn").prop("disabled", false);
    }
    })
    .fail(function() {
      alert('更新に失敗しました');
    });
    };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 3000);
  }
});