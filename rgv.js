'use strict';

(function (window) {
  var $body       = $('body'),
      $title      = $('title'),
      $window     = $(window),

      gridView    = {
        animSpeedIn:  200,
        animSpeedOut: 100,
        boxSize:      300,
        flashSpeed:   250,
        flashLoops:   4,
        fontSize:     14,
        fontSizeBig:  18,
        href:         window.location.href,
        imgurGallery: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAIAAAD2HxkiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI0QkFGQjREQ0NCQjExRTQ5NzZGOUM1RDA1Q0Q1RjU2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI0QkFGQjRFQ0NCQjExRTQ5NzZGOUM1RDA1Q0Q1RjU2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjRCQUZCNEJDQ0JCMTFFNDk3NkY5QzVEMDVDRDVGNTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjRCQUZCNENDQ0JCMTFFNDk3NkY5QzVEMDVDRDVGNTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz79mDTYAAAqmElEQVR42uyd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',
        liveUpdate:   false,
        liveTimer:    null,
        liveIndex:    0,
        nextURL:      null,
        opacity:      0.9,
        posts:        [],
        prevURL:      null,
        title:        $title.text(),
      },

      windowWidth = $window.width(),
      boxSizeD    = windowWidth / gridView.boxSize,
      boxSizeI    = parseInt(windowWidth / gridView.boxSize, 10);

  if (boxSizeD > boxSizeI)
    gridView.boxSize += (windowWidth - (gridView.boxSize * boxSizeI)) / boxSizeI;

  $('a', $('span.nextprev')).each(function () {
    var $a = $(this);

    if ($a.text().indexOf('prev') > -1)
      gridView.prevURL = $a.attr('href');
    else if ($a.text().indexOf('next') > -1)
      gridView.nextURL = $a.attr('href');
  });

  $('div.thing', $('div#siteTable')).each(function () {
    // Get all pre-calc stuff.
    var $post      = $(this),
        $author    = $('a.author', $post),
        $comments  = $('a.comments', $post),
        $nsfw      = $('li.nsfw-stamp', $post),
        $score     = $('span.unvoted', $post),
        $submitted = $('time.live-timestamp', $post),
        $subreddit = $('a.subreddit', $post),
        $title     = $('a.title', $post),
        comments   = parseInt($comments.text().substr(0, $comments.text().indexOf(' ')), 10),
        embed      = false,
        embedURL   = '',
        gallery    = false,
        gifVideo   = false,
        gifvURL    = '',
        id         = $post.attr('data-fullname'),
        imageURL   = $title.attr('href').replace('http:', '').replace('https:', ''),
        points     = parseInt($score.text().substr(0, $score.text().indexOf(' ')), 10);

    if (isNaN(comments))
      comments = 0;

    if (isNaN(points))
      points = 0;

    // Determine if the found URL is an image, ready for background preview.
    var imageTriggers = [
          '.jpg',
          '.jpeg',
          '.gif',
          '.png',
          'imgur.com'
        ],
        imageAlbum = [
          '/a/'
        ],
        imageGallery = [
          '/gallery/'
        ],
        imageGifVideo = [
          '.gifv'
        ];

    if (imageTriggers.some(function (value) { return imageURL.indexOf(value) > -1; })) {
      if (imageAlbum.some(function (value) { return imageURL.indexOf(value) > -1 })) {
        embedURL = imageURL;

        if (embedURL.slice(-1) !== '/')
          embedURL += '/';

        embedURL += 'embed';

        imageURL = null;
        embed = true;
      }
      else if (imageGallery.some(function (value) { return imageURL.indexOf(value) > -1 })) {
        imageURL = null;
        gallery = true;
      }
      else if (imageGifVideo.some(function (value) { return imageURL.indexOf(value) > -1 })) {
        gifvURL = imageURL;
        imageURL = null;
        gifVideo = true;
      }
      else {
        if (imageURL.slice(-1) == '?')
          imageURL = imageURL.substr(0, imageURL.length -1);

        var imageExtensions = [
              '.jpg',
              '.jpeg',
              '.gif',
              '.png'
            ];

        if (!imageExtensions.some(function (value) { return imageURL.indexOf(value) > -1; })) {
          imageURL += '.png';
        }
      }
    }
    else {
      imageURL = null;
    }

    // Add post to array of posts.
    gridView.posts.push({
      author:      $author.text(),
      comments:    comments,
      commentsURL: $comments.attr('href'),
      contentURL:  $title.attr('href'),
      embed:       embed,
      embedURL:    embedURL,
      gallery:     gallery,
      gifVideo:    gifVideo,
      gifvURL:     gifvURL,
      id:          id,
      imageURL:    imageURL,
      isNSFW:      ($nsfw.length > 0),
      points:      points,
      submitted:   $submitted.attr('datetime'),
      subreddit:   $subreddit.text(),
      title:       $title.text(),
    });
  });

  // Hide all elements of the original page.
  $body
    .css({
      backgroundColor: '#000'
    })
    .children()
    .css({
      display: 'none'
    });

  // Construct the grid-view interface.
  var $prev = $('<a>')
        .attr('href', gridView.prevURL)
        .css({
          display: 'inline-block',
          fontSize: gridView.fontSize,
          paddingRight: 10
        })
        .text('Prev'),

      $next = $('<a>')
        .attr('href', gridView.nextURL)
        .css({
          display: 'inline-block',
          fontSize: gridView.fontSize,
          paddingRight: 30
        })
        .text('Next'),

      $info = $('<span>')
        .css({
          display: 'inline-block',
          fontSize: gridView.fontSize
        })
        .html('Browsing <a href="' + gridView.href + '">' + gridView.title + '</a>'),

      $left = $('<div>')
        .css({
          float: 'left'
        })
        .append($prev)
        .append($next)
        .append($info),

      $liveUpdateStatus = $('<span>')
        .addClass('liveUpdateStatus')
        .css({
          display: 'inline-block',
          fontSize: gridView.fontSize,
          marginRight: 30
        }),

      $flashTileOnAddCheckbox = $('<input>')
        .attr('id', 'flashTileOnAdd')
        .attr('type', 'checkbox')
        .attr('disabled', 'disabled')
        .css({
          margin: 0,
          padding: 0
        }),

      $flashTileOnAddLabel = $('<label>')
        .attr('for', 'flashTileOnAdd')
        .attr('disabled', 'disabled')
        .css({
          color: '#999',
          fontSize: gridView.fontSize,
          marginLeft: 3,
          marginRight: 30
        })
        .text('Flash Tile On Add'),

      $liveUpdateCheckbox = $('<input>')
        .attr('id', 'liveUpdate')
        .attr('type', 'checkbox')
        .css({
          margin: 0,
          padding: 0
        })
        .click(toggleLiveUpdate),

      $liveUpdateLabel = $('<label>')
        .attr('for', 'liveUpdate')
        .css({
          fontSize: gridView.fontSize,
          marginLeft: 3,
          marginRight: 30
        })
        .text('Live Updates'),

      $onlyImagesCheckbox = $('<input>')
        .attr('id', 'onlyImages')
        .attr('type', 'checkbox')
        .css({
          margin: 0,
          padding: 0
        })
        .click(toggleImages),

      $onlyImagesLabel = $('<label>')
        .attr('for', 'onlyImages')
        .css({
          fontSize: gridView.fontSize,
          marginLeft: 3,
          marginRight: 30
        })
        .text('Only Images'),

      $close = $('<a>')
        .css({
          display: 'inline-block',
          fontSize: gridView.fontSize
        })
        .text('Close'),

      $right = $('<div>')
        .css({
          float: 'right'
        })
        .append($liveUpdateStatus)
        .append($flashTileOnAddCheckbox)
        .append($flashTileOnAddLabel)
        .append($liveUpdateCheckbox)
        .append($liveUpdateLabel)
        .append($onlyImagesCheckbox)
        .append($onlyImagesLabel)
        .append($close),

      $header = $('<header>')
        .css({
          backgroundColor: '#fff',
          height: 30,
          left: 0,
          padding: '11px 15px 0 15px',
          position: 'fixed',
          right: 0,
          top: 0,
          zIndex: 10
        })
        .append($left)
        .append($right);

  if (gridView.prevURL == null)
    $prev.hide();

  if (gridView.nextURL == null)
    $next.hide();

  var $article = $('<article>')
        .addClass('viewport')
        .css({
          marginTop: 41
        });

  var $rgv = $('<div>')
        .addClass('redditGridView')
        .append($header)
        .append($article);

  // Cycle and add all posts.
  populateViewport($article);

  // Add the entire construct to the body, aka we're done!
  $body.append($rgv);

  // Marginalize headers on tiles properly.
  $('div.tile').each(function () {
    var $tile               = $(this),
        $header             = $tile.find('header'),
        $section            = $tile.find('section'),
        headerHeight        = $header.height(),
        headerPaddingTop    = parseInt($header.css('padding-top'), 10),
        headerPaddingBottom = parseInt($header.css('padding-bottom'), 10);

    $header.css({
      marginTop: (0 - (headerHeight + headerPaddingTop + headerPaddingBottom))
    });

    if ($tile.attr('data-is-embed') ||
        $tile.attr('data-is-gifv')) {
      var $iframe = $section.find('iframe.embed'),
          $sclink = $section.find('a.sectionLink');

      $iframe.css({
        marginTop: -1
      });
      $sclink.css({
        marginTop: -1
      });
    }
  });

  /**
   * Clears the viewport of all added tiles.
   */
  function clearViewport() {
    $('div.tile').remove();
  }

  /**
   * Cycles all posts and adds them as tiles.
   *
   * @param object $article
   *   The main viewport to add tiles too.
   */
  function populateViewport($article) {
    gridView.posts.forEach(function (post) {
      populateViewportPost($article, post, false, false);
    });
  }

  /**
   * Add a single post to the viewport main article.
   *
   * @param object $article
   *   The main viewport to add tiles too.
   * @param json post
   *   The post to add as a tile.
   * @param bool prepend
   *   To prepend or append the post.
   * @param bool flash
   *   Flash the tile-frame to indicate it's been added.
   */
  function populateViewportPost($article, post, prepend, flash) {
      var animate = (post.imageURL != null ||
                     post.gallery ||
                     post.embed ||
                     post.gifVideo),

          $titleLink = $('<a>')
            .attr('href', post.contentURL)
            .attr('target', '_blank')
            .text(post.title),

          $header = $('<header>')
            .attr('animate', animate)
            .css({
              backgroundColor: '#fff',
              fontSize: gridView.fontSize,
              opacity: gridView.opacity,
              padding: 10,
              textAlign: 'center'
            })
            .append($titleLink);

      var $sectionLink = $('<a>')
            .attr('target', '_blank')
            .css({
              display: 'block',
              height: gridView.boxSize,
              width: gridView.boxSize
            }),

          $section = $('<section>')
            .css({
              height: gridView.boxSize,
              width: gridView.boxSize
            });

      if (post.embed) {
        $sectionLink
          .addClass('sectionLink')
          .css({
            position: 'absolute'
          });

        var $embed = $('<iframe>')
          .addClass('embed')
          .attr('src', post.embedURL)
          .css({
            height: gridView.boxSize,
            position: 'absolute',
            width: gridView.boxSize
          });

        $section
          .append($embed)
          .append($sectionLink);
      }
      else if (post.gifVideo) {
        $sectionLink
          .addClass('sectionLink')
          .css({
            position: 'absolute',
          });

        var $embed = $('<iframe>')
          .addClass('embed')
          .attr('src', post.gifvURL)
          .css({
            height: gridView.boxSize,
            position: 'absolute',
            width: gridView.boxSize
          });

        $section
          .append($embed)
          .append($sectionLink);
      }
      else {
        $section
          .append($sectionLink);
      }

      var $pointsAndComments = $('<a>')
            .attr('href', post.commentsURL)
            .attr('target', '_blank')
            .text(post.points + ' point' + (post.points != 1 ? 's' : '') + ', ' + post.comments + ' comment' + (post.comments != 1 ? 's' : '')),

          $left = $('<div>')
            .css({
              float: 'left'
            })
            .append($pointsAndComments),

          $author = $('<a>')
            .attr('href', '/u/' + post.author)
            .attr('target', '_blank')
            .text(post.author),

          $right = $('<div>')
            .css({
              float: 'right'
            })
            .append($author),

          $footer = $('<footer>')
            .css({
              backgroundColor: '#fff',
              height: 22,
              opacity: gridView.opacity,
              overflow: 'hidden',
              padding: '8px 10px 0 10px'
            })
            .append($left)
            .append($right)

      var $tile = $('<div>')
            .addClass('tile')
            .css({
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              float: 'left',
              height: gridView.boxSize,
              opacity: gridView.opacity,
              overflow: 'hidden',
              width: gridView.boxSize
            })
            .append($header)
            .append($section)
            .append($footer)
            .mouseenter(function () {
              var $tile               = $(this),
                  $header             = $tile.find('header'),
                  $section            = $tile.find('section'),
                  $footer             = $tile.find('footer'),
                  headerPaddingTop    = parseInt($header.css('padding-top'), 10),
                  headerPaddingBottom = parseInt($header.css('padding-bottom'), 10),
                  footerPaddingTop    = parseInt($footer.css('padding-top'), 10),
                  footerPaddingBottom = parseInt($footer.css('padding-bottom'), 10),
                  sectionHeight       = gridView.boxSize - ($header.height() +
                                                            headerPaddingTop +
                                                            headerPaddingBottom +
                                                            $footer.height() +
                                                            footerPaddingTop +
                                                            footerPaddingBottom),
                  animateHeader       = $header.attr('animate');

              animateHeader = (animateHeader == 'true');

              if (!animateHeader) {
                sectionHeight = gridView.boxSize - ($footer.height() +
                                                    footerPaddingTop +
                                                    footerPaddingBottom);
              }

              if (animateHeader) {
                $header.animate({
                  marginTop: 0
                }, gridView.animSpeedIn);
              }

              $section.animate({
                height: sectionHeight
              }, gridView.animSpeedIn);

              $tile.animate({
                opacity: 1
              }, gridView.animSpeedIn);
            })
            .mouseleave(function () {
              var $tile               = $(this),
                  $header             = $tile.find('header'),
                  $section            = $tile.find('section'),
                  $footer             = $tile.find('footer'),
                  headerPaddingTop    = parseInt($header.css('padding-top'), 10),
                  headerPaddingBottom = parseInt($header.css('padding-bottom'), 10),
                  animateHeader       = $header.attr('animate');

              animateHeader = (animateHeader == 'true');

              if (animateHeader) {
                $header.animate({
                  marginTop: (0 - ($header.height() + headerPaddingTop + headerPaddingBottom))
                }, gridView.animSpeedOut);
              }

              $section.animate({
                height: gridView.boxSize
              }, gridView.animSpeedOut);

              $tile.animate({
                opacity: gridView.opacity
              }, gridView.animSpeedOut);
            });

      if (post.embed) $tile.attr('data-is-embed', true);
      if (post.gifVideo) $tile.attr('data-is-gifv', true);

      if (post.imageURL != null ||
          post.gallery) {
        $tile
          .addClass('imageTile')
          .css({
            backgroundImage: 'url("' + (post.imageURL == null ? gridView.imgurGallery : post.imageURL) + '")'
          });

        $sectionLink.attr('href', (post.imageURL == null ? post.contentURL : post.imageURL));
      }
      else if (post.embed ||
               post.gifVideo) {
        $tile.addClass('imageTile');
        $sectionLink.attr('href', (post.imageURL == null ? post.contentURL : post.imageURL));
      }
      else {
        $tile
          .addClass('textTile');

        $sectionLink
          .attr('href', post.contentURL)
          .css({
            backgroundColor: '#333',
            color: '#fff',
            fontSize: gridView.fontSizeBig,
            height: (gridView.boxSize - 20),
            padding: 10,
            textAlign: 'center',
            width: (gridView.boxSize - 20),
          })
          .text(post.title);

        if ($('input#onlyImages').is(':checked'))
          $tile.hide();
      }

      if (prepend)
        $article.prepend($tile);
      else
        $article.append($tile);

      if (flash) {
        $.when(
          $tile.animate({ opacity: 0 }, gridView.flashSpeed).promise(),
          $tile.animate({ opacity: gridView.opacity }, gridView.flashSpeed).promise(),

          $tile.animate({ opacity: 0 }, gridView.flashSpeed).promise(),
          $tile.animate({ opacity: gridView.opacity }, gridView.flashSpeed).promise(),

          $tile.animate({ opacity: 0 }, gridView.flashSpeed).promise(),
          $tile.animate({ opacity: gridView.opacity }, gridView.flashSpeed).promise(),

          $tile.animate({ opacity: 0 }, gridView.flashSpeed).promise(),
          $tile.animate({ opacity: gridView.opacity }, gridView.flashSpeed).promise()
        ).done(function () {
        });
      }
  }

  /**
   * Toggles which kinds of tiles are visible.
   */
  function toggleImages() {
    if ($(this).is(':checked'))
      $('div.textTile').hide();
    else
      $('div.textTile').show();
  }

  /**
   * Toggles the live-update function.
   */
  function toggleLiveUpdate() {
    gridView.liveUpdate = !gridView.liveUpdate;

    if (gridView.liveUpdate) {
      gridView.liveIndex = 10;
      gridView.liveTimer = setInterval(fetchNewPosts, 1000);

      $('input#flashTileOnAdd')
        .attr('disabled', false)
        .next()
        .attr('disabled', false)
        .css({
          color: '#000'
        });
    }
    else {
      clearInterval(gridView.liveTimer);
      $('span.liveUpdateStatus').text('');

      $('input#flashTileOnAdd')
        .attr('disabled', 'disabled')
        .next()
        .attr('disabled', 'disabled')
        .css({
          color: '#999'
        });
    }
  }

  /**
   * Attempt to download JSON data from the current sub-reddit.
   */
  function fetchNewPosts() {
    gridView.liveIndex--;

    if (gridView.liveIndex > 0)
      $('span.liveUpdateStatus').text('Checking for new posts in ' + gridView.liveIndex + ' second' + (gridView.liveIndex != 1 ? 's' : ''));
    else
      $('span.liveUpdateStatus').text('Checking for new posts...');

    if (gridView.liveIndex > 0)
      return;

    if (gridView.liveIndex == 0)
      gridView.liveIndex = 10;

    var url = window.location.href;

    if (url.slice(-1) == '/')
      url = url.substr(0, url.length -1);

    url += '.json';

    $.ajax({
      type: 'GET',
      url: url,
      success: function (json) {
        if (json &&
            json.data &&
            json.data.children &&
            json.data.children.length > 0) {

          for (var i = 0; i < json.data.children.length; i++) {
            var dp    = json.data.children[i].data,
                found = false;

            gridView.posts.forEach(function (post) {
              if (post.id == dp.name)
                found = true;
            });

            if (found)
              continue;

            var gallery  = false,
                imageURL = dp.url;

            // Determine if the found URL is an image, ready for background preview.
            var imageTriggers = [
                  '.jpg',
                  '.jpeg',
                  '.gif',
                  '.png',
                  'imgur.com'
                ],
                imageCancelers = [
                  '.gifv',
                  '/a/',
                  '/gallery/'
                ];

            if (imageTriggers.some(function (value) { return imageURL.indexOf(value) > -1; })) {
              if (imageCancelers.some(function (value) { return imageURL.indexOf(value) > -1 })) {
                imageURL = null;
                gallery = true;
              }
              else {
                if (imageURL.slice(-1) == '?')
                  imageURL = imageURL.substr(0, imageURL.length -1);

                var imageExtensions = [
                      '.jpg',
                      '.jpeg',
                      '.gif',
                      '.png'
                    ];

                if (!imageExtensions.some(function (value) { return imageURL.indexOf(value) > -1; })) {
                  imageURL += '.png';
                }
              }
            }
            else {
              imageURL = null;
            }

            var post = {
              author:      dp.author,
              comments:    dp.num_comments,
              commentsURL: dp.permalink,
              contentURL:  dp.url,
              gallery:     gallery,
              id:          dp.name,
              imageURL:    imageURL,
              isNSFW:      false,
              points:      dp.score,
              submitted:   dp.created_utc,
              subreddit:   dp.subreddit,
              title:       dp.title
            };

            gridView.posts.unshift(post);

            populateViewportPost($('article.viewport'), post, true, $('input#flashTileOnAdd').is(':checked'));
          }
        }
      }
    })
  }
})(window);
