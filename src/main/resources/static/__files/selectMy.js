$(function() {
    $("#goBack").click(function() {
        window.parent.close();
    })

    $("#btn_bet").click(function() {
        if (!$("#generate-text").html()) {
            alert("请先生成文字")
            return false;
        }

        if (!$("#bet_money").val()) {
            alert("请填写金额")
            return false;
        }

        var text = $("#generate-text").html();
        text = text.replace("生成的文字为：", "")
        window.parent.bet(text + "各" + $("#bet_money").val());
    })
})