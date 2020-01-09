$(function() {
  $("#user-search-field").on("keyup", function(e) {
    var input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(ussers) {
      console.log("成功です");
    })
    .fail(function() {
      console.log("失敗です");
    });
  });
});
