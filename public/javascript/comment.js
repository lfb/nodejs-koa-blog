$(function () {
  /**
   * 创建评论
   */
  $('#createCommentBtn').bind('click', function () {
    var nickname = $('#createCommentNickname').val()
    var email = $('#createCommentEmail').val()
    var content = $('#createCommentContent').val()
    var target_id = $('#createCommentTargetId').val()
    var target_type = $('#createCommentTargetType').val()

    if (nickname && email && content && target_id && target_type) {
      $.ajax({
        url: "/api/v1/comment",
        type: 'POST',
        data: {
          nickname,
          email,
          content,
          target_id,
          target_type
        },
        success: function (res) {
          if (res.code === 200) {
            $('.alert-success-comment').css({display: 'block'}).delay(1000).hide(0, function () {
              $('#createCommentBtn').removeAttr('disabled')
              $('#createCommentNickname').val('')
              $('#createCommentEmail').val('')
              $('#createCommentContent').val('')
              window.location.reload()
            })
          }
        },
        error: function (err) {
          $('.alert-danger-comment').css({display: 'block'}).html(err.responseJSON.msg.join(', ')).delay(1000).hide(0, function () {
            $('#createCommentBtn').removeAttr('disabled')
          })

        }
      });
    }
  })

  /**
   * 创建回复
   */
  $('#createReplayCommentBtn').bind('click', function () {
    var nickname = $('#replayNickname').val()
    var email = $('#replayEmail').val()
    var content = $('#replayContent').val()
    var target_id = $('#createReplyTargetId').val()
    var target_type = $('#createReplyTargetType').val()
    var comment_id = $('#createReplyCommentId').val()

    if (nickname && email && content && target_id && target_type && comment_id) {
      $.ajax({
        url: "/api/v1/reply",
        type: 'POST',
        data: {
          nickname,
          email,
          content,
          target_id,
          comment_id,
          target_type
        },
        success: function (res) {
          if (res.code === 200) {
            $('.alert-success-reply').css({display: 'block'}).delay(1000).hide(0, function () {
              $('#createReplayCommentBtn').removeAttr('disabled')
              $('#replayNickname').val('')
              $('#replayEmail').val('')
              $('#replayContent').val('')
              window.location.reload()
            })
          }
        },
        error: function (err) {
          $('.alert-danger-reply').css({display: 'block'}).html(err.responseJSON.msg.join(', ')).delay(1000).hide(0, function () {
            $('#createReplayCommentBtn').removeAttr('disabled')
          })

        }
      });
    }
  })

  /**
   * 验证创建评论
   */
  $('#createCommentFrom').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      nickname: {
        validators: {
          notEmpty: {
            message: '昵称不能为空'
          },
          stringLength: {
            min: 2,
            max: 16,
            message: '昵称长度必须在2到16位之间'
          }
        }
      },
      email: {
        validators: {
          emailAddress: {
            message: '邮箱地址格式有误'
          },
          notEmpty: {
            message: '邮箱不能为空'
          },
          stringLength: {
            min: 2,
            max: 32,
            message: '邮箱长度必须在2到32位之间'
          }
        }
      },
      content: {
        validators: {
          notEmpty: {
            message: '评论内容不能为空'
          },
          stringLength: {
            min: 1,
            max: 500,
            message: '评论内容必须在到500位之内'
          },
        }
      }
    }
  });
  /**
   * 打开回复的模态框，传递参数
   */
  $('#replyCommentModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var targetId = button.data('whatever')
    var modal = $(this)
    modal.find('.comment-id').val(targetId)
  })

  /**
   * 验证创建回复
   */
  $('#createReplyFrom').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      nickname: {
        validators: {
          notEmpty: {
            message: '昵称不能为空'
          },
          stringLength: {
            min: 2,
            max: 16,
            message: '昵称长度必须在2到16位之间'
          }
        }
      },
      email: {
        validators: {
          emailAddress: {
            message: '邮箱地址格式有误'
          },
          notEmpty: {
            message: '邮箱不能为空'
          },
          stringLength: {
            min: 2,
            max: 32,
            message: '邮箱长度必须在2到32位之间'
          }
        }
      },
      content: {
        validators: {
          notEmpty: {
            message: '评论内容不能为空'
          },
          stringLength: {
            min: 1,
            max: 500,
            message: '评论内容必须在到500位之内'
          },
        }
      }
    }
  });
})
