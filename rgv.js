'use strict';

(function (window) {
  var $body       = $('body'),
      $title      = $('title'),
      $window     = $(window),
      gridView    = {
        animSpeedIn:  200,
        animSpeedOut: 100,
        boxSize:      300,
        fontSize:     14,
        fontSizeBig:  18,
        href:         window.location.href,
        opacity:      0.9,
        posts:        [],
        title:        $title.text(),
      },
      windowWidth = $window.width(),
      boxSizeD    = windowWidth / gridView.boxSize,
      boxSizeI    = parseInt(windowWidth / gridView.boxSize, 10);

  if (boxSizeD > boxSizeI)
    gridView.boxSize += (windowWidth - (gridView.boxSize * boxSizeI)) / boxSizeI;

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
        id         = $post.attr('data-fullname'),
        imageURL   = $title.attr('href'),
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
        imageCancelers = [
          '.gifv',
          '/a/',
          '/gallery/'
        ];

    if (imageTriggers.some(function (value) { return imageURL.indexOf(value) > -1; })) {
      if (imageCancelers.some(function (value) { return imageURL.indexOf(value) > -1 })) {
        imageURL = null;
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
        .css({
          display: 'inline-block',
          fontSize: gridView.fontSize,
          paddingRight: 10
        })
        .text('Prev'),

      $next = $('<a>')
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

  var $article = $('<article>')
        .css({
          marginTop: 41
        });

  var $rgv = $('<div>')
        .addClass('redditGridView')
        .append($header)
        .append($article);

  // Cycle and add all posts.
  gridView.posts.forEach(function (post) {
    var $titleLink = $('<a>')
          .attr('href', post.commentsURL)
          .attr('target', '_blank')
          .text(post.title),

        $header = $('<header>')
          .attr('animate', (post.imageURL != null))
          .css({
            backgroundColor: '#fff',
            fontSize: gridView.fontSize,
            opacity: gridView.opacity,
            padding: 10,
            textAlign: 'center'
          })
          .append($titleLink);

    var $sectionLink = $('<a>')
          .css({
            display: 'block',
            height: gridView.boxSize,
            width: gridView.boxSize
          }),

        $section = $('<section>')
          .css({
            height: gridView.boxSize,
            width: gridView.boxSize
          })
          .append($sectionLink);

    var $pointsAndComments = $('<span>')
          .text(post.points + ' point' + (post.points != 1 ? 's' : '') + ', ' + post.comments + ' comment' + (post.comments != 1 ? 's' : '')),

        $footer = $('<footer>')
          .css({
            backgroundColor: '#fff',
            height: 30,
            opacity: gridView.opacity
          })
          .append($pointsAndComments);

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

    if (post.imageURL != null) {
      $tile.css({
        backgroundImage: 'url("' + post.imageURL + '")'
      });
    }

    if (post.imageURL == null) {
      $sectionLink
        .attr('href', post.commentsURL)
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
    }

    $article
      .append($tile);
  });

  // Add the entire construct to the body, aka we're done!
  $body.append($rgv);

  // Marginalize headers on tiles properly.
  $('div.tile').each(function () {
    var $tile               = $(this),
        $header             = $('header', $tile),
        headerHeight        = $header.height(),
        headerPaddingTop    = parseInt($header.css('padding-top'), 10),
        headerPaddingBottom = parseInt($header.css('padding-bottom'), 10);

    $header.css({
      marginTop: (0 - (headerHeight + headerPaddingTop + headerPaddingBottom))
    });
  });
})(window);
