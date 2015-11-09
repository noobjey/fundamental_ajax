$(document).ready(function() {
  fetchPostButton()
  createPost()
  fetchPosts()
  deletePost()
  //pollData()
})

var postUrl = 'http://turing-birdie.herokuapp.com/api/v1/posts.json'
showPost = function(post) {
  $("#latest-posts").append(
    "<div class='post' data-id='" + post.id + "'>" +
    "<h6>Published on: " + post.created_at + "</h6>" +
    "<p>Description: " + post.description + "</p>" +
    "</div>" +
    deletePostButton()
  )
}

function deletePostButton() {
  return "<div><button class='delete-post btn btn-default btx-xs'>Delete</button></div>"
}

function deletePost(id) {
  $("#latest-posts").delegate(".delete-post", "click", function() {
    var $post = $(this).closest(".post")

    $.ajax({
      type: 'DELETE',
      url: 'http://turing-birdie.herokuapp.com/api/v1/posts' + $post.attr('data-id') + '.json',
      success: function() {
        $post.remove()
      },
      error: function() {
        $post.remove()
        console.log("Stop it Stanely you bastard!")
      }
    })
  })
}

createPost = function() {
  $('#create-post').on('click', function() {
    var postDescription = $('#post-description').val()
    var postParams = {post: {description: postDescription}}

    $.ajax({
      type: 'POST',
      url: postUrl,
      data: postParams,
      success: function(post) {
        showPost(post)
      }
    })
  })
}

function fetchPosts() {
  var newestPostId = parseInt($('.post').last().attr('data-id'))

  $.ajax({
    type: 'GET',
    url: postUrl,
    success: function(posts) {
      $.each(posts, function(index, post) {
        if (isNaN(newestPostId) || post.id > newestPostId)
          showPost(post)
      })
    }
  })
}

function fetchPostButton() {
  $("[name='button-fetch']").on('click', function() {
    fetchPosts()
  })
}

function pollData() {
  setInterval(fetchPosts, 1000)
}
