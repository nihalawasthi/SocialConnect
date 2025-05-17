const posts = [
  {
    id: 1,
    user: "Nihal Awasthi",
    handle: "@nihalawasthi",
    time: "3h ago",
    initials: "ME",
    gradient: "from-gray-400 to-black",
    content: 'Just finished "Social Connect" my latest webapp\'s Frontend.',
    tags: ["#CodeCircuit"],
    image: "",
    likes: 42,
    comments: [
      {
        id: 101,
        user: "Alex Smith",
        initials: "AS",
        gradient: "from-pink-400 to-red-500",
        content: "Great frontend design!",
        time: "1h ago",
        likes: 3,
        replies: [
          {
            id: 102,
            user: "Nihal Awasthi",
            initials: "ME",
            gradient: "from-gray-400 to-black",
            content: "Thanks, Alex!",
            time: "45m ago",
            likes: 1,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    user: "Code Circuit",
    handle: "@codecircuit",
    time: "4h ago",
    initials: "CC",
    gradient: "from-black to-black",
    content:
      "🎉 Hackathon Winner Announcement! 🎉\n\nWe're excited to announce that the winner of Code Circuit Hackathon'2025 is Nihal Awasthi! Congratulations for building an outstanding Social media website that blew us all away! 👏🏆\n\nStay tuned for the upcoming prize and recognition ceremony! #hackathon #winner #CodeCircuit",
    tags: ["#hackathon", "#winner", "#CodeCircuit"],
    image: "public/cc.png",
    likes: 1204,
    comments: [
      {
        id: 201,
        user: "Ryan Kim",
        initials: "RK",
        gradient: "from-yellow-400 to-orange-500",
        content: "Super clean design 👌",
        time: "3h ago",
        likes: 9,
        replies: [
          {
            id: 202,
            user: "Nihal Awasthi",
            initials: "ME",
            gradient: "from-gray-400 to-black",
            content: "Glad to hear, Ryan",
            time: "45m ago",
            likes: 1,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    user: "Sarah Lee",
    handle: "@sarahlee",
    time: "Yesterday",
    initials: "SL",
    gradient: "from-pink-400 to-red-500",
    content:
      "Just launched my new design portfolio! Would love some feedback from the community on the layout and overall user experience.",
    tags: ["#design"],
    image: "public/SL.png",
    likes: 87,
    comments: [],
  },
  {
    id: 4,
    user: "Alex Smith",
    handle: "@alexsmith",
    time: "2h ago",
    initials: "AS",
    gradient: "from-green-400 to-blue-500",
    content:
      "Just finished creating a new mobile app prototype for a startup. Excited to start user testing next week! 😎📱\n\nAny tips for refining the user experience in early-stage testing? Feel free to DM me! #mobileapp #UXdesign #startup",
    tags: ["#mobileapp", "#UXdesign", "#startup"],
    image: "",
    likes: 56,
    comments: [],
  },
]

function countAllComments(comments) {
  return comments.reduce((total, comment) => {
    const repliesCount = comment.replies ? countAllComments(comment.replies) : 0
    return total + 1 + repliesCount // +1 for this comment
  }, 0)
}

// Fix the typing indicator positioning and styling
function showTypingIndicator(commentSection) {
  const typingIndicator = document.createElement("div")
  typingIndicator.className = "typing-indicator mt-2 ml-4 text-xs text-gray-500 flex items-center"
  typingIndicator.innerHTML = `
        <span class="mr-2">Someone is typing</span>
        <div class="inline-flex items-center">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        </div>
    `

  // Find the comment-input-box and insert before it
  const inputBox = commentSection.querySelector(".comment-input-box")
  if (inputBox) {
    commentSection.insertBefore(typingIndicator, inputBox)
  } else {
    commentSection.appendChild(typingIndicator)
  }

  // Remove after a few seconds
  setTimeout(() => {
    typingIndicator.classList.add("fade-out")
    setTimeout(() => {
      typingIndicator.remove()
    }, 300)
  }, 3000)
}

// Remove the floating animations from profile images
function renderPosts() {
  const container = document.getElementById("postList")
  container.innerHTML = "" // clear previous content

  // Create a document fragment for better performance
  const fragment = document.createDocumentFragment()

  posts.forEach((post, index) => {
    const totalComments = countAllComments(post.comments)
    const postElement = document.createElement("div")
    postElement.className =
      "post-card bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md mb-6"

    // Add staggered animation delay based on index
    postElement.style.opacity = "0"
    postElement.style.transform = "translateY(20px)"
    postElement.style.animation = `fadeIn 0.5s ease-in-out ${index * 0.1}s forwards`

    postElement.innerHTML = `
            <div class="p-6">
                <div class="flex items-start">
                    <div class="flex-shrink-0 mr-4">
                        <div
                            class="profile-image h-10 w-10 rounded-full bg-gradient-to-r ${post.gradient} flex items-center justify-center text-white font-bold">
                            ${post.initials}
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between">
                            <p class="text-sm font-medium text-gray-900">
                                <a href="#" class="hover:underline transition-all duration-200">${post.user}</a>
                                <span class="text-gray-500 text-xs">${post.handle}</span>
                            </p>
                            <p class="text-sm text-gray-500">${post.time}</p>
                        </div>
                        <div class="mt-2 text-sm text-gray-700">
                            <p>${post.content.replace(/\n/g, "<br>")}</p>
                        </div>
                        <div class="mt-2 flex flex-wrap gap-2">
                            ${post.tags
                              .map(
                                (tag) => `
                            <span
                                class="tag inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 transition-all duration-300">
                                ${tag}
                            </span>
                            `,
                              )
                              .join("")}
                        </div>
                        ${
                          post.image
                            ? `
                        <div class="mt-3 rounded-xl overflow-hidden border border-gray-200">
                            <div class="bg-gray-100 aspect-w-16 aspect-h-9 flex items-center justify-center">
                                <div class="text-gray-400 text-sm">
                                    <img src="${post.image}" class="w-full h-auto object-cover transition-all duration-500 hover:scale-105">
                                </div>
                            </div>
                        </div>
                        `
                            : ""
                        }
                        
                        <!-- Buttons section -->
                        <div class="mt-4 flex items-center space-x-6">
                            <button type="button"
                                class="pl-2 like-button flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-200 group ripple">
                                <i class="fa-solid fa-heart mr-2 transition-transform duration-300"></i>
                                <span class="transition-all duration-200">${post.likes}</span>
                            </button>
                            <button type="button" data-post-id="${post.id}"
                                class="comment-btn flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-200 ripple">
                                <i class="fa-solid fa-comment mr-2 transition-transform duration-300"></i>
                                <span>${totalComments}</span>
                            </button>
                            <button type="button"
                                class="flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-200 ripple">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5 transition-transform duration-300" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z">
                                    </path>
                                </svg>
                                <span>Share</span>
                            </button>
                        </div>
                        <div class="comments-section hidden mt-4" id="comments-${post.id}">
                        </div>
                    </div>
                </div>
            </div>
        `

    fragment.appendChild(postElement)
  })

  container.appendChild(fragment)

  // Add scroll reveal functionality
  addScrollRevealEffect()
}

function addScrollRevealEffect() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  document.querySelectorAll(".scroll-reveal").forEach((element) => {
    observer.observe(element)
  })
}

function getMockCommentsHTML(post) {
  const totalComments = countAllComments(post.comments)

  function renderComments(comments, postId) {
    return `
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="border-b border-gray-200 px-6 py-4 bg-gray-50">
                <h3 class="text-lg font-medium text-gray-900">Comments (${totalComments})</h3>
            </div>
            <div class="p-6 space-y-6">
                ${comments
                  .map(
                    (comment, index) => `
                    <div class="comment-container scroll-reveal" style="animation-delay: ${index * 0.1}s">
                        <div class="flex">
                            <div class="flex-shrink-0 mr-4">
                                <div class="profile-image h-10 w-10 rounded-full bg-gradient-to-r ${comment.gradient} flex items-center justify-center text-white text-xs font-bold">
                                    ${comment.initials}
                                </div>
                            </div>
                            <div class="flex-1">
                                <div class="bg-gray-50 rounded-lg px-4 py-3 shadow-sm border border-gray-200 hover:border-indigo-200 transition-all duration-300">
                                    <div class="flex items-center justify-between">
                                        <h4 class="text-sm font-medium text-gray-900">${comment.user}</h4>
                                        <p class="text-xs text-gray-500">${comment.time}</p>
                                    </div>
                                    <div class="mt-2 text-sm text-gray-700">
                                        ${comment.content}
                                    </div>
                                    <div class="mt-3 flex items-center space-x-4">
                                        <button type="button" class="like-button text-xs text-gray-500 hover:text-indigo-600 transition-colors duration-200 flex items-center group ripple">
                                            <i class="fa-solid fa-heart mr-2 transition-transform duration-300"></i>
                                            <span>${comment.likes}</span>
                                        </button>
                                        <button type="button" class="reply-button text-xs text-gray-500 hover:text-indigo-600 transition-colors duration-200 ripple" data-comment-id="${comment.id}">
                                            Reply
                                        </button>
                                    </div>
                                </div>

                                ${
                                  comment.replies && comment.replies.length > 0
                                    ? `<div class="replies mt-3 space-y-3">${renderReplies(comment.replies)}</div>`
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                `,
                  )
                  .join("")}
                <div class="comment-input-box">
                    <textarea rows="3" class="w-full p-2 text-sm border border-gray-300 rounded-md focus-animation" placeholder="Write a comment..."></textarea>
                    <button type="button" class="submit-comment mt-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-all button-pop ripple"
                            data-post-id="${postId}">
                        Post Comment
                    </button>
                </div>
            </div>
        </div>
        `
  }

  function renderReplies(comments) {
    return comments
      .map(
        (comment, index) => `
            <div class="ml-6 scroll-reveal" style="animation-delay: ${index * 0.1 + 0.2}s">
                <div class="flex">
                    <div class="flex-shrink-0 mr-3">
                        <div class="profile-image h-8 w-8 rounded-full bg-gradient-to-r ${comment.gradient} flex items-center justify-center text-white text-xs font-bold">
                            ${comment.initials}
                        </div>
                    </div>
                    <div class="flex-1 bg-gray-50 rounded-lg px-4 py-2 shadow-sm border border-gray-200 hover:border-indigo-200 transition-all duration-300">
                        <div class="flex items-center justify-between">
                            <h5 class="text-sm font-medium text-gray-900">${comment.user}</h5>
                            <p class="text-xs text-gray-500">${comment.time}</p>
                        </div>
                        <div class="mt-1 text-sm text-gray-700">
                            <p>${comment.content}</p>
                        </div>
                        <div class="mt-2 flex items-center space-x-4">
                            <button type="button" class="like-button text-xs text-gray-500 hover:text-indigo-600 transition-colors duration-200 flex items-center group ripple">
                                <i class="fa-solid fa-heart mr-2 transition-transform duration-300"></i>
                                <span>${comment.likes}</span>
                            </button>
                            <button type="button" class="reply-button text-xs text-gray-500 hover:text-indigo-600 transition-colors duration-200 ripple" data-comment-id="${comment.id}">
                                Reply
                            </button>
                        </div>
                        ${
                          comment.replies && comment.replies.length > 0
                            ? `<div class="ml-6 mt-2">${renderReplies(comment.replies)}</div>`
                            : ""
                        }
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }

  const html = renderComments(post.comments, post.id)

  // Add scroll reveal to newly added comments
  setTimeout(() => {
    addScrollRevealEffect()
  }, 100)

  return html
}

// Add loading skeleton for posts
function showLoadingSkeletons() {
  const container = document.getElementById("postList")
  container.innerHTML = ""

  for (let i = 0; i < 3; i++) {
    const skeletonHTML = `
            <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div class="p-6">
                    <div class="flex items-start">
                        <div class="flex-shrink-0 mr-4">
                            <div class="h-10 w-10 rounded-full skeleton"></div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between">
                                <div class="h-5 w-32 skeleton"></div>
                                <div class="h-4 w-16 skeleton"></div>
                            </div>
                            <div class="mt-3">
                                <div class="h-4 w-full skeleton mb-2"></div>
                                <div class="h-4 w-3/4 skeleton mb-2"></div>
                                <div class="h-4 w-1/2 skeleton"></div>
                            </div>
                            <div class="mt-3 flex space-x-2">
                                <div class="h-6 w-16 skeleton"></div>
                                <div class="h-6 w-16 skeleton"></div>
                            </div>
                            <div class="mt-4 flex items-center space-x-6">
                                <div class="h-8 w-16 skeleton"></div>
                                <div class="h-8 w-16 skeleton"></div>
                                <div class="h-8 w-16 skeleton"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    container.innerHTML += skeletonHTML
  }

  // After a delay, render the actual posts
  setTimeout(() => {
    renderPosts()
  }, 1000)
}

// Remove the floating animations from navigation icons
document.addEventListener("DOMContentLoaded", () => {
  showLoadingSkeletons()

  // Remove floating effect from navigation icons
  const navIcons = document.querySelectorAll(".nav-icon")
  navIcons.forEach((icon) => {
    icon.classList.remove("float-animation")
  })

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll("button")
  buttons.forEach((button) => {
    button.classList.add("ripple")
  })

  // Add scroll reveal to all posts
  const postElements = document.querySelectorAll(".post-card")
  postElements.forEach((post) => {
    post.classList.add("scroll-reveal")
  })

  // Add pulse animation to notification badges
  const badges = document.querySelectorAll(".notification-badge")
  badges.forEach((badge) => {
    badge.classList.add("pulse-animation")
  })

  // Restore original event listeners
  document.addEventListener("click", (e) => {
    if (e.target.closest(".comment-btn")) {
      const btn = e.target.closest(".comment-btn")
      const postId = btn.getAttribute("data-post-id")
      const commentSection = document.getElementById(`comments-${postId}`)
      const post = posts.find((p) => p.id == postId)

      if (commentSection.classList.contains("hidden")) {
        commentSection.innerHTML = getMockCommentsHTML(post)
        // Use slideDown animation
        commentSection.classList.remove("hidden")
        commentSection.style.maxHeight = "0"
        commentSection.style.opacity = "0"
        setTimeout(() => {
          commentSection.style.maxHeight = "1000px"
          commentSection.style.opacity = "1"
        }, 10)
        btn.classList.add("text-indigo-600")
        btn.classList.remove("text-gray-500")
      } else {
        // Use slideUp animation
        commentSection.style.maxHeight = "0"
        commentSection.style.opacity = "0"
        setTimeout(() => {
          commentSection.classList.add("hidden")
        }, 300)
        btn.classList.remove("text-indigo-600")
        btn.classList.add("text-gray-500")
      }
    }
  })

  document.addEventListener("click", (e) => {
    const button = e.target.closest(".like-button")
    if (!button) return

    const icon = button.querySelector("i")
    const likeCountSpan = button.querySelector("span")
    const isLiked = icon.classList.contains("liked")

    let likeCount = Number.parseInt(likeCountSpan.textContent, 10) || 0

    if (isLiked) {
      icon.classList.remove("liked", "text-pink-500")
      // Add shake animation
      icon.classList.add("shake-animation")
      setTimeout(() => {
        icon.classList.remove("shake-animation")
      }, 500)
      likeCount = Math.max(0, likeCount - 1)
    } else {
      icon.classList.add("liked", "text-pink-500")
      // Add pulse animation
      icon.classList.add("pulse-animation")
      setTimeout(() => {
        icon.classList.remove("pulse-animation")
      }, 500)
      likeCount += 1
    }

    // Animate the count change
    likeCountSpan.classList.add("count-animation")
    setTimeout(() => {
      likeCountSpan.classList.remove("count-animation")
    }, 300)

    likeCountSpan.textContent = likeCount
  })

  document.addEventListener("click", (event) => {
    // Show reply box
    if (event.target.closest(".reply-button")) {
      const btn = event.target.closest(".reply-button")
      const commentId = Number.parseInt(btn.getAttribute("data-comment-id"))
      const parent = btn.closest(".comment-container") || btn.closest(".ml-6")

      // Avoid duplicate boxes
      if (parent.querySelector(".reply-box")) return

      const replyBoxHTML = `
          <div class="reply-box mt-2 slide-in-animation">
              <textarea rows="2" class="w-full p-2 text-sm border border-gray-300 rounded-md focus-animation" placeholder="Write your reply..."></textarea>
              <button type="button" class="submit-reply mt-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-all button-pop ripple"
                      data-comment-id="${commentId}">
                  Post Reply
              </button>
          </div>
      `
      parent.insertAdjacentHTML("beforeend", replyBoxHTML)

      // Focus the textarea with animation
      const textarea = parent.querySelector(".reply-box textarea")
      textarea.focus()
      textarea.classList.add("focus-ring-animation")
      setTimeout(() => {
        textarea.classList.remove("focus-ring-animation")
      }, 1000)
    }

    // Submit reply
    if (event.target.classList.contains("submit-reply")) {
      const btn = event.target
      btn.classList.add("button-press-animation")
      setTimeout(() => {
        btn.classList.remove("button-press-animation")
      }, 300)

      const commentId = Number.parseInt(btn.getAttribute("data-comment-id"))
      const textarea = btn.previousElementSibling
      const content = textarea.value.trim()
      if (!content) return

      const newReply = {
        id: Date.now(),
        user: "Nihal Awasthi", // Replace with logged-in user dynamically
        initials: "ME",
        gradient: "from-gray-400 to-black",
        content: content,
        time: "Just now",
        likes: 0,
        replies: [],
      }

      // Add reply to the correct comment
      posts.forEach((post) => {
        function addReplyRecursive(comments) {
          for (const comment of comments) {
            if (comment.id === commentId) {
              if (!comment.replies) comment.replies = []
              comment.replies.push(newReply)
              return true
            } else if (comment.replies && comment.replies.length > 0) {
              if (addReplyRecursive(comment.replies)) return true
            }
          }
          return false
        }
        addReplyRecursive(post.comments)
      })

      // Re-render comments for that post
      const postId = posts.find((post) => post.comments.some((c) => findCommentRecursive(c, commentId)))?.id

      function findCommentRecursive(comment, id) {
        if (comment.id === id) return true
        return comment.replies?.some((r) => findCommentRecursive(r, id))
      }

      const commentsDiv = document.getElementById(`comments-${postId}`)
      const post = posts.find((p) => p.id === postId)

      // Fade out and in for re-rendering
      commentsDiv.classList.add("fade-out")
      setTimeout(() => {
        commentsDiv.innerHTML = getMockCommentsHTML(post)
        commentsDiv.classList.remove("fade-out")
        commentsDiv.classList.add("fade-in")
        setTimeout(() => {
          commentsDiv.classList.remove("fade-in")
        }, 500)
      }, 300)
    }

    // Handle new comment posting
    if (event.target.classList.contains("submit-comment")) {
      const btn = event.target
      btn.classList.add("button-press-animation")
      setTimeout(() => {
        btn.classList.remove("button-press-animation")
      }, 300)

      const postId = Number.parseInt(btn.getAttribute("data-post-id"))
      const textarea = btn.previousElementSibling
      const content = textarea.value.trim()
      if (!content) return

      const newComment = {
        id: Date.now(),
        user: "Nihal Awasthi", // Replace dynamically
        initials: "ME",
        gradient: "from-gray-400 to-black",
        content: content,
        time: "Just now",
        likes: 0,
        replies: [],
      }

      const post = posts.find((p) => p.id === postId)
      if (!post.comments) post.comments = []
      post.comments.push(newComment)

      const commentsDiv = document.getElementById(`comments-${postId}`)

      // Fade out and in for re-rendering
      commentsDiv.classList.add("fade-out")
      setTimeout(() => {
        commentsDiv.innerHTML = getMockCommentsHTML(post)
        commentsDiv.classList.remove("fade-out")
        commentsDiv.classList.add("fade-in")
        setTimeout(() => {
          commentsDiv.classList.remove("fade-in")
        }, 500)
      }, 300)

      // Clear the textarea with animation
      textarea.classList.add("clear-animation")
      setTimeout(() => {
        textarea.value = ""
        textarea.classList.remove("clear-animation")
      }, 300)
    }
  })
})

// Add typing indicator for comments
function randomlyShowTypingIndicators() {
  const commentSections = document.querySelectorAll(".comments-section:not(.hidden)")
  if (commentSections.length > 0) {
    const randomSection = commentSections[Math.floor(Math.random() * commentSections.length)]
    showTypingIndicator(randomSection)
  }

  // Schedule next appearance
  setTimeout(randomlyShowTypingIndicators, Math.random() * 20000 + 10000)
}

// Start random typing indicators after a delay
setTimeout(randomlyShowTypingIndicators, 5000)
